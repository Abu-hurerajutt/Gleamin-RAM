import React, { useState, useEffect } from 'react';
import "./Carousel.css"

const Carousel = ({ id }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch the carousel data from the public folder
    fetch(`/Carousel.json`)
      .then((response) => response.json())
      .then((data) => {
        // Find the item with the matching id and set its images
        const carouselData = data.find((item) => item.id === id);
        if (carouselData) {
          setImages(carouselData.image);
        } else {
          console.error(`No images found for id: ${id}`);
        }
      })
      .catch((error) => console.error('Error fetching carousel data:', error));
  }, [id]);

  useEffect(() => {
    // Only start the interval if there are images
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);

      // Clear interval on component unmount
      return () => clearInterval(interval);
    }
  }, [images]);

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
    </div>
  );
};

export default Carousel;
