import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Header from "../components/header";
import { createUseStyles } from "react-jss";
import Wallpaper1 from './aside.jpg';
import Wallpaper2 from './wallpaper.png';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '50px 20px 20px 20px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 0 20px',
    gap: '20px', // Dodaje odstęp pomiędzy tekstem a obrazem
  },
  slogan: {
    color: 'white',
    textAlign: 'center',
    fontSize: '40px',
    lineHeight: '2',
    margin: 'auto',
  },
  Wallpaper: {
    maxHeight: '600px',  // Maksymalna wysokość obrazu
    width: '100%',       // Domyślnie obraz wypełnia dostępne miejsce
    height: 'auto',      // Zachowanie proporcji przy zmianie szerokości
    objectFit: 'contain' // Upewnienie się, że obraz będzie wypełniał miejsce bez rozciągania
  },
  '@media (max-width: 1280px)': {
    Wallpaper: {
      maxHeight: '560px', // Zmniejszenie maksymalnej wysokości przy mniejszych rozdzielczościach
      width: 'auto',      // Usuwamy width: 100%, żeby obraz nie wypełniał całej szerokości
      maxWidth: '80%',    // Ustawiamy konkretną szerokość, np. 80% lub inny procent/px
    },
    slogan: {
      padding: '50px', // Dopasowanie paddingu dla mniejszych ekranów
    },
  },
  '@media (max-width: 960px)': {
    Wallpaper: {
      width: 'auto',      // Dodatkowo usuwamy width: 100% dla rozdzielczości 960px
      maxWidth: '70%',    // Możemy również ustawić inną maksymalną szerokość w tym przedziale
    },
    slogan: {
      fontSize: '28px', // Zmniejszenie czcionki na mniejszych ekranach
    },
  },
  '@media (max-width: 840px)': {
    wrapper: {
      flexDirection: 'column', // Ustawienie w kolumnie dla mniejszych ekranów
      padding: '0px',
    },
    Wallpaper: {
      maxWidth: '500px', // Obraz zajmuje całą szerokość w węższych widokach
    },
    slogan: {
      fontSize: '22px', // Zmniejszenie czcionki na mniejszych ekranach
    },
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const [currentWallpaper, setCurrentWallpaper] = useState(Wallpaper2);

  useEffect(() => {
    document.title = "Home";

    // Funkcja do aktualizacji obrazka w zależności od szerokości okna
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setCurrentWallpaper(Wallpaper1);
      } else {
        setCurrentWallpaper(Wallpaper2);
      }
    };

    // Wywołanie funkcji przy zmianie rozmiaru okna
    window.addEventListener("resize", handleResize);

    // Sprawdzenie przy załadowaniu strony
    handleResize();

    // Czyszczenie event listenera przy odmontowaniu komponentu
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <Nav />
      <div className={classes.wrapper}>
        <pre className={classes.slogan}>
          "ELITE_GEAR<br />
          -<br />
          KEY TO PERFORMANCE!"
        </pre>
        <img className={classes.Wallpaper} src={currentWallpaper} alt="wallpaper" />
      </div>
      <Footer />
    </>
  );
};

export default Home;
