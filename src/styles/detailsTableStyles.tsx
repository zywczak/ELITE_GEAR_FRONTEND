import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    details: {
      width: '100%',
      paddingLeft: '0',
      '@media (min-width: 900px)': {
        width: '60%',
        paddingLeft: '20px',
      },
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    rating: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px auto',
      width: '200px',
      background: '#222222',
      borderRadius: '30px',
    },
    table: {
      textAlign: 'center',
      width: '100%',
      marginTop: '15px',
      '& td': {
        padding: '5px 10px',
        borderBottom: '1px solid #555',
      },
    },
    addToCart: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      fontSize: '16px',
    },
    rowName: {
      textAlign: 'right',
    },
    sell: {
      marginTop: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      '@media (max-width: 900px)': {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    price: {
      fontSize: '24px',
      color: 'white',
      fontWeight: 'bold',
    },
    star: {
      color: '#FFD700',
      fontSize: '30px',
    },
    emptyStar: {
      color: '#888',
      fontSize: '30px',
    },
  });

export default useStyles;