import React from 'react';
import { createUseStyles } from 'react-jss';
import { CartItemProps } from '../../models/CartItemProps';
import CartItem from './cartItem';

interface CartTableProps {
  cartItems: CartItemProps[];
  onQuantityChange: (productId: number) => void;
  onClearCart: () => void;
  totalValue: number;
  onPlaceOrderClick: () => void;
}

const useStyles = createUseStyles({
  table: {
    borderSpacing: '0 20px',
    width: '95%',
    borderCollapse: 'separate',
    marginTop: '40px',
    margin: 'auto',
  },
  th: {
    backgroundColor: '#535252',
    color: '#fff',
    padding: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  totalRow: {
    fontWeight: 'bold',
    backgroundColor: '#535252',
  },
  button: {
    padding: '10px',
    backgroundColor: '#AA7A00',
  },
});

const CartTable: React.FC<CartTableProps> = ({
  cartItems,
  onQuantityChange,
  onClearCart,
  totalValue,
  onPlaceOrderClick,
}) => {
  const classes = useStyles();

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th className={classes.th}>Photo</th>
          <th className={classes.th}>Manufacturer</th>
          <th className={classes.th}>Model</th>
          <th className={classes.th}>Quantity</th>
          <th className={classes.th}>Price</th>
          <th className={classes.th}>
            <button className={classes.button} onClick={onClearCart}>
              Remove
            </button>
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
            onQuantityChange={onQuantityChange}
          />
        ))}
        <tr className={classes.totalRow}>
          <td colSpan={4}></td>
          <td style={{ textAlign: 'center', padding: '10px' }}>
            {totalValue.toFixed(2)} zł
          </td>
          <td style={{ textAlign: 'center' }}>
            <button className={classes.button} onClick={onPlaceOrderClick}>
              Place Order
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartTable;
