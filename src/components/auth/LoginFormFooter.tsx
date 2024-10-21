import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    formFooter: {
        textAlign: 'center',
    },
    footerText: {
        fontSize: '0.8rem',
    },
    a:{
        textDecoration: 'none',
        color: 'blue',
    }
});

const LoginFormFooter = () => {
    const classes = useStyles();
return (
    <div className={classes.formFooter}>
        Nie masz konta? <a className={classes.a} href="/register">Zarejestruj się</a>
    </div>
)
};

export default LoginFormFooter;