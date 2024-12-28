import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    updateForm: {
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#535252',
        borderRadius: '10px',
        '& table': {
          width: '100%',
          '& td': {
            padding: '8px',
          },
          '& input, & select': {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #aaa',
            backgroundColor: '#fff',
          },
        },
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