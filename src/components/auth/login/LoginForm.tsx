import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import api from '../../../api/axiosApi';
import axios from 'axios';

const useAuthStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
      input:{
        margin:'15px',
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
        margin:'5px 15px 0 15px',
        fontWeight: 'bold',
      }
    });

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
          const response = await api.post('/login', { email, password });
          const token = response.data.token;
  
          localStorage.setItem('token', token);
          setError(null);
          window.location.href = '/';
      } catch (err) {
          if (axios.isAxiosError(err) && err.response) {

              const backendError = err.response.data?.error || 
                                    err.response.data?.message || 
                                    'An error occurred.';
              setError(backendError);
          } else {
              setError('An unexpected error occurred. Please try again later.');
          }
      }
  };

  const classes = useAuthStyles();
  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor='email' className={classes.label}>Email</label>
        <input className={classes.input}
          id="email"
          name='email'
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label htmlFor='password' className={classes.label}>Hasło</label>
        <input className={classes.input}
          id="password"
          name='password'
          type='password'    
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {error && <p className={classes.errorMessage}>{error}</p>}
        <input type="submit" className={classes.button} value="Zaloguj się" />
      </form>
    </div>
  );
}

export default LoginForm;