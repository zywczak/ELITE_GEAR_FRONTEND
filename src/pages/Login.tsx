import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
// import LeftWrapper from "../components/auth/LeftWrapper";
// import LoginWrapper from "../components/auth/LoginWrapper";

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#161A30',
      },
      wrapper:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        width: '80%',
        height: '100vh',
      },
      '@media (max-width: 1080px)': {
        wrapper: {
          width: '100%',
          height: '100vh',
          padding: '0px',
        },
      },
    });
const Login: React.FC = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Zaloguj się";
  }, []);
                          
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {/* <LeftWrapper />
        <LoginWrapper /> */}
      </div>
    </div>
  );
};

export default Login;
