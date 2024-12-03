import { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('Products.json') // Adjust path if necessary
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>Price: ${product.price}</p>
          <p>Old Price: ${product.oldPrice}</p>
          <p>{product.description}</p>
          <img src={product.images[0]} alt={product.title} width="200" />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
