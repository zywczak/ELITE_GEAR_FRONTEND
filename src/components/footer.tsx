import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    footer: {
        padding: '10px',
        background: '#1A1A1A',      
      },
    p:{
        textAlign: 'center',
        color: 'white',
    },
    span:{
        color: '#774000',
    }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
        <p className={classes.p}><span className={classes.span}>&copy; 2024 EliteGear.</span> Wszelkie prawa zastrzeżone.</p>
    </footer>
  );
};

export default Footer;