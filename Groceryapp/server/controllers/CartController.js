import {
    addToCart,
  clearUserCart,
  getUserCart,
  removeItemFromCart,
  updateCartItem,
} from "../utils/cartServices.js";

const GetCartOfUser = async (req, res) => {
  try {
    const result = await getUserCart(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      result,
    });
  } catch (error) {
    console.log("error occur in GetCartOfUser controller", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

const AddItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide product id and quantity",
      });
    }

    const result = await addToCart(
      req.user.id,
      productId,
      parseInt(quantity || 1)
    );

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

const UpdateCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide item id and quantity",
      });
    }

    const result = await updateCartItem(
      req.user.id,
      itemId,
      parseInt(quantity)
    );

    return res.status(200).json({
      success: true,
      message: "Item updated in cart successfully",
      result,
    });
  } catch (error) {
    console.log("error occur in update cart", error);
    return res.status(500).json({
      success: false,
      message: "Error updating item in cart",
      error: error.message,
    });
  }
};

const RemoveFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Please provide item id",
      });
    }

    const result = await removeItemFromCart(req.user.id, itemId);

    return res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      result,
    });
  } catch (error) {
    console.log("error occur in remove cart", error);
    return res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};

const clearAllCart = async (req, res) => {
  try {

    console.log("req.user .id", req.user.id,req.user.name);
    const result = await clearUserCart(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      result,
    });
  } catch (error) {
    console.log("error occur in clear cart", error);
    return res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    });
  }
};

export {
  GetCartOfUser,
  AddItemToCart,
  UpdateCart,
  RemoveFromCart,
  clearAllCart,
};
