import React, { useState, useEffect } from 'react';
import { Order } from '../models/Order';
import axios from 'axios';
import Header from '../components/header';
import Nav from '../components/nav';
import Footer from '../components/footer';

const OrdersPage: React.FC = () => {
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
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>Id zamówienia</th>
                                <th style={tableHeaderStyle}>Data</th>
                                <th style={tableHeaderStyle}>Kwota</th>
                                <th style={tableHeaderStyle}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <React.Fragment key={order.orderId}>
                                    <tr
                                        onClick={() => toggleExpandOrder(order.orderId)}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: expandedOrderId === order.orderId ? '#e0f7fa' : '#fff',
                                        }}
                                    >
                                        <td style={tableCellStyle}>{order.orderId}</td>
                                        <td style={tableCellStyle}>{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td style={tableCellStyle}>{order.amount.toFixed(2)} zł</td>
                                        <td style={tableCellStyle}>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                                    </tr>
                                    {/* Show the product details only for the expanded order */}
                                    {expandedOrderId === order.orderId && (
                                        <tr>
                                            <td colSpan={4}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th style={tableHeaderStyle}>Producent</th>
                                                            <th style={tableHeaderStyle}>Model</th>
                                                            <th style={tableHeaderStyle}>Cena</th>
                                                            <th style={tableHeaderStyle}>Ilość</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.products.map(product => (
                                                            <tr key={product.productId}>
                                                                <td style={tableCellStyle}>{product.manufacturer}</td>
                                                                <td style={tableCellStyle}>{product.model}</td>
                                                                <td style={tableCellStyle}>{product.price.toFixed(2)} zł</td>
                                                                <td style={tableCellStyle}>Quantity: {product.quantity}</td>
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

const tableHeaderStyle = {
    backgroundColor: '#007BFF',
    color: '#ffffff',
    padding: '10px',
    textAlign: 'left' as 'left',
};

const tableCellStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
};

export default OrdersPage;
