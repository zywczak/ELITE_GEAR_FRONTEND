import React from 'react';
import useStyles from '../../styles/editSpecificationStyles';

interface EditSpecificationTableProps {
    updatedMotherboard: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit?: (e: React.FormEvent) => Promise<void>;
}

const EditSpecificationTable: React.FC<EditSpecificationTableProps> = ({ updatedMotherboard, handleChange, handleSubmit }) => {
    const classes = useStyles();
    return (
        <form className={classes.updateForm} onSubmit={handleSubmit ? handleSubmit : (e) => e.preventDefault()}>
      <table>
        <tbody>
        <tr>
                  <td>Manufacturer:</td>
                  <td><input type="text" name="manufacturer" value={updatedMotherboard.manufacturer} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Model:</td>
                  <td><input type="text" name="model" value={updatedMotherboard.model} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Price (zł):</td>
                  <td><input type="number" name="price" value={updatedMotherboard.price} onChange={handleChange} /></td>
                </tr>
          <tr>
            <td>Chipset:</td>
            <td><input type="text" name="chipset" value={updatedMotherboard.chipset} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Form Factor:</td>
            <td><input type="text" name="formFactor" value={updatedMotherboard.formFactor} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Supported Memory:</td>
            <td><input type="text" name="supportedMemory" value={updatedMotherboard.supportedMemory} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Socket:</td>
            <td><input type="text" name="socket" value={updatedMotherboard.socket} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>CPU Architecture:</td>
            <td><input type="text" name="cpuArchitecture" value={updatedMotherboard.cpuArchitecture} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Internal Connectors:</td>
            <td><input type="text" name="internalConnectors" value={updatedMotherboard.internalConnectors} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>External Connectors:</td>
            <td><input type="text" name="externalConnectors" value={updatedMotherboard.externalConnectors} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Memory Slots:</td>
            <td><input type="number" name="memorySlots" value={updatedMotherboard.memorySlots} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Audio System:</td>
            <td><input type="text" name="audioSystem" value={updatedMotherboard.audioSystem} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit" className={classes.toggleButton}>Save Changes</button>
    </form>
  );
};

export default EditSpecificationTable;
