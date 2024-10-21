import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import LoginWrapper from "../components/auth/LoginWrapper";
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
    
const Login: React.FC = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Zaloguj się";
  }, []);
                          
  return (
    <>
      <div className={classes.root}>
        <LeftWrapper />
        <LoginWrapper />
      </div>
      <Footer />
    </>
  );
};

export default Login;
