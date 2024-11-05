import React, { useState } from 'react';
import { Product } from '../models/Product';
import { createUseStyles } from 'react-jss';
import Koszyk from './koszyk.png';
import { isLoggedIn } from '../utils/AuthUttils.';
import { useNavigate } from 'react-router-dom';  // Import useNavigate


const useStyles = createUseStyles({
  productItem: {
    width: '300px', // Stała szerokość
    height: '320px', // Stała wysokość
    border: '2px solid #AA7A00', // Złote obramowanie
    backgroundColor: '#535252', // Ciemne tło
    color: '#fff', // Biały tekst
    padding: '20px',
    margin: '20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden', // Ukrywa nadmiar zawartości, jeśli jest zbyt duża
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
    zIndex: 1, // Z-index to make sure buttons are clickable
  },
  imageContainer: {
    width: '250px', // Kwadratowy kształt kontenera
    height: '200px', // Kwadratowy kształt kontenera
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Tło kontenera obrazu
  },
  productImage: {
    maxWidth: '100%', // Maksymalna szerokość obrazu
    maxHeight: '100%', // Maksymalna wysokość obrazu
    objectFit: 'contain', // Zachowanie proporcji obrazu
  },
  productName: {
    fontSize: '18px',
    margin: '10px 0',
    color: '#ddd', // Jaśniejszy tekst
  },
  priceAndBasket: {
    display: 'flex',
    justifyContent: 'space-around', // Rozsuwa elementy na maksymalną odległość
    alignItems: 'center', // Wyrównuje w pionie
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
    color: '#FFD700', // Złote gwiazdki
    fontSize: '25px',
  },
  emptyStar: {
    color: '#888', // Szare gwiazdki na brakującą ocenę
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
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  const addToCart = async () => {
    if (!isLoggedIn()) {
      navigate("/login");  // Navigate to the login page
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
      const token = localStorage.getItem('token');
        console.log(token);
        // Sprawdź czy token istnieje
        if (!token) {
            throw new Error('No token found');
        }

      const response = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(basketDto),
      });

      if (response.ok) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={classes.productItem}>
      <h3 className={classes.productName}>{manufacturer} {model}</h3>
      <div className={classes.imageGallery}>
        <button onClick={handlePrevClick} className={classes.galleryButton}>❮</button>
        <div className={classes.imageContainer}>
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
        <div className={classes.basketIcon}>
          <img className={classes.koszyk} src={Koszyk} alt="Koszyk" onClick={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
