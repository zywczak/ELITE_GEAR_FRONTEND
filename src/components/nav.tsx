import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
    linksContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: '1',
        margin: '10px',
    },
    links: {
        width: '100%',
        fontSize: `clamp(14px, 2vw, 18px)`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '0',
        listStyleType: 'none',
        '& a': {
            textDecoration: 'none',
            fontWeight: 'bold',
            '&:visited': {
                color: 'white',
            },
            '&:hover': {
                color: '#F0ECE5',
            },
        },
    },
});

const Nav: React.FC = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.linksContainer}>
            <ul className={classes.links}>
                <li>
                    <Link to="/cpu">CPU</Link>
                </li>

                <li>
                    <Link to="/coolers">Chłodzenie CPU</Link>
                </li>

                <li>
                    <Link to="/motherboard">Płyty główne</Link>
                </li>

                <li>
                    <Link to="/ram">RAM</Link>
                </li>
            </ul>
        </div>
    );
};

export default Nav;
