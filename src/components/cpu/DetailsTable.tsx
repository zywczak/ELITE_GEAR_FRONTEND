import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosApi';
import { CPU } from '../../models/CPU';
import useStyles from '../../styles/detailsTableStyles';

interface DetailsTableProps {
  cpu: CPU;
}

const DetailsTable: React.FC<DetailsTableProps> = ({ cpu }) => {
  const classes = useStyles();

  const handleAddToCart = async () => {
    const basketDto = {
        productId: cpu.id,
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
            {cpu.manufacturer} {cpu.model}
          </div>
          <div className={classes.rating}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.round(cpu.rating) ? classes.star : classes.emptyStar}>★</span>
            ))}
          </div>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className={classes.rowName}>Speed:</td>
                <td>{cpu.speed} GHz</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Technological Process:</td>
                <td>{cpu.technologicalProcess} nm</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Supported Memory:</td>
                <td>{cpu.supportedMemory}</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Threads:</td>
                <td>{cpu.threads}</td>
              </tr>
            </tbody>
          </table>
      <div className={classes.sell}>
        <div className={classes.price}>{cpu.price} zł</div>
        <button className={classes.addToCart} onClick={handleAddToCart}>
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};

export default DetailsTable;
