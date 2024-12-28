import React from 'react';
import { CPU } from '../../models/CPU';
import useStyles from '../../styles/specificationStyles';

interface SpecificationTableProps {
  cpu: CPU;
}

const SpecificationTable: React.FC<SpecificationTableProps> = ({ cpu }) => {
    const classes = useStyles();

    return (
      <table className={classes.specificationTable}>
      <tbody>
        <tr>
          <td className={classes.rowName}>Speed:</td>
          <td>{cpu.speed} GHz</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Architecture:</td>
          <td>{cpu.architecture}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Supported Memory:</td>
          <td>{cpu.supportedMemory}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Threads:</td>
          <td>{cpu.threads}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Technological Process:</td>
          <td>{cpu.technologicalProcess} nm</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Power Consumption:</td>
          <td>{cpu.powerConsumption} W</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SpecificationTable;
