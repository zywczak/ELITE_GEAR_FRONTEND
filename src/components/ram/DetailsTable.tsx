import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosApi';
import { RAM } from '../../models/RAM';
import useStyles from '../../styles/detailsTableStyles';

interface DetailsTableProps {
  ram: RAM;
}

const DetailsTable: React.FC<DetailsTableProps> = ({ ram }) => {
  const classes = useStyles();

  const handleAddToCart = async () => {
    const basketDto = {
        productId: ram.id,
        quantity: 1,
      };

    try {
      const response = await api.post('/cart', basketDto);
      if (response.status === 200) {
        toast.success('Product added to cart!');
      } else {
        toast.error('Failed to add product to cart.');
      }
    } catch (error) {
      toast.error('Error adding product to cart');
    }
  };

  return (
    <div className={classes.details}>
          <div className={classes.title}>
            {ram.manufacturer} {ram.model}
          </div>
          <div className={classes.rating}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.round(ram.rating) ? classes.star : classes.emptyStar}>★</span>
            ))}
          </div>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className={classes.rowName}>Speed:</td>
                <td>{ram.speed} MHz</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Capacity:</td>
                <td>{ram.capacity}</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Voltage:</td>
                <td>{ram.voltage} V</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Module Count:</td>
                <td>{ram.moduleCount}</td>
              </tr>
            </tbody>
          </table>
      <div className={classes.sell}>
        <div className={classes.price}>{ram.price} zł</div>
        <button className={classes.addToCart} onClick={handleAddToCart}>
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default DetailsTable;
