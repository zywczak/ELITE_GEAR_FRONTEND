import React from 'react';
import { createUseStyles } from 'react-jss';
import { Cooler } from '../../models/Cooler';

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

interface SpecificationTableProps {
  cooler: Cooler;
}

const SpecificationTable: React.FC<SpecificationTableProps> = ({ cooler }) => {
    const classes = useStyles();

    return (
    <table className={classes.specificationTable}>
      <tbody>
        <tr>
          <td className={classes.rowName}>Type:</td>
          <td>{cooler.type}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Fan Count:</td>
          <td>{cooler.fanCount}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Fan Size:</td>
          <td>{cooler.fanSize} mm</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Backlight:</td>
          <td>{cooler.backlight ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Material:</td>
          <td>{cooler.material}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Radiator Size:</td>
          <td>{cooler.radiatorSize}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Compatibility:</td>
          <td>{cooler.compatibility}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SpecificationTable;
