import React, { useState, useEffect, useContext } from 'react';
import './Previewpage.css';
import { useParams } from 'react-router-dom';

import { CartContext } from '../../assets/API/CartContext';
import ProductCard from '../product card/Productcard';
import { FavoriteContext } from '../../assets/API/FavoriteContext';
import Carousel from '../Carousel/Carousel';

const Previewpage = () => {
  const {addToCart} = useContext(CartContext)
  const {category, product_id } = useParams(); // Retrieve the category and product_id from URL parameters
  const [rotation, setRotation] = useState(0);
  const [product, setProduct] = useState(null);
  const {addToFavorite} = useContext(FavoriteContext)

  useEffect(() => {
    fetch('/Products.json')
      .then((response) => response.json())
      .then((data) => {
        // Convert product_id to a number since the ID in Products.json might be numeric
        const selectedProduct = data.find((item) => item.id === Number(product_id));
        setProduct(selectedProduct);
      })
      .catch((error) => console.error('Error fetching product data:', error));
  }, [product_id]); // Refetch if product_id changes

  const handleRotateToFace = (face) => {
    switch (face) {
      case 1:
        setRotation(0);
        break;
      case 2:
        setRotation(90);
        break;
      case 3:
        setRotation(180);
        break;
      case 4:
        setRotation(-90);
        break;
      default:
        break;
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      
      <section className="previewarea">
        <div className="cube-container">
          <div className="thumbnails">
            <img src={product.image1} alt="Thumbnail 1" onClick={() => handleRotateToFace(1)} />
            <img src={product.image2} alt="Thumbnail 2" onClick={() => handleRotateToFace(2)} />
            <img src={product.image3} alt="Thumbnail 3" onClick={() => handleRotateToFace(3)} />
            <img src={product.image4} alt="Thumbnail 4" onClick={() => handleRotateToFace(4)} />
          </div>
          <div
            className="cube"
            style={{
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            <img src={product.image1} className="face front" alt="front" />
            <img src={product.image4} className="face right" alt="right" />
            <img src={product.image3} className="face back" alt="back" />
            <img src={product.image2} className="face left" alt="left" />
          </div>
        </div>
        <div className="preview">
          <h1>{product.product_name}</h1>
          <p>{product.description}</p>
          <h2>PKR {product.price}</h2>
          <button onClick={()=> addToCart(product)}>Add to cart</button>
          <button onClick={()=> addToFavorite(product)}>Add to favorites</button>
        </div>
      </section>
      <h1>More products</h1>
      {/* You can add related products here if needed */}
      <ProductCard/>
    </>
  );
};

export default Previewpage;
