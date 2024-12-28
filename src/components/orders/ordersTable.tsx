import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Order } from '../../models/Order';
import ProductsTable from './ProductsTable';
import api from '../../api/axiosApi'; 

const useStyles = createUseStyles({
    table: {
        textAlign: 'center',
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 10px', 
    },
    tableHeader: {
        backgroundColor: '#535252',
        color: 'black',
        padding: '20px',
    },
    tableCell: {
        padding: '20px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#535252',
    },
    rowClickable: {
        cursor: 'pointer',
        backgroundColor: '#fff',
    },
    rowExpanded: {
        cursor: 'pointer',
        backgroundColor: '#535252',
    },
    spacerRow: {
        height: '5px',
        backgroundColor: 'transparent',
    },
    paidStatus: {
        color: 'green',
        fontWeight: 'bold',
    },
    payButton: {
        padding: '5px 10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
});

interface OrdersTableProps {
    orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
    const classes = useStyles();
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    const toggleExpandOrder = (orderId: number) => {
        setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
    };

    const handlePay = async (orderId: number) => {
        try {
            const response = await api.post(`/orders/pay/${orderId}`);
            const paymentUrl = response.data.paymentUrl;

            if (paymentUrl) {
                window.location.href = paymentUrl;
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    return (
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
                {orders.map((order, index) => (
                    <React.Fragment key={order.orderId}>
                        {index !== 0 && (
                            <tr className={classes.spacerRow}>
                                <td colSpan={4}></td>
                            </tr>
                        )}
                        <tr
                            onClick={() => toggleExpandOrder(order.orderId)}
                            className={
                                expandedOrderId === order.orderId
                                    ? classes.rowExpanded
                                    : classes.rowClickable
                            }
                        >
                            <td className={classes.tableCell}>{order.orderId}</td>
                            <td className={classes.tableCell}>
                                {new Date(order.orderDate).toLocaleDateString()}
                            </td>
                            <td className={classes.tableCell}>
                                {order.amount.toFixed(2)} zł
                            </td>
                            <td className={classes.tableCell}>
                                {order.paid ? (
                                    <span className={classes.paidStatus}>Zapłacone</span>
                                ) : (
                                    <button
                                        className={classes.payButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePay(order.orderId);
                                        }}
                                    >
                                        Zapłać
                                    </button>
                                )}
                            </td>
                        </tr>
                        {expandedOrderId === order.orderId && (
                            <tr>
                                <td colSpan={4}>
                                    <ProductsTable products={order.products} />
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default OrdersTable;
