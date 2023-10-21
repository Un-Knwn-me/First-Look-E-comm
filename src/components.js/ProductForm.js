import React, { useState } from 'react';
// import URL from '../App.js';
import axios from 'axios';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await axios.post(`http://localhost:8080/admin/product/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setMessage('Product added successfully');
        setProductName('');
        setImages([]);
      }
    } catch (error) {
      setMessage('Error adding product');
      console.log(error)
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleProductSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Product Images:
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductForm;
