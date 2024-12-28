import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '20px',
    },
    formContainer: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '1px 20px 20px 20px',
        backgroundColor: '#f7f7f7',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    th: {
        textAlign: 'left',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
    },
    td: {
        borderBottom: '1px solid #ccc',
    },
    input: {
        width: '100%',
        padding: '12px',
        fontSize: '12px',
        border: '0px solid #ccc',
        boxSizing: 'border-box',
    },
    checkbox: {
        marginRight: '10px',
    },
    errorMessage: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
    submitButton: {
        display: 'block',
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#AA7A00',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(94, 52, 1, 0.849)',
        },
    },
    previewContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '10px',
    },
    previewImage: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        marginRight: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
});

export default useStyles;