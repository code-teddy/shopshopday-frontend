import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById, setQuantity } from "../../store/features/productSlice";
import { useSelector, useDispatch } from "react-redux";
import ImageZoomify from "../common/ImageZoomify";
import QuantityUpdater from "../utils/QuantityUpdater";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../store/features/cartSlice";
import { toast, ToastContainer } from "react-toastify";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, quantity } = useSelector((state) => state.product);
  const { errorMessage, successMessage } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    try {
      dispatch(addToCart({ productId, quantity }));
      toast.success(successMessage);
    } catch (error) {
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleIncreaseQuantity = () => {
    dispatch(setQuantity(quantity + 1));
  };

  const handleDecreaseQuantity = () => {
    dispatch(setQuantity(quantity - 1, 1));
  };

  return (
    <div className='container'>
      <ToastContainer />
      {product ? (
        <div className='row product-details'>
          <div className='col-md-2'>
            {product.images.map((img) => (
              <div key={img.id} className='image-container'>
                <ImageZoomify productId={img.id} />
              </div>
            ))}
          </div>
          <div className='col-md-8 details-container'>
            <h1 className='product-name'>{product.name}</h1>
            <h4 className='price'>${product.price}</h4>
            <p className='product-description'>{product.description}</p>
            <p className='product-name'>Brand: {product.brand}</p>
            <p className='product-name'>
              Rating: <span className='rating'>some stars</span>
            </p>
            <p>
              {" "}
              {product.inventory > 0 ? (
                <span className='text-success'>
                  {product.inventory} in stock
                </span>
              ) : (
                <span className='text-danger'>Out of stock</span>
              )}
            </p>
            <p>Quantity:</p>
            <QuantityUpdater
              quantity={quantity}
              onDecrease={handleDecreaseQuantity}
              onIncrease={handleIncreaseQuantity}
            />
            <div className='d-flex gap-2 mt-3'>
              <button className='add-to-cart-button' onClick={handleAddToCart}>
                {" "}
                <FaShoppingCart /> Add to cart
              </button>
              <button className='buy-now-button'>Buy now</button>
            </div>
          </div>
        </div>
      ) : (
        <p>No product</p>
      )}
    </div>
  );
};

export default ProductDetails;
