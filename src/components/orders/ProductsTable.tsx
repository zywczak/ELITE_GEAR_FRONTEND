import React from 'react';
import { createUseStyles } from 'react-jss';
import { Product } from '../../models/OrderProduct';

const useStyles = createUseStyles({
    productTable: {
        margin: '0px auto',
        width: '90%',
        borderCollapse: 'collapse',
        background: '#fff',
    },
    tableHeader: {
        backgroundColor: 'rgb(190, 189, 189)',
        color: 'black',
        padding: '10px',
        textAlign: 'center',
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    noDataMessage: {
        textAlign: 'center',
        padding: '10px',
        fontStyle: 'italic',
        color: '#888',
    },
});

interface ProductsTableProps {
    products: Product[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
    const classes = useStyles();

    if (!products || products.length === 0) {
        return (
            <div className={classes.noDataMessage}>No products available for this order.</div>
        );
    }

    return (
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
                {products.map((product) => (
                    <tr key={product.productId}>
                        <td className={classes.tableCell}>{product.manufacturer}</td>
                        <td className={classes.tableCell}>{product.model}</td>
                        <td className={classes.tableCell}>{product.price.toFixed(2)} zł</td>
                        <td className={classes.tableCell}>{product.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
