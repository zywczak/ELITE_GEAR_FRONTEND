import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import RegisterWrapper from "../components/auth/RegisterWrapper";
import LeftWrapper from "../components/auth/LeftWrapper";
import Footer from "../components/footer";

const useStyles = createUseStyles({
    root: {
      padding: ' 50px 200px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '79vh',
      '@media (max-width: 1200px)': {
        padding: '0px',
        height: '91vh',
      },
      },
    });

const Register: React.FC = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Zarejestruj się";
  }, []);
                          
  return (
    <>
      <div className={classes.root}>
        <LeftWrapper />
        <RegisterWrapper />
      </div>
      <Footer />
    </>
  );
};

export default Register;
