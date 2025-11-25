// Class component: Manages local favorite state
// Gets product list from Context API
//userstory 1
// Product Catalog with React Basics (Components, Props, State, Events)
import React, { Component } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";
// ProductList component to display list of products
class ProductList extends Component {
  static contextType = ProductContext;

  state = {
    favorites: {}
  };
// Toggle favorite state for each product
  toggleFav = (id) => {
    this.setState({
      favorites: {
        ...this.state.favorites,
        [id]: !this.state.favorites[id]
      }
    });
  };

  render() {
    const { products } = this.context;
// Render products
    return (
      <div className="container mt-4">
        <h2>Product Catalog</h2>
        <div className="row mt-3">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isFav={this.state.favorites[p.id]}
              toggleFav={this.toggleFav}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
