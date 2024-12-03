import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Product card/Productcard';
import Carousel from '../Carousel/Carousel';

const ProductPage = () => {
  // Retrieve URL parameters
  const { category, product_name } = useParams();

  return (
    <div>
      <Carousel id={2}/>
      <ProductCard category={category} productName={product_name} />
    </div>
  );
};

export default ProductPage;
