import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cooler } from '../../models/Cooler';
import api from '../../api/axiosApi';
import useStyles from '../../styles/detailsTableStyles';

interface DetailsTableProps {
  cooler: Cooler;
}

const DetailsTable: React.FC<DetailsTableProps> = ({ cooler }) => {
  const classes = useStyles();

  const handleAddToCart = async () => {
    const basketDto = {
        productId: cooler.id,
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
        {cooler.manufacturer} {cooler.model}
      </div>
      <div className={classes.rating}>
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < Math.round(cooler.rating) ? classes.star : classes.emptyStar}>
            ★
          </span>
        ))}
      </div>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td className={classes.rowName}>Type:</td>
            <td>{cooler.type}</td>
          </tr>
          <tr>
            <td className={classes.rowName}>Fan Count:</td>
            <td>{cooler.fanCount}</td>
          </tr>
          <tr>
            <td className={classes.rowName}>Fan Size:</td>
            <td>{cooler.fanSize} mm</td>
          </tr>
          <tr>
            <td className={classes.rowName}>Compatibility:</td>
            <td>{cooler.compatibility}</td>
          </tr>
        </tbody>
      </table>
      <div className={classes.sell}>
        <div className={classes.price}>{cooler.price} zł</div>
        <button className={classes.addToCart} onClick={handleAddToCart}>
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default DetailsTable;
