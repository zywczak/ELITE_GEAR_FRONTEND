import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import LeftWrapper from "../components/auth/LeftWrapper";
import LoginWrapper from "../components/auth/login/LoginWrapper";

const useStyles = createUseStyles({
    root: {
      padding: '0px 200px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      '@media (max-width: 1200px)': {
        padding: '0px',
        height: '100vh',
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
    </>
  );
};

export default Login;
