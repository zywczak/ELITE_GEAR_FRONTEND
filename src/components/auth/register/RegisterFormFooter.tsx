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

const RegisterFormFooter = () => {
    const classes = useStyles();
return (
    <div className={classes.formFooter}>
        Masz konto? <a className={classes.a} href="/login">Zaloguj się</a>
    </div>
)
};

export default RegisterFormFooter;