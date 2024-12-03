import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Categorydropdown.css';
import { FaWindowClose } from "react-icons/fa";

const Categorydropdown = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch products from JSON on component mount
  useEffect(() => {
    fetch('/Products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => activeCategory === 'All' || product.category === activeCategory
  );

  // Navigate to the category page with an empty product title
  const handleCategoryClick = (category) => {
    navigate(`/product/${category}/products`); // Navigate with category and empty title
    setIsDropdownOpen(!isDropdownOpen)
  };

  // Navigate to the product page with category and product title
  const handleProductClick = (category, productName) => {
    const formattedTitle = encodeURIComponent(productName.trim()); // Encode title for URL safety
    navigate(`/product/${category}/${formattedTitle}`); // Navigate with category and title
    setIsDropdownOpen(!isDropdownOpen)
  };

  return (
    <div className="category-dropdown">
      {/* Category Button */}
      <li className="category-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        Categories
      </li>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {/* Category List */}
          <div className="category-list">
            <p onClick={() => handleCategoryClick('All')} onMouseEnter={() => setActiveCategory('All')}>
              All
            </p>
            {Array.from(new Set(products.map((product) => product.category))).map((category) => (
              <p
                key={category}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={() => setActiveCategory(category)}
              >
                {category}
              </p>
            ))}
          </div>

          {/* Product Grid */}
          <div className="product-grid">
          <FaWindowClose className='close' onClick={() => setIsDropdownOpen(!isDropdownOpen)}/>
            {filteredProducts.map((product) => (
              <div
                className="c-product-card"
                key={product.id}
                onClick={() => handleProductClick(product.category, product.product_name)}
              >
                <img
                  src={product.image1}
                  alt={product.product_name}
                  className="c-product-image"
                />
                <p className="c-product-name">{product.product_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorydropdown;
