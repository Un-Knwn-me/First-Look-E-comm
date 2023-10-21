import React, { useState, useEffect } from 'react';
import URL from '../App.js';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/products/list`);
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/admin/product/${productId}`);
      if (response.status === 200) {
        // Update the product list after a successful delete
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <strong>{product.name}</strong>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            <ul>
              {product.images.map((image, index) => (
                <li key={index}>
                  <img
                    src={image}
                    alt={`Product ${product.name} - Product ${index + 1}`}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
