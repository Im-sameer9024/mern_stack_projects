import mongoose from "mongoose";
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";
import CartItem from "../models/CartItemModel.js";

const addToCart = async (userId, productId, quantity) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //------------- check product availability --------------

    const product = await Product.findById(productId).session(session);
    if (!product) throw new Error("Product not found");

    //------------- Get user cart ----------------

    let cart = await Cart.findOne({ user: userId }).session(session);

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    //------------- check if product already exists in cart --------------

    const existingCartItem = await CartItem.findOne({
      product: productId,
      _id: { $in: cart.items },
    }).session(session);

    let cartItem;
    let isNewItem = false;

    if (existingCartItem) {
      //---------------- update the existing item

      const newQuantity = existingCartItem.quantity + quantity;
      existingCartItem.quantity = newQuantity;
      existingCartItem.total = newQuantity * product.price;
      cartItem = await existingCartItem.save({ session });
    } else {
      //----------------add the new cartItem to the cart
      isNewItem = true;
      cartItem = new CartItem({
        product: productId,
        quantity: quantity,
        price: product.price,
        total: product.price * quantity,
      });

      await cartItem.save({ session });
      cart.items.push(cartItem._id);
    }

    const actualItems = await CartItem.find({
      _id: { $in: cart.items },
    }).session(session);

    cart.subTotal = actualItems.reduce((acc, item) => acc + item.total, 0);
    cart.totalItems = actualItems.reduce((acc, item) => acc + item.quantity, 0);

    await cart.save({ session });
    await session.commitTransaction();
    session.endSession();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: "items",
      populate: {
        path: "product",
        select: "productName price images",
      },
    });

    return {
      success: true,
      message: isNewItem ? "Item added to cart" : "Item quantity updated",
      data: populatedCart,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateCartItem = async (userId, itemId, quantity) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    const cart = await Cart.findOne({ user: userId }).session(session);

    if (!cart) {
      throw new Error("Cart not found");
    }

    //check if item exists in user's cart

    if (!cart.items.includes(itemId)) {
      throw new Error("Item not found in cart");
    }

    const cartItem = await CartItem.findById(itemId)
      .populate("product")
      .session(session);

    if (!cartItem) {
      throw new Error("Item not found in cart");
    }

     // Calculate the difference to update cart totals correctly
    const quantityDifference = quantity - cartItem.quantity;
    
    // Update quantity (replace, not add)
    cartItem.quantity = quantity;
    cartItem.total = quantity * cartItem.price;

    // Update cart totals
    cart.subTotal += quantityDifference * cartItem.price;
    cart.totalItems += quantityDifference;

    await cartItem.save({ session });
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    const updatedCart = await Cart.findById(cart._id).populate({
      path: "items",
      populate: {
        path: "product",
        select: "name price images stock",
      },
    });

    return {
      success: true,
      message: "Cart item updated successfully",
      data: updatedCart,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const removeItemFromCart = async (userId, itemId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ user: userId }).session(session);

    if (!cart) {
      throw new Error("Cart not found");
    }

    // remove item from cart array

    cart.items = cart.items.filter((item) => item.toString() !== itemId);

    const actualItems = await CartItem.find({
      _id: { $in: cart.items },
    }).session(session);

    cart.subTotal = actualItems.reduce((acc, item) => acc + item.total, 0);
    cart.totalItems = actualItems.reduce((acc, item) => acc + item.quantity, 0);

    await cart.save({ session });

    // Delete the cart item from Cart Model
    await CartItem.findByIdAndDelete(itemId).session(session);

    await session.commitTransaction();
    session.endSession();

    const updatedCart = await Cart.findById(cart._id).populate({
      path: "items",
      populate: {
        path: "product",
        select: "productName price images ",
      },
    });

    return {
      success: true,
      message: "Item removed from cart",
      data: updatedCart,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const clearUserCart = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ user: userId }).session(session);

    if (!cart) {
      throw new Error("Cart not found");
    }

    await CartItem.deleteMany({ _id: { $in: cart.items } }).session(session);

    cart.items = [];
    cart.subTotal = 0;
    cart.totalItems = 0;
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Cart cleared",
      data: cart,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getUserCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "product",
        select: "productName price images ",
      },
    });

    if (!cart) {
      return {
        success: true,
        data: { items: [], subTotal: 0, totalItems: 0 },
      };
    }

    return {
      success: true,
      data: cart,
    };
  } catch (error) {
    throw new Error("Error getting user cart: ", error);
  }
};

export {
  addToCart,
  updateCartItem,
  removeItemFromCart,
  clearUserCart,
  getUserCart,
};
