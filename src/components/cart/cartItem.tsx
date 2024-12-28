import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import api from '../../api/axiosApi';

interface CartItemProps {
    manufacturer: string;
    model: string;
    photos: string[];
    quantity: number;
    price: number;
    id: number;
    onQuantityChange: (id: number) => void;
}

const useStyles = createUseStyles({
    cartItem: {
        height: '120px',
        backgroundColor: '#535252',
        textAlign: 'center',
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: '120px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    navButton: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0 10px',
        color: '#333',
        '&:hover': {
            color: '#007BFF',
        },
    },
    actionIcon: {
        width: '25px',
        height: 'auto',
        margin: '0 5px',
    },
});

const CartItem: React.FC<CartItemProps> = ({ id, manufacturer, model, photos, quantity, price, onQuantityChange }) => {
    const classes = useStyles();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    };

    const photoUrl = photos.length > 0 ? photos[currentIndex] : 'http://localhost:8080/products/brakfoto';

    const updateCart = async (endpoint: string, method: 'post' | 'delete', data?: object) => {
        try {
            let response;
            if (method === 'post') {
                response = await api.post(endpoint, data);
            } else if (method === 'delete') {
                response = await api.delete(endpoint, { data });
            } else {
                throw new Error('Unsupported method');
            }
    
            if (response.status === 200 || response.status === 204) {
                onQuantityChange(id);
            } else {
                console.error(`Failed to ${method === 'post' ? 'add' : 'update'} product in cart`);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handlePlus = () => updateCart('/cart', 'post', { productId: id });
    const handleMinus = () => updateCart(`/cart/${id}`, 'delete');
    const handleRemove = () => updateCart(`/cart/remove/${id}`, 'delete');

    return (
        <tr className={classes.cartItem}>
            <td>
                <div className={classes.imageContainer}>
                    <button className={classes.navButton} onClick={handlePrev}>❮</button>
                    <img src={photoUrl} alt="Product" className={classes.productImage} />
                    <button className={classes.navButton} onClick={handleNext}>❯</button>
                </div>
            </td>
            <td>{manufacturer}</td>
            <td>{model}</td>
            <td>
                <button onClick={handleMinus} className={classes.navButton}>
                    <img src="/img/minus.png" alt="minus" className={classes.actionIcon} />
                </button>
                {quantity}
                <button onClick={handlePlus} className={classes.navButton}>
                    <img src="/img/plus.png" alt="plus" className={classes.actionIcon} />
                </button>
            </td>
            <td>{price} zł</td>
            <td>
                <button onClick={handleRemove} className={classes.navButton}>
                    <img src="/img/remove.png" alt="remove" className={classes.actionIcon} />
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
