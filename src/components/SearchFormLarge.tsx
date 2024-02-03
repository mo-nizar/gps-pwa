import React, { useState, ChangeEvent } from 'react';
import '../styles/SearchFormLarge.scss';

const SearchFormLarge: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const products: string[] = ['Product 1', 'Product 2', 'Product 3', 'Product 4'];

  const handleProductChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
  );
};

export default SearchFormLarge;
