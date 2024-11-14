import React, { useState, useEffect } from 'react';
import { Order } from '../models/Order';
import axios from 'axios';
import Header from '../components/header';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { createUseStyles } from 'react-jss';

// Define JSS styles
const useStyles = createUseStyles({
    container: {
        padding: '20px',
    },
    table: {
        textAlign: 'center',
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    tableHeader: {
        backgroundColor: '#AA7A00',
        color: '#ffffff',
        padding: '10px',
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    rowClickable: {
        cursor: 'pointer',
        backgroundColor: '#fff',
    },
    rowExpanded: {
        cursor: 'pointer',
        backgroundColor: '#e0f7fa',
    },
    productTable: {
        margin: '10px auto 40px auto',
        width: '90%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        background: '#fff',
    },
});

const OrdersPage: React.FC = () => {
    const classes = useStyles();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token'); // or however you store the token
                const response = await axios.get<Order[]>('http://localhost:8080/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setError(`Error: ${error.response.data.message || 'Network error'}`);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const toggleExpandOrder = (orderId: number) => {
        // Collapse the currently expanded order if it is clicked again
        setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <Nav />
            <div className={classes.container}>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th className={classes.tableHeader}>Id zamówienia</th>
                                <th className={classes.tableHeader}>Data</th>
                                <th className={classes.tableHeader}>Kwota</th>
                                <th className={classes.tableHeader}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <React.Fragment key={order.orderId}>
                                    <tr
                                        onClick={() => toggleExpandOrder(order.orderId)}
                                        className={
                                            expandedOrderId === order.orderId
                                                ? classes.rowExpanded
                                                : classes.rowClickable
                                        }
                                    >
                                        <td className={classes.tableCell}>{order.orderId}</td>
                                        <td className={classes.tableCell}>{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td className={classes.tableCell}>{order.amount.toFixed(2)} zł</td>
                                        <td className={classes.tableCell}>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                                    </tr>
                                    {expandedOrderId === order.orderId && (
                                        <tr>
                                            <td colSpan={4}>
                                                <table className={classes.productTable}>
                                                    <thead>
                                                        <tr>
                                                            <th className={classes.tableHeader}>Producent</th>
                                                            <th className={classes.tableHeader}>Model</th>
                                                            <th className={classes.tableHeader}>Cena</th>
                                                            <th className={classes.tableHeader}>Ilość</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.products.map(product => (
                                                            <tr key={product.productId}>
                                                                <td className={classes.tableCell}>{product.manufacturer}</td>
                                                                <td className={classes.tableCell}>{product.model}</td>
                                                                <td className={classes.tableCell}>{product.price.toFixed(2)} zł</td>
                                                                <td className={classes.tableCell}>Quantity: {product.quantity}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrdersPage;
