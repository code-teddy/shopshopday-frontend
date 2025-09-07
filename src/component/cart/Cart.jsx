import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserCart,
    updateQuantity,
    removeItemFromCart,
} from "../../store/features/cartSlice";
import { Card } from "react-bootstrap";
import ProductImage from "../utils/ProductImage";
import QuantityUpdater from "../utils/QuantityUpdater";
import LoadSpinner from "../common/LoadSpinner";
import { toast, ToastContainer } from "react-toastify";
import emptyCartImage from "../../assets/images/emptyCart.jpeg";

const Cart = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const cartId = useSelector((state) => state.cart.cartId);
    const isLoading = useSelector((state) => state.cart.isLoading);

    useEffect(() => {
        dispatch(getUserCart(userId));
    }, [dispatch, userId]);

    const handleIncreaseQuantity = (itemId) => {
        const item = cart.items.find((item) => item.product.id === itemId);
        if (item && cartId) {
            dispatch(
                updateQuantity({
                    cartId,
                    itemId,
                    newQuantity: item.quantity + 1,
                })
            );
        }
    };

    const handleDecreaseQuantity = (itemId) => {
        const item = cart.items.find((item) => item.product.id === itemId);
        if (item && item.quantity > 1) {
            dispatch(
                updateQuantity({
                    cartId,
                    itemId,
                    newQuantity: item.quantity - 1,
                })
            );
        }
    };

    const handleRemoveItem = (itemId) => {
        try {
            dispatch(removeItemFromCart({ cartId, itemId }));
            toast.success("Item removed from cart");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handlePlaceOrder = async () => {
        navigate(`/checkout/${userId}/checkout`);
    };

    if (isLoading) {
        return <LoadSpinner />;
    }

    return (
      <div className="container mt-5 mb-5 p-5">
        <ToastContainer />

        {cart.items.length === 0 ? (
          <div style={{ height: "500px", textAlign: "center" }}>
            <img src={emptyCartImage} alt="empty cart" />
            <h1 className="mt-4 mb-4 cart-title">Your cart is empty</h1>
            <Link to={"/products"}>
              <button className="my-btn">Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="mb-4 cart-title">My Shopping Cart</h2>
            <table className="table table-bordered align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="cart-image-container">
                        {item.product?.images?.length > 0 && (
                          <ProductImage productId={item.product?.images[0].id} />
                        )}
                      </div>
                    </td>
                    <td>{item.product?.name}</td>
                    <td>{item.product?.brand}</td>
                    <td>${item.product?.price?.toFixed(2)}</td>
                    <td style={{ width: "160px"}}>
                      <QuantityUpdater
                        quantity={item.quantity}
                        onDecrease={() => handleDecreaseQuantity(item.product.id)}
                        onIncrease={() => handleIncreaseQuantity(item.product.id)}
                      />
                    </td>
                    <td>${item.totalPrice?.toFixed(2)}</td>
                    <td>
                      <Link to={"#"} onClick={() => handleRemoveItem(item.product.id)}>
                        <span className="remove-item">Remove</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-footer d-flex align-items-center mt-4">
              <h4 className="mb-0 cart-title">
                Total Cart Amount: ${cart.totalAmount?.toFixed(2)}
              </h4>
              <div className="ms-auto checkout-links">
                <Link to={"/products"}>
                <button className="my-btn">
                  Continue Shopping
                </button>
                </Link>
                <Link to={"#"} onClick={handlePlaceOrder}>
                   <button className="my-btn">
                     Proceed to Checkout
                   </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

    );
};

export default Cart;
