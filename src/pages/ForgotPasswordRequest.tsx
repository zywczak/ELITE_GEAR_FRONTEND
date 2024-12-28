import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import PasswordRecoveryForm from '../components/auth/forgotPassword/PasswordRecoveryForm';

const useStyles = createUseStyles({
    container: {
        maxWidth: '500px',
        margin: 'auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
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
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    return (
        <div className={classes.container}>
            {!isProcessing && !responseMessage && (
                <PasswordRecoveryForm
                    onProcessingChange={setIsProcessing}
                    onResponse={setResponseMessage}
                    onError={setErrorMessage}
                />
            )}
            {isProcessing && <div className={classes.processingMessage}>Przetwarzanie...</div>}
            {responseMessage && <div className={classes.successMessage}>{responseMessage}</div>}
            {errorMessage && <div className={classes.errorMessage}>{errorMessage}</div>}
        </div>
    );
};

export default ForgotPasswordRequest;
