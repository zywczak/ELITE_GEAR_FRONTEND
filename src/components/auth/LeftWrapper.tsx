import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    left: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundImage: 'url(aside.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '50%',
        boxSizing: 'border-box',
      },
    p:{
        textAlign: 'center',
        fontSize: '34px',
        lineHeight: '4',
        color: 'white',
        fontWeight: 'bold',
    },
    '@media (max-width: 768px)': {
        left: {
          display: 'none',
        },
      },
});

const LeftWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.left}>
        
    </div>
  );
};

export default LeftWrapper;