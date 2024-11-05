import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.png';
import { createUseStyles } from 'react-jss';
import { isLoggedIn } from '../utils/AuthUttils.';
import { getAuthToken } from '../services/authService';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../entities/CustoJwtPayload';

const useStyles = createUseStyles({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between', // Rozmieszcza elementy po lewej i prawej stronie
        alignItems: 'center',
        padding: '0 20px', // Dodaje odstęp po bokach
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logoImage: {
        width: 'auto',
        height: '120px',
        padding: '5px',
    },
    userInfoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        marginRight: '20px',
    },
    icon: {
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    icon2: {
        padding: '0 20px',
        extend: 'icon',
        width: '50px',
        height: '50px',
    },
    icon3: {
        extend: 'icon',
        width: '40px',
        height: '40px',
    },
});

const Header: React.FC = () => {
    const [userInfo, setUserInfo] = useState<{ name: string | undefined; surname: string | undefined } | null>(null);

    const classes = useStyles();

    useEffect(() => {
        if (isLoggedIn()) {
            const token = getAuthToken();
            if (token !== null) {
                const decoded = jwtDecode<CustomJwtPayload>(token);
                setUserInfo({ name: decoded.name, surname: decoded.surname });
            }
        }
    }, []);

    return (
        <header className={classes.headerContainer}>
            <div className={classes.logoContainer}>
                <Link to={'/'}>
                    <img className={classes.logoImage} src={Logo} alt="Logo" />
                </Link>
            </div>
            
            <div className={classes.userInfoContainer}>
                {/* {isLoggedIn() && (
                    <img src="/img/user.png" alt="user" className={classes.icon}/>
                )} */}
                {isLoggedIn() && userInfo && (
                    <span id="logged_user">
                        {userInfo.name} {userInfo.surname}
                    </span>
                )}
                {isLoggedIn() && (
                    <a href="/order">
                        <img className={classes.icon2} src="/img/order.png" alt="order" />
                    </a>
                )}
                {isLoggedIn() && (
                    <a href="/cart">
                        <img className={classes.icon2} src="/img/koszyk.png" alt="koszyk" />
                    </a>
                )}
                {!isLoggedIn() && (
                    <a href="/login">
                        <img src="/img/login.png" className={classes.icon2} alt="login" />
                    </a>
                )}
                {isLoggedIn() && (
                    <a href="/logout">
                        <img src="/img/logout.png" className={classes.icon3} alt="logout" />
                    </a>
                )}
            </div>
        </header>
    );
};

export default Header;
