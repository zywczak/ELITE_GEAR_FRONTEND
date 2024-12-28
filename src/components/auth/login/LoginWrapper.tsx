import { createUseStyles } from 'react-jss';
import LoginForm from './LoginForm';
import LoginFormFooter from './LoginFormFooter';
import LoginFormHeader from './LoginFormHeader';

const useStyles = createUseStyles({
  right: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(217, 217, 217, 0.2)',
      height: '100%',
      width: '50%',
      '@media (max-width: 768px)':
        {
          width: '80%',
        },
    },
});


const LoginWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.right}>
      <LoginFormHeader />
      <LoginForm />
      <LoginFormFooter />
    </div>
  );
};

export default LoginWrapper;