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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <Header/>
        <Nav/>
        <div>
    {orders.length === 0 ? (
        <p>No orders found.</p>
    ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>Id zamówienia</th>
                    <th>Data</th>
                    <th>Kwota</th>
                    <th>Status</th>
                    <th>Produkty</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <React.Fragment key={order.id}>
                        <tr>
                            <td>{order.id}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.amount.toFixed(2)} zł</td>
                            <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                        </tr>
                        <tr>
                            {order.products.map(product => (
                                <td>
                                    Manufacturer: {product.manufacturer}, Model: {product.model}, Price: {product.price.toFixed(2)} zł, Quantity: {product.quantity}
                                </td>
                            ))}
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )}
</div>

        <Footer/>
        </>
    );
};

export default OrdersPage;
