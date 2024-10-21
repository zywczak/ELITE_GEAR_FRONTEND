import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    counterInput: {
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      width: '50px',
      textAlign: 'center',
      fontSize: '18px',
      padding: '5px',
      // Ukrywanie strzałek w Chrome, Safari, Edge
    '&::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '&::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      // Ukrywanie strzałek w Firefox
      '&[type=number]': {
        MozAppearance: 'textfield',
      },
    },
    button: {
      fontSize: '18px',
      padding: '6px 10px',
      cursor: 'pointer',
      backgroundColor: '#eee',
      border: '0px solid #ccc',
      '&:hover': {
        backgroundColor: '#ddd',
      },
    },
  });
  
const CounterInput: React.FC = () => {
    const classes = useStyles();
    
    const [value, setValue] = useState(1);

  const handleIncrease = () => {
    setValue(prevValue => prevValue + 1);
  };

  const handleDecrease = () => {
    setValue(prevValue => (prevValue > 1 ? prevValue - 1 : 1)); // Minimalna wartość to 1
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setValue(newValue);
    }
  };

  return (
    <div className={classes.counterInput}>
      <button className={classes.button} onClick={handleDecrease}>-</button>
      <input 
        type="number" 
        className={classes.input}
        value={value} 
        onChange={handleChange} 
        min="1" 
      />
      <button className={classes.button} onClick={handleIncrease}>+</button>
    </div>
  );
};

export default CounterInput;
