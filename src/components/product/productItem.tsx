import React, { useState } from 'react';
import { Product } from '../../models/Product';
import { createUseStyles } from 'react-jss';
import Koszyk from '../koszyk.png';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axiosApi';
import { toast } from 'react-toastify';
import { isLoggedIn } from '../../utils/AuthUttils.';

const useStyles = createUseStyles({
  productItem: {
    width: '300px',
    height: '320px',
    border: '2px solid #AA7A00', 
    backgroundColor: '#535252',
    color: '#fff',
    padding: '20px',
    margin: '20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  imageGallery: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 1,
  },
  imageContainer: {
    width: '250px',
    height: '200px', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  productImage: {
    maxWidth: '100%', 
    maxHeight: '100%', 
    objectFit: 'contain', 
    cursor: 'pointer',
  },
  productName: {
    fontSize: '18px',
    margin: '10px 0',
    color: '#ddd',
    cursor: 'pointer',
  },
  priceAndBasket: {
    display: 'flex',
    justifyContent: 'space-around', 
    alignItems: 'center',
    marginTop: '10px',
  },
  price: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '0',
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px auto',
    width: '150px',
    background: '#222222',
    borderRadius: '10px',
  },
  star: {
    color: '#FFD700', 
    fontSize: '25px',
  },
  emptyStar: {
    color: '#888',
    fontSize: '25px',
  },
  basketIcon: {
    fontSize: '24px',
    cursor: 'pointer',
  },
  koszyk: {
    height: '30px',
  }
});

const ProductItem: React.FC<Product> = ({ id, manufacturer, model, price, rating, photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const classes = useStyles();
  const navigate = useNavigate(); 
  const { category } = useParams(); // Fetch the category from the current URL

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  const addToCart = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    const basketDto = {
      productId: id,
      manufacturer,
      model,
      price,
      photos,
      quantity: 1,
    };

    try {
      const response = await api.post("/cart", basketDto);
      if (response.status === 200) {
        toast.success("Product added to cart!");
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      toast.error("Error adding product to cart");
    }
  };

  // Function to handle navigation to the product detail page
  const handleNavigateToProductDetail = () => {
    // Dynamically use the category from the URL and navigate to the product's detail page
    if (category) {
      navigate(`/${category}/${id}`);
    } else {
      console.error("Category is undefined");
    }
  };

  return (
    <div className={classes.productItem}>
      <h3 className={classes.productName} onClick={handleNavigateToProductDetail}>
        {manufacturer} {model}
      </h3>
      <div className={classes.imageGallery}>
        <button onClick={handlePrevClick} className={classes.galleryButton}>❮</button>
        <div className={classes.imageContainer} onClick={handleNavigateToProductDetail}>
          <img src={photos[currentIndex]} alt={`${manufacturer} ${model}`} className={classes.productImage} />
        </div>
        <button onClick={handleNextClick} className={classes.galleryButton}>❯</button>
      </div>
      <div className={classes.rating}>
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < Math.round(rating) ? classes.star : classes.emptyStar}>★</span>
        ))}   
      </div>
      <div className={classes.priceAndBasket}>
        <p className={classes.price}>{price.toFixed(2)} zł</p>
        {isLoggedIn() && (
          <div className={classes.basketIcon}>
            <img className={classes.koszyk} src={Koszyk} alt="Koszyk" onClick={addToCart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
