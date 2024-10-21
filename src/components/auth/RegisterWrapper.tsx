import { createUseStyles } from 'react-jss';
import RegisterFormHeader from './RegisterFormHeader';
import RegisterForm from './RegisterForm';
import RegisterFormFooter from './RegisterFormFooter';

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


const RegisterWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.right}>
      <RegisterFormHeader />
      <RegisterForm />
      <RegisterFormFooter />
    </div>
  );
};

export default RegisterWrapper;