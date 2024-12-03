import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegFaceGrinStars } from "react-icons/fa6";
import './Header.css';
import Categorydropdown from '../Categorydropdown/Categorydropdown';
import { CartContext } from '../../assets/API/CartContext';
import { FavoriteContext } from '../../assets/API/FavoriteContext';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { FavoriteItems } = useContext(FavoriteContext);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [sidemenuOpen, setsidemenuOpen] = useState(false);
  const [cartOpen, setcartOpen] = useState(false);
  const [productTitle, setProductTitle] = useState('');

  const navigate = useNavigate();

  // Toggle cart
  const toggleCart = useCallback(() => {
    setcartOpen((prevState) => !prevState);
  }, []);

  // Toggle sidebar menu
  const toggleSidemenu = useCallback(() => {
    setsidemenuOpen((prevState) => !prevState);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized size and position based on scroll
  const { divSize, divTop, divLeft } = useMemo(() => ({
    divSize: scrollPosition > 50 ? 8 : 20,
    divTop: scrollPosition > 50 ? 10 : 95,
    divLeft: scrollPosition > 50 ? 50 : 40,
  }), [scrollPosition]);

  // Handle search
  const handleSearch = useCallback(() => {
    if (productTitle.trim()) {
      const formattedTitle = encodeURIComponent(productTitle.trim());
      navigate(`/product/ /${formattedTitle}`);
    } else {
      alert('Please enter a product title.');
    }
    setProductTitle('');
  }, [productTitle, navigate]);

  // Handle key press for search
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <>
      <nav>
        <ul className="left">
          <li><Link className="links logo" to='/'>G-R</Link></li>
          <li><Link className='links large' to='/Featured'>Featured</Link></li>
          <Categorydropdown />
        </ul>
        <ul className="Right">
          <li>
            <Link className='links large' to='/Favorites'>
              <MdFavoriteBorder /><span>{FavoriteItems.length}</span>
            </Link>
          </li>
          <li><Link className='links large' to='/login'><BsPersonLinesFill /></Link></li>
          <li>
            <Link className='links' to='/Cart'><FaCartArrowDown /></Link>
            <span>{cartItems.length}</span>
          </li>
          
          <li className='small'>
            <GiHamburgerMenu onClick={toggleSidemenu} />
          </li>
          <li></li>
        </ul>
        <div className={`sidebar ${sidemenuOpen ? 'show' : ''}`}>
          <div className="menu-items">
            <Link className='links' to="/Featured " onClick={toggleSidemenu}><FaRegFaceGrinStars /> Featured</Link>
            <Link className='links' to="/login" onClick={toggleSidemenu}><BsPersonLinesFill /> Login and signup</Link>
            <Link className='links' to="favorites" onClick={toggleSidemenu}><MdFavoriteBorder /> Favorites <span>{FavoriteItems.length}</span></Link>
          </div>
        </div>

        {/* Overlay to close sidebar on clicking outside */}
        {sidemenuOpen && <div className="overlay" onClick={toggleSidemenu}></div>}

        <img
          src='/images/logo.png'
          style={{ width: divSize + '%', height: 'auto', top: divTop + '%', left: divLeft + '%' }}
          alt="Gleamin RAM"
          className='logoimg'
        />
      </nav>
      <section className="header">
        <div className='webname'>Gleamin RAM</div>
      </section>
      <center>
        <input
          type="text"
          placeholder="Enter product title"
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className='searchbar'
        />
        <button
          onClick={handleSearch}
          className='searchbtn'
        >
          Search
        </button>
      </center>
    </>
  );
};

export default Header;
