import { apiConnector } from '@/services/apiConnector';
import { cartApiUrls } from '@/services/apiEndpoints';

const { ADD_TO_CART, GET_CART_DETAILS, REMOVE_CART_ITEM } = cartApiUrls;

export const CartApiOperations = {
  //--------------------add to cart ----------------------------

  AddToCart: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: ADD_TO_CART,
      bodyData: data,
    });
    return response.data;
  },

  //----------------------- get cart details ----------------------------

  GetCartDetails: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_CART_DETAILS,
    });
    return response.data;
  },

  //----------------------- remove cart item ----------------------------

  RemoveCartItem: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: REMOVE_CART_ITEM,
      bodyData: data,
    });
    return response.data;
  },
};
