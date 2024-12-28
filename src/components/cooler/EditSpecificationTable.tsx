import React from 'react';
import { createUseStyles } from 'react-jss';

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

interface EditSpecificationTableProps {
    updatedCooler: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit?: (e: React.FormEvent) => Promise<void>;
}

const EditSpecificationTable: React.FC<EditSpecificationTableProps> = ({ updatedCooler, handleChange, handleSubmit }) => {
    const classes = useStyles();
    return (
        <form className={classes.updateForm} onSubmit={handleSubmit ? handleSubmit : (e) => e.preventDefault()}>
      <table>
        <tbody>
        <tr>
                  <td>Manufacturer:</td>
                  <td><input type="text" name="manufacturer" value={updatedCooler.manufacturer} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Model:</td>
                  <td><input type="text" name="model" value={updatedCooler.model} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td>Price (zł):</td>
                  <td><input type="number" name="price" value={updatedCooler.price} onChange={handleChange} /></td>
                </tr>
                <tr>
            <td>Type:</td>
            <td><input type="text" name="type" value={updatedCooler.type} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Fan Count:</td>
            <td><input type="number" name="fanCount" value={updatedCooler.fanCount} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Fan Size (mm):</td>
            <td><input type="number" name="fanSize" value={updatedCooler.fanSize} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Backlight:</td>
            <td>
              <select name="backlight" value={updatedCooler.backlight ? 'true' : 'false'} onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Material:</td>
            <td><input type="text" name="material" value={updatedCooler.material} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Radiator Size:</td>
            <td><input type="text" name="radiatorSize" value={updatedCooler.radiatorSize} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Compatibility:</td>
            <td><input type="text" name="compatibility" value={updatedCooler.compatibility} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit" className={classes.toggleButton}>Save Changes</button>
    </form>
  );
};

export default EditSpecificationTable;
