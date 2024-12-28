import React from 'react';
import useStyles from '../../styles/editSpecificationStyles';

interface EditSpecificationTableProps {
    updatedCpu: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit?: (e: React.FormEvent) => Promise<void>;
}

const EditSpecificationTable: React.FC<EditSpecificationTableProps> = ({ updatedCpu, handleChange, handleSubmit }) => {
    const classes = useStyles();
    return (
        <form className={classes.updateForm} onSubmit={handleSubmit ? handleSubmit : (e) => e.preventDefault()}>
      <table>
              <tbody>
                <tr>
                  <td>Manufacturer:</td>
                  <td><input type="text" name="manufacturer" value={updatedCpu.manufacturer} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Model:</td>
                  <td><input type="text" name="model" value={updatedCpu.model} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Price (zł):</td>
                  <td><input type="number" name="price" value={updatedCpu.price} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Speed (GHz):</td>
                  <td><input type="number" step="0.1" name="speed" value={updatedCpu.speed} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Architecture:</td>
                  <td><input type="text" name="architecture" value={updatedCpu.architecture} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Supported Memory:</td>
                  <td><input type="text" name="supportedMemory" value={updatedCpu.supportedMemory} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Cooling:</td>
                  <td>
                    <select name="cooling" value={updatedCpu.cooling ? 'true' : 'false'} onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Threads:</td>
                  <td><input type="number" name="threads" value={updatedCpu.threads} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Technological Process (nm):</td>
                  <td><input type="number" name="technologicalProcess" value={updatedCpu.technologicalProcess} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Power Consumption (W):</td>
                  <td><input type="number" name="powerConsumption" value={updatedCpu.powerConsumption} onChange={handleChange} /></td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className={classes.toggleButton}>Save Changes</button>
          </form>
  );
};

export default EditSpecificationTable;
