import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  input: {
    margin: '5px 15px 0px 15px',
    padding: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    margin: 'auto',
  },
  button: {
    margin: '15px',
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
  label: {
    margin: '5px 15px 0 25px',
    fontWeight: 'bold',
  }
});

const RegistrationForm: React.FC = () => {
  const classes = useAuthStyles();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmedPassword: ''
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmedPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await api.post('/register', {
        ...formData,
      });
      setError(null);

      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const backendError = err.response.data?.error ||
                             err.response.data?.message ||
                             'An error occurred.';
        setError(backendError);
      } else {
        setError('Registration failed: An unexpected error occurred.');
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label htmlFor='name' className={classes.label}>Imię</label>
        <input className={classes.input}
          id="name"
          name='name'
          type='text'
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor='surname' className={classes.label}>Nazwisko</label>
        <input className={classes.input}
          id="surname"
          name='surname'
          type='text'
          value={formData.surname}
          onChange={handleChange}
          required
        />

        <label htmlFor='email' className={classes.label}>Email</label>
        <input className={classes.input}
          id="email"
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor='password' className={classes.label}>Hasło</label>
        <input className={classes.input}
          id="password"
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor='confirmedPassword' className={classes.label}>Powtórz hasło</label>
        <input className={classes.input}
          id="confirmedPassword"
          name='confirmedPassword'
          type='password'
          value={formData.confirmedPassword}
          onChange={handleChange}
          required
        />
        {error && <p className={classes.errorMessage}>{error}</p>}
        <button className={classes.button} type='submit'>
          Zarejestruj
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
