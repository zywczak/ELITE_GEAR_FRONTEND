import { createUseStyles } from 'react-jss';
import Logo from './logo.png';

const useStyles = createUseStyles({
  image: {
    width: '100%',
    height: 'auto',
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  h1:{
    fontSize:'32px',
    fontWeight:'bold',
    color:'#04243E',
    textAlign:'center',
    marginBottom: '20px',
    }
});

const FormHeader = () => {
  const classes = useStyles();
  return (
    <>
    <div>
      <div>
        <img src={Logo} alt="Logo EliteGear" className={classes.image} />
      </div>
    </div>
    <h1 className={classes.h1}>Zaloguj się</h1>
    </>
  )
};

export default FormHeader;