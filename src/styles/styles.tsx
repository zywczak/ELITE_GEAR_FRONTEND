import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '50px',
      backgroundColor: 'transparent',
      border: '0px solid #AA7A00',
      color: '#fff',
      maxWidth: '1000px',
      margin: 'auto 20px',
      marginTop: '20px',
      flexDirection: 'column',
      '@media (min-width: 900px)': {
        flexDirection: 'row',
        margin: '30px auto 0',
        backgroundColor: '#535252',
        borderTop: '2px solid #AA7A00',
        borderRight: '2px solid #AA7A00',
        borderLeft: '2px solid #AA7A00',
      },
    },
    specification: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: '#535252',
      maxWidth: '1100px',
      margin: 'auto',
      borderTop: '2px solid #535252',
      borderBottom: '0px solid #535252',
      borderRight: '2px solid #AA7A00',
      borderLeft: '2px solid #AA7A00',
      paddingBottom: '30px',
      '@media (min-width: 900px)': {
        borderBottom: '2px solid #AA7A00',
      },
    },
    specificationTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
      paddingBottom: '10px',
    },
    
    toggleButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    },
  });

  export default useStyles;