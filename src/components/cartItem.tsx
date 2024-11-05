// import React, { useState } from 'react';
// import { createUseStyles } from 'react-jss';

// interface CartItemProps {
//     manufacturer: string;
//     model: string;
//     photos: string[];
//     quantity: number;
//     price: number;
//     id: number;
// }

// const useStyles = createUseStyles({
//     cartItem: {
//         height: '120px',
//         backgroundColor: '#535252',
//         textAlign: 'center',
//     },
//     imageContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center', // Center gallery inside td
//     },
//     productImage: {
//         width: '120px',
//         height: '100px',
//         objectFit: 'cover',
//         borderRadius: '5px',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//     },
//     navButton: {
//         backgroundColor: 'transparent',
//         border: 'none',
//         fontSize: '18px',
//         cursor: 'pointer',
//         padding: '0 10px',
//         color: '#333',
//         '&:hover': {
//             color: '#007BFF',
//         },
//     },
//     actionIcon: {
//         width: '25px',
//         height: 'auto',
//         margin: '0 5px',
//     },
//     table: {
//         width: '100%',
//         borderCollapse: 'separate',
//         borderSpacing: '0 10px', // Add 10px space between rows
//         marginTop: '20px',
//     },
// });

// const CartItem: React.FC<CartItemProps> = ({ manufacturer, model, photos, quantity, price, id }) => {
//     const classes = useStyles();
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const handlePrev = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
//     };

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
//     };

//     const photoUrl = photos.length > 0 ? photos[currentIndex] : 'http://localhost:8080/products/brakfoto';

//     return (
//         <tr className={classes.cartItem}>
//             <td>
//                 <div className={classes.imageContainer}>
//                     <button className={classes.navButton} onClick={handlePrev}>❮</button>
//                     <img src={photoUrl} alt="Product" className={classes.productImage} />
//                     <button className={classes.navButton} onClick={handleNext}>❯</button>
//                 </div>
//             </td>
//             <td>{manufacturer}</td>
//             <td>{model}</td>
//             <td>
//                 <a href={`minus`}>
//                     <img src="../../public/img/minus.png" alt="minus" className={classes.actionIcon} />
//                 </a>
//                 {quantity}
//                 <a href={`plus`}>
//                     <img src="../../public/img/plus.png" alt="plus" className={classes.actionIcon} />
//                 </a>
//             </td>
//             <td>{price} zł</td>
//             <td>
//                 <a href={`remove`}>
//                     <img src="../../public/img/remove.png" alt="remove" className={classes.actionIcon} />
//                 </a>
//             </td>
//         </tr>
//     );
// };

// export default CartItem;
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

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
    console.log("CartItem id:", id);
    const classes = useStyles();
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    };

    const photoUrl = photos.length > 0 ? photos[currentIndex] : 'http://localhost:8080/products/brakfoto';

    const handlePlus = async () => {
        console.log(`${id}`)
        try {
            const response = await fetch('http://localhost:8080/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId: id }),
            });

            if (response.ok) {
                onQuantityChange(id);
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMinus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await fetch(`http://localhost:8080/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                onQuantityChange(id);
            } else {
                console.error('Failed to decrease product quantity');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemove = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await fetch(`http://localhost:8080/cart/remove/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                onQuantityChange(id);
            } else {
                console.error('Failed to remove product from cart');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
