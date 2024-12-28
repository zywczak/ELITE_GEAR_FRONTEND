import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    specificationTable: {
        width: '80%',
        margin: '0 auto',
        borderCollapse: 'collapse',
        '& th': {
          backgroundColor: '#555',
          color: '#fff',
          padding: '10px',
        },
        '& td': {
          padding: '8px',
          borderBottom: '1px solid #666',
        },
    },
    rowName: {
        textAlign: 'right',
    },
});

export default useStyles;