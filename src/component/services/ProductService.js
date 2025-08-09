import { api } from "./api";

export const getDistinctProductsByName = async () => {
    const response = await api.get("/products/distinct/products");
    return response.data;

}

export const updateCartItemQuantity = async (cartId, itemId, quantity) => {
    const result = await api.put(`/cartItems/cart/${cartId}/item/${itemId}/update?quantity=${quantity}`);
    return result.data;
};