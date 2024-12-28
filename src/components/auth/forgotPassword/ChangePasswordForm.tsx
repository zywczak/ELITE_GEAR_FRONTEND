import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import api from '../../../api/axiosApi';

const useStyles = createUseStyles({
    container: {
        maxWidth: 400,
        margin: 'auto',
        textAlign: 'center',
        padding: '20px',
    },
    h2:{
        color: 'white',
        marginBottom: '40px',
    },
    textField: {
        textAlign: 'center',
        marginBottom: '30px',
        width: '100%',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        width: '300px',
        backgroundColor: '#AA7A00',
        color: '#fff',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#AA5A00',
        },
    },
    successMessage: {
        marginTop: '20px',
        color: '#4caf50',
    },
    errorMessage: {
        marginTop: '20px',
        color: '#f44336',
    },
});

interface ChangePasswordFormProps {
    onSuccess?: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSuccess }) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
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
            const response = await api.post(`/forgotPassword/changePassword/${email}/${otp}`, {
                password: newPassword,
                repeatedPassword: confirmPassword,
            });
            setResponseMessage(response.data);
            setErrorMessage(null);
    
            localStorage.removeItem('otpToken');
    
            if (onSuccess) onSuccess();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {

                const backendError = err.response.data?.error || 
                                      err.response.data?.message;
                setErrorMessage(backendError);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className={classes.container}>
            <h2 className={classes.h2}>Change Password</h2>
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

export default ChangePasswordForm;
