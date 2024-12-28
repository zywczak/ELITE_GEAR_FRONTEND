import React from 'react';
import { createUseStyles } from 'react-jss';

interface OrderFormProps {
  formData: { city: string; street: string; houseNumber: string; postalCode: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitOrder: () => void;
}

const useStyles = createUseStyles({
  orderForm: {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '500px',
    backgroundColor: '#535252',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  formInput: {
    padding: '10px',
    fontSize: '16px',
  },
  formButton: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#AA7A00',
  },
});

const OrderForm: React.FC<OrderFormProps> = ({ formData, onInputChange, onSubmitOrder }) => {
  const classes = useStyles();

  return (
    <div className={classes.orderForm}>
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={onInputChange}
        className={classes.formInput}
      />
      <input
        type="text"
        name="street"
        placeholder="Street"
        value={formData.street}
        onChange={onInputChange}
        className={classes.formInput}
      />
      <input
        type="text"
        name="houseNumber"
        placeholder="House Number"
        value={formData.houseNumber}
        onChange={onInputChange}
        className={classes.formInput}
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={onInputChange}
        className={classes.formInput}
      />
      <button onClick={onSubmitOrder} className={classes.formButton}>
        Submit Order
      </button>
    </div>
  );
};

export default OrderForm;
