import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Header from "../components/header";
import { createUseStyles } from "react-jss";
import Wallpaper1 from './aside.jpg';
import Wallpaper2 from './wallpaper.png';

const useStyles = createUseStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 0 20px',
    gap: '20px',
  },
  slogan: {
    color: 'white',
    textAlign: 'center',
    fontSize: '40px',
    lineHeight: '2',
    margin: 'auto',
  },
  Wallpaper: {
    maxHeight: '600px',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  '@media (max-width: 1280px)': {
    Wallpaper: {
      maxHeight: '560px',
      width: 'auto',
      maxWidth: '80%',
    },
    slogan: {
      padding: '50px',
    },
  },
  '@media (max-width: 960px)': {
    Wallpaper: {
      width: 'auto',
      maxWidth: '70%',
    },
    slogan: {
      fontSize: '28px',
    },
  },
  '@media (max-width: 840px)': {
    wrapper: {
      flexDirection: 'column',
      padding: '0px',
    },
    Wallpaper: {
      maxWidth: '500px',
    },
    slogan: {
      fontSize: '22px',
    },
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const [currentWallpaper, setCurrentWallpaper] = useState(Wallpaper2);

  useEffect(() => {
    document.title = "Home";

    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setCurrentWallpaper(Wallpaper1);
      } else {
        setCurrentWallpaper(Wallpaper2);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.app}>
      <Header />
      <Nav />
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <pre className={classes.slogan}>
            "ELITE_GEAR<br />
            -<br />
            KEY TO PERFORMANCE!"
          </pre>
          <img className={classes.Wallpaper} src={currentWallpaper} alt="wallpaper" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
