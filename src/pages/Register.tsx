import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
// import LeftWrapper from "../components/auth/LeftWrapper";
// import RegisterWrapper from "../components/auth/RegisterWrapper";

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

const Registration: React.FC = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Utwórz konto";
  }, []);

  return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
        {/* <LeftWrapper />
        <RegisterWrapper /> */}
        </div>
      </div>
  );
};

export default Registration;
