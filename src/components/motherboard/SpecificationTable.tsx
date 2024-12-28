import React from 'react';
import { Motherboard } from '../../models/Motherboard';
import useStyles from '../../styles/specificationStyles';

interface SpecificationTableProps {
  motherboard: Motherboard;
}

const SpecificationTable: React.FC<SpecificationTableProps> = ({ motherboard }) => {
    const classes = useStyles();

    return (
      <table className={classes.specificationTable}>
      <tbody>
        <tr>
          <td className={classes.rowName}>Chipset:</td>
          <td>{motherboard.chipset}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Form Factor:</td>
          <td>{motherboard.formFactor}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Supported Memory:</td>
          <td>{motherboard.supportedMemory}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Socket:</td>
          <td>{motherboard.socket}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>CPU Architecture:</td>
          <td>{motherboard.cpuArchitecture}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Internal Connectors:</td>
          <td>{motherboard.internalConnectors}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>External Connectors:</td>
          <td>{motherboard.externalConnectors}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Memory Slots:</td>
          <td>{motherboard.memorySlots}</td>
        </tr>
        <tr>
          <td className={classes.rowName}>Audio System:</td>
          <td>{motherboard.audioSystem}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SpecificationTable;
