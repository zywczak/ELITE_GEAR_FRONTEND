import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosApi';
import { Motherboard } from '../../models/Motherboard';
import useStyles from '../../styles/detailsTableStyles';

interface DetailsTableProps {
  motherboard: Motherboard;
}

const DetailsTable: React.FC<DetailsTableProps> = ({ motherboard }) => {
  const classes = useStyles();

  const handleAddToCart = async () => {
    const basketDto = {
        productId: motherboard.id,
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
            {motherboard.manufacturer} {motherboard.model}
          </div>
          <div className={classes.rating}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.round(motherboard.rating) ? classes.star : classes.emptyStar}>★</span>
            ))}
          </div>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className={classes.rowName}>Chipset:</td>
                <td>{motherboard.chipset}</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Form Factor:</td>
                <td>{motherboard.formFactor}</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Supported Memory:</td>
                <td>{motherboard.supportedMemory}</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Socket:</td>
                <td>{motherboard.socket}</td>
              </tr>
            </tbody>
          </table>
      <div className={classes.sell}>
        <div className={classes.price}>{motherboard.price} zł</div>
        <button className={classes.addToCart} onClick={handleAddToCart}>
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default DetailsTable;
