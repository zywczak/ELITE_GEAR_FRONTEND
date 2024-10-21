import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.png';
import { createUseStyles } from 'react-jss';
// import { isLoggedIn} from '../../utils/authUtils';
// import { getAuthToken } from '../../services/BackendService';
// import { CustomJwtPayload } from "../../entities/CustomJwtPayload";

// import { jwtDecode } from 'jwt-decode';

const useStyles = createUseStyles({
    logoContainer: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        marginRight: '50px',
    },
    logoImage: {
        width: 'auto',
        height: '120px',
        padding: '5px',
    },
});

const Header: React.FC = () => {
    const [userInfo, setUserInfo] = useState<{ name: string | undefined; surname: string | undefined } | null>(null);
    
    const classes = useStyles();

    // useEffect(() => {
    //     if (isLoggedIn()) {
    //         const token = getAuthToken();
    //         if (token !== null) {
    //             const decoded = jwtDecode<CustomJwtPayload>(token);
    //             setUserInfo({ name: decoded.name, surname: decoded.surname }); // Correctly set user info to state
    //         }
    //     }
    // }, []);

    return (
        <header>
            <div className={classes.logoContainer}>
                <Link to={'/'}>
                    <img className={classes.logoImage} src={Logo} alt="Logo" />
                </Link>
            </div>
            
            {/* <div>
                {isLoggedIn() && (
                    <img src="/img/user.png" alt="user" />
                )}
                {isLoggedIn() && userInfo && (
                    <span id="logged_user">
                        {userInfo.name} {userInfo.surname}
                    </span>
                )}
                {isLoggedIn() && (
                    <a href="cart">
                        <img className="cart" src="/img/koszyk.png" alt="koszyk" />
                    </a>
                )}
                {!isLoggedIn() && (
                    <a href="login">
                        <img src="/img/login.png" alt="login" />
                    </a>
                )}
                {isLoggedIn() && (
                    <a href="logout">
                        <img src="/img/logout.png" alt="logout" />
                    </a>
                )}
            </div> */}
        </header>
    );
};

export default Header;
