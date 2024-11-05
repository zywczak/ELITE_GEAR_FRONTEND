import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Header from '../components/header';
import Nav from '../components/nav';
import CartItem from '../components/cartItem';
import Footer from '../components/footer';

interface CartItemProps {
    manufacturer: string;
    model: string;
    photos: string[];
    quantity: number;
    price: number;
    productId: number;
    onQuantityChange: (productId: number) => void;
}

const useStyles = createUseStyles({
    table: {
        borderSpacing: '0 20px',
        width: '95%',
        borderCollapse: 'separate',
        marginTop: '40px',
        margin: 'auto',
    },
    tr: {
        margin: '10px',
    },
    th: {
        backgroundColor: '#535252',
        color: '#fff',
        padding: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    td: {
        backgroundColor: '#fff',
        padding: '10px',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: '#f1f1f1',
        },
    },
    totalRow: {
        fontWeight: 'bold',
        backgroundColor: '#535252',
    },
    orderForm: {
        margin: '20px auto',
        padding: '20px',
        maxWidth: '500px',
        backgroundColor: '#535252',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    formInput: {
        padding: '10px',
        fontSize: '16px',
    },
    formButton: {
        marginTop: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#AA7A00'
    },
    button:{
        padding: '10px',
        backgroundColor: '#AA7A00',
    }
});

const CartPage: React.FC = () => {
    const classes = useStyles();
    const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [formData, setFormData] = useState({ city: '', street: '', houseNumber: '', postalCode: '' });

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(`http://localhost:8080/cart`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const clearCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(`http://localhost:8080/cart`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to clear basket');
            }

            console.log('Basket cleared successfully');
            setCartItems([]); // Update state to empty the cart
        } catch (error) {
            console.error('There was a problem with clearing the basket:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const totalValue = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    const handleQuantityChange = (productId: number) => {
        console.log(`Product with id ${productId} quantity updated`);
        fetchCartItems(); // Refresh the cart items
    };

    const handleOrderButtonClick = () => {
        setShowOrderForm(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmitOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
    
            // Send order details to backend to initiate PayU payment
            const response = await fetch(`http://localhost:8080/orders/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    city: formData.city,
                    street: formData.street,
                    houseNumber: formData.houseNumber,
                    postalCode: formData.postalCode
                })
            });
    
            if (!response.ok) throw new Error('Failed to create order');
    
            const data = await response.json();
    
            window.location.href = data.paymentUrl;
        } catch (error) {
            console.error('There was an error with submitting the order:', error);
        }
    };

    return (
        <>
            <Header />
            <Nav />
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>Manufacturer</th>
                        <th className={classes.th}>Model</th>
                        <th className={classes.th}>Photo</th>
                        <th className={classes.th}>Quantity</th>
                        <th className={classes.th}>Price</th>
                        <th className={classes.th}>
                            <button className={classes.button} onClick={clearCart}>Remove</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.productId}
                            id={item.productId}
                            manufacturer={item.manufacturer}
                            model={item.model}
                            photos={item.photos}
                            quantity={item.quantity}
                            price={item.price}
                            onQuantityChange={handleQuantityChange}  // Pass as a callback
                        />
                    ))}
                    <tr className={classes.totalRow}>
                        <td colSpan={4}></td>
                        <td style={{ textAlign: 'center', padding: '10px' }}>{totalValue.toFixed(2)} zł</td>
                        <td style={{ textAlign: 'center' }}><button className={classes.button} onClick={handleOrderButtonClick}>Place Order</button></td>
                    </tr>
                </tbody>
            </table>

            {showOrderForm && (
                <div className={classes.orderForm}>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={classes.formInput}
                    />
                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className={classes.formInput}
                    />
                    <input
                        type="text"
                        name="houseNumber"
                        placeholder="House Number"
                        value={formData.houseNumber}
                        onChange={handleInputChange}
                        className={classes.formInput}
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={classes.formInput}
                    />
                    <button onClick={handleSubmitOrder} className={classes.formButton}>Submit Order</button>
                </div>
            )}
            <Footer />
        </>
    );
};

export default CartPage;
