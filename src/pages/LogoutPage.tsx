import React, { useEffect } from 'react';

const LogoutPage: React.FC = () => {

    useEffect(() => {
        localStorage.removeItem('token');
        window.location.href = '/';
    });

    return null;
};

export default LogoutPage;
