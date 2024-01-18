"use client";
import React, { useState} from 'react';
import '../styles/SearchFormLarge.scss';

const SearchFormLarge = () => {

  const [selectedProduct, setSelectedProduct] = useState('');
  const products = ['Product 1', 'Product 2', 'Product 3', 'Product 4'];

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleSearch = () => {
    console.log(`Searching for ${selectedProduct}`);
  };

  return (
    <div className="searchForm">
      <div className="dropdown">
        <select value={selectedProduct} onChange={handleProductChange}>
          <option value="">Select a product</option>
          {products.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  )
};

export default SearchFormLarge;