import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useAuthStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
      input:{
        margin:'5px 15px 0px 15px',
        padding: '10px',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        margin: 'auto',
      },
      button: {
        margin:'15px',
        padding: '10px 0',
        marginTop: '30px',
        borderRadius: '5px',
        border: '0px solid #ccc',
        backgroundColor: '#774000',
        color: 'white',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:active': {
          transform: 'scale(0.95)',
        },
        '&:hover': {
          backgroundColor: '#161A30',
        },
        '&:disabled': {
          backgroundColor: '#ccc',
          cursor: 'not-allowed',
        },
      },
      errorMessage: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '14px',
        color: '#8B0000',
        marginTop: '1rem',
      },
      label:{
        margin:'5px 15px 0 25px',
        fontWeight: 'bold',
      }
    });

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const classes = useAuthStyles();
  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <label htmlFor='name' className={classes.label}>Imię</label>
        <input className={classes.input}
          id="name"
          name='name'
          type='text'
        />

      <label htmlFor='surname' className={classes.label}>Nazwisko</label>
        <input className={classes.input}
          id="surname"
          name='surname'
          type='text'
        />

        <label htmlFor='email' className={classes.label}>Email</label>
        <input className={classes.input}
          id="email"
          name='email'
          type='text'
        />

        <label htmlFor='password' className={classes.label}>Hasło</label>
        <input className={classes.input}
          id="password"
          name='password'
          type='password'
        />

        <label htmlFor='confirmPassword' className={classes.label}>Powtórz hasło</label>
        <input className={classes.input}
          id="confirmPassword"
          name='confirmPassword'
          type='password'
        />

        <button className={classes.button} type='submit'>
          Zaloguj się
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
