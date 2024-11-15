import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        maxWidth: 400,
        margin: 'auto',
        textAlign: 'center',
        marginTop: '5rem',
    },
    textField: {
        marginBottom: '1rem',
        width: '100%',
    },
    button: {
        width: '100%',
        backgroundColor: '#1976d2',
        color: '#fff',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#155a9a',
        },
    },
    successMessage: {
        marginTop: '1rem',
        color: '#4caf50',
    },
    errorMessage: {
        marginTop: '1rem',
        color: '#f44336',
    },
});

const ChangePassword: React.FC = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        // Pobierz OTP z localStorage przy załadowaniu komponentu
        const storedOtp = localStorage.getItem('otpToken');
        if (storedOtp) {
            setOtp(storedOtp);
        } else {
            setErrorMessage('No OTP found in localStorage. Please request a new one.');
        }
    }, []);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/forgotPassword/changePassword/${otp}/${email}`,
                {
                    password: newPassword,  // Zmieniamy na 'password'
                    repeatedPassword: confirmPassword,  // Zmieniamy na 'repeatedPassword'
                }
            );
            setResponseMessage(response.data);
            setErrorMessage(null);

            // Usuń OTP z localStorage po pomyślnym żądaniu
            localStorage.removeItem('otpToken');

            window.location.href = '/login';
        } catch (error: any) {
            setResponseMessage(null);
            setErrorMessage(error.response?.data || 'Something went wrong!');
        }
    };

    return (
        <div className={classes.container}>
            <h2>Change Password</h2>
            <input
                type="email"
                placeholder="Email Address"
                className={classes.textField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                className={classes.textField}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className={classes.textField}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className={classes.button} onClick={handleChangePassword}>
                Change Password
            </button>
            {responseMessage && <div className={classes.successMessage}>{responseMessage}</div>}
            {errorMessage && <div className={classes.errorMessage}>{errorMessage}</div>}
        </div>
    );
};

export default ChangePassword;
