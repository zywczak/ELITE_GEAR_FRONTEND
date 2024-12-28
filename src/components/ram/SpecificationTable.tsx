import React from 'react';
import { RAM } from '../../models/RAM';
import useStyles from '../../styles/specificationStyles';

interface SpecificationTableProps {
  ram: RAM;
}

const SpecificationTable: React.FC<SpecificationTableProps> = ({ ram }) => {
    const classes = useStyles();

    return (
      <table className={classes.specificationTable}>
      <tbody>
        <tr>
          <td className={classes.rowName}>Speed:</td>
          <td>{ram.speed} MHz</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Capacity:</td>
          <td>{ram.capacity}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Voltage:</td>
          <td>{ram.voltage} V</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Module Count:</td>
          <td>{ram.moduleCount}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Backlight:</td>
          <td>{ram.backlight ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Cooling:</td>
          <td>{ram.cooling ? 'Yes' : 'No'}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SpecificationTable;
