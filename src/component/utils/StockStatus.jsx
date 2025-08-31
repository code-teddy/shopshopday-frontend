import React from "react";

const StockStatus = ({ inventory }) => {
  return (
    <div className="mt-2 mb-2">
      {inventory > 0 ? (
        <span className='text-success'>{inventory} in stock</span>
      ) : (
        <span className='text-danger'>Out of stock</span>
      )}
    </div>
  );
};

export default StockStatus;
