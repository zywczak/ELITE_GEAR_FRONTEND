import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate(); // Initialize the useNavigate hook

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
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    type: 'USER',
                }),
            });
            console.log(formData);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unknown error');
            }

            const data = await response.json();
            setSuccess('Registration successful');
            setError(null);

            // Redirect to the login page
            navigate('/login'); // Change the path to your login route
        } catch (err) {
            setError('Registration failed: ' + (err instanceof Error ? err.message : 'An unknown error occurred'));
            setSuccess(null);
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
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button className={classes.button} type='submit'>
          Zarejestruj
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
