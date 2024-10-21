import React from 'react';
import { Product } from '../models/Product';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    linksContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: '1',
        margin: '10px',
    },
    links: {
        width: '100%',
        fontSize: `clamp(14px, 2vw, 18px)`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '0',
        listStyleType: 'none',
        '& a': {
            textDecoration: 'none',
            color: '#31304D',
            '&:visited': {
                color: '#31304D',
            },
            '&:hover': {
                color: '#F0ECE5',
            },
        },
    },
});

const ProductItem: React.FC<Product> = ({ id, manufacturer, model, price, }) => {
    return (
        <div className="product-item">
            <h3>{manufacturer} {model}</h3>
            <p>Price: ${price}</p>
        </div>
    );
};

export default ProductItem;
