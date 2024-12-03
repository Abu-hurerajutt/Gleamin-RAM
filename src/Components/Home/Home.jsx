import React from 'react'
import './Home.css'
import Carousel from '../Carousel/Carousel'
import ProductCard from '../product card/Productcard'

const Home = () => {
  return (
    <>
    <Carousel id={1}/>
    <br />
    <br />
    <center><h1>Best products for you</h1></center>
    <hr />
    <br />
    <ProductCard/>
    </>
  )
}

export default Home
