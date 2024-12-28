import React from 'react';
import ChangePasswordForm from '../components/auth/forgotPassword/ChangePasswordForm';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
});

const ChangePasswordPage: React.FC = () => {
    const classes = useStyles();
    
    const handleSuccess = () => {
        window.location.href = '/login';
    };

    return (
        <div className={classes.container}>
            <ChangePasswordForm onSuccess={handleSuccess} />
        </div>
    );
};

export default ChangePasswordPage;
