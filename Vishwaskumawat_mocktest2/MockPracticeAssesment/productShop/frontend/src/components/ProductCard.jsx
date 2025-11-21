// question 1 
// 
//  React Basics (JSX, Components, Props) 

import React from "react";

// A simple functional component receiving props
const ProductCard = ({ title, price, discount }) => {
  const finalPrice = price - discount;

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, margin: 10 }}>
      <h3>{title}</h3>
      <p>Original Price: ₹{price}</p>
      <p>Discount: ₹{discount}</p>
      <h4>Final Price: ₹{finalPrice}</h4>
    </div>
  );
};

export default ProductCard;
