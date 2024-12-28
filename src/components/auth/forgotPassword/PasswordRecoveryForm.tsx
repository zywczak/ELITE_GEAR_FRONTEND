import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import api from '../../../api/axiosApi';
import axios from 'axios';

const useStyles = createUseStyles({
    textField: {
        marginTop: '50px',
        marginBottom: '50px',
        width: '400px',
        padding: '20px ',
        textAlign: 'center',
        boxSizing: 'border-box'
    },
    h2:{
        color: 'white',
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
    error: {
        color: '#f44336',
        marginBottom: '10px',
    },
});

interface PasswordRecoveryFormProps {
    onProcessingChange: (isProcessing: boolean) => void;
    onResponse: (message: string | null) => void;
    onError: (message: string | null) => void;
}

const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({ onProcessingChange, onResponse, onError }) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const validateEmail = (email: string): boolean => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async () => {
        setLocalError(null);

        if (!email) {
            setLocalError('Email is required.');
            return;
        }
        if (!validateEmail(email)) {
            setLocalError('Invalid email format.');
            return;
        }

        onProcessingChange(true);

        try {
            const response = await api.post(`/forgotPassword/passwordRecoveryRequest/${email}`);
            const token = response.data;
            localStorage.setItem('otpToken', token);
            onResponse("Check your email for the recovery link.");
            onError(null);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {

                const backendError = err.response.data?.error || 
                                      err.response.data?.message;
                onError(backendError);
            } else {
                onError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            onProcessingChange(false);
        }
    };

    return (
        <>
            <h2 className={classes.h2}>Password Recovery</h2>
            <input
                type="email"
                placeholder="Email Address"
                className={classes.textField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {localError && <div className={classes.error}>{localError}</div>}
            <button className={classes.button} onClick={handleSubmit}>
                Send Recovery Email
            </button>
        </>
    );
};

export default PasswordRecoveryForm;
