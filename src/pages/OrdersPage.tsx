import React, { useState, useEffect } from 'react';
import { Order } from '../models/Order';
import Header from '../components/header';
import Nav from '../components/nav';
import Footer from '../components/footer';
import api from '../api/axiosApi';
import OrdersTable from '../components/orders/ordersTable';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get<Order[]>('/orders');
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <Nav />
            <div style={{ padding: '20px' }}>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <OrdersTable orders={orders} />
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrdersPage;
