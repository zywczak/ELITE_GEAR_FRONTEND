import React, { useState } from 'react';
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
    processingMessage: {
        fontSize: '1.2rem',
        color: '#1976d2',
        marginTop: '2rem',
    },
});

const ForgotPasswordRequest: React.FC = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false); // Nowy stan do kontroli przetwarzania

    const handleSubmit = async () => {
        setIsProcessing(true); // Ustawienie stanu przetwarzania na true
        try {
            const response = await axios.post(`http://localhost:8080/forgotPassword/passwordRecoveryRequest/${email}`);
            const token = response.data; // Pobranie tokena z odpowiedzi
            localStorage.setItem('otpToken', token); // Zapis tokena w localStorage
            setResponseMessage("Przetwarzanie...");
            setErrorMessage(null);
        } catch (error: any) {
            setResponseMessage(null);
            setErrorMessage(error.response?.data || 'Something went wrong!');
        } finally {
            setIsProcessing(false); // Resetowanie stanu przetwarzania
        }
    };

    return (
        <div className={classes.container}>
            {!isProcessing && !responseMessage && ( // Ukrycie formularza, gdy przetwarzanie trwa lub komunikat już wyświetlony
                <>
                    <h2>Password Recovery</h2>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className={classes.textField}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className={classes.button} onClick={handleSubmit}>
                        Send Recovery Email
                    </button>
                </>
            )}
            {isProcessing && <div className={classes.processingMessage}>Przetwarzanie...</div>} {/* Komunikat "Przetwarzanie" */}
            {responseMessage && <div className={classes.successMessage}>{responseMessage}</div>}
            {errorMessage && <div className={classes.errorMessage}>{errorMessage}</div>}
        </div>
    );
};

export default ForgotPasswordRequest;
