import React from 'react';
import useStyles from '../../styles/editSpecificationStyles';

interface EditSpecificationTableProps {
    updatedRam: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit?: (e: React.FormEvent) => Promise<void>;
}

const EditSpecificationTable: React.FC<EditSpecificationTableProps> = ({ updatedRam, handleChange, handleSubmit }) => {
    const classes = useStyles();
    return (
        <form className={classes.updateForm} onSubmit={handleSubmit ? handleSubmit : (e) => e.preventDefault()}>
            <table>
              <tbody>
              <tr>
                  <td>Manufacturer:</td>
                  <td><input type="text" name="manufacturer" value={updatedRam.manufacturer} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Model:</td>
                  <td><input type="text" name="model" value={updatedRam.model} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Price (zł):</td>
                  <td><input type="number" name="price" value={updatedRam.price} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Speed (MHz):</td>
                  <td>
                    <input
                      type="number"
                      name="speed"
                      value={updatedRam.speed}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Capacity:</td>
                  <td>
                    <input
                      type="text"
                      name="capacity"
                      value={updatedRam.capacity}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Voltage (V):</td>
                  <td>
                    <input
                      type="number"
                      step="0.1"
                      name="voltage"
                      value={updatedRam.voltage}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Module Count:</td>
                  <td>
                    <input
                      type="number"
                      name="moduleCount"
                      value={updatedRam.moduleCount}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Backlight:</td>
                  <td>
                    <select
                      name="backlight"
                      value={updatedRam.backlight ? 'true' : 'false'}
                      onChange={handleChange}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Cooling:</td>
                  <td>
                    <select
                      name="cooling"
                      value={updatedRam.cooling ? 'true' : 'false'}
                      onChange={handleChange}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className={classes.toggleButton}>Save Changes</button>
          </form>
  );
};

export default EditSpecificationTable;
