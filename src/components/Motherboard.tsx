import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Motherboard } from '../models/Motherboard';
import CounterInput from './CounterInput';
import ImageGallery from './ImageGallery';
import { useParams } from 'react-router-dom';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '50px',
    backgroundColor: 'transparent',
    border: '0px solid #AA7A00',
    color: '#fff',
    maxWidth: '1000px',
    margin: 'auto 20px', 
    marginTop: '20px',
    flexDirection: 'column',
    '@media (min-width: 900px)': {
      flexDirection: 'row',
      margin: '30px auto 0',
      backgroundColor: '#535252',
      borderTop: '2px solid #AA7A00',
      borderRight: '2px solid #AA7A00',
      borderLeft: '2px solid #AA7A00',
    },
  },
  imageGallery: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    '@media (min-width: 900px)': {
      marginBottom: '0',
    },
  },
  mainImage: {
    width: '350px',
    height: '350px',
    marginBottom: '30px',
    objectFit: 'cover',
  },
  thumbnailContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '50px',
    height: '50px',
    margin: '0 5px',
    cursor: 'pointer',
    border: '1px solid #555',
    objectFit: 'cover',
  },
  details: {
    width: '100%',
    paddingLeft: '0',
    '@media (min-width: 900px)': {
      width: '60%',
      paddingLeft: '20px',
    },
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px auto',
    width: '200px',
    background: '#222222',
    borderRadius: '30px',
  },
  star: {
    color: '#FFD700',
    fontSize: '30px',
  },
  emptyStar: {
    color: '#888',
    fontSize: '30px',
  },
  price: {
    fontSize: '24px',
    color: 'white',
    fontWeight: 'bold',
  },
  table: {
    textAlign: 'center',
    width: '100%',
    marginTop: '15px',
    '& td': {
      padding: '5px 10px',
      borderBottom: '1px solid #555',
    },
  },
  addToCart: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
  },
  rowName: {
    textAlign: 'right',
  },
  sell: {
    marginTop: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  specification: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#535252', // Background color for the specification section
    maxWidth: '1100px',
    margin: 'auto',
    borderTop: '2px solid #535252',
    borderBottom: '0px solid #535252',
    borderRight: '2px solid #AA7A00',
    borderLeft: '2px solid #AA7A00',
    paddingBottom: '30px',
    '@media (min-width: 900px)': {
      borderBottom: '2px solid #AA7A00',
    },
  },
  specificationTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center', // Center align the title
    paddingBottom: '10px', // Padding below the title
  },
  specificationTable: {
    width: '80%',
    margin: '0 auto', // Centering the table
    borderCollapse: 'collapse', // Collapse borders
    '& th': {
      backgroundColor: '#555', // Header background
      color: '#fff', // Header text color
      padding: '10px', // Padding for header cells
    },
    '& td': {
      padding: '8px', // Padding for data cells
      borderBottom: '1px solid #666', // Data cell bottom border
    },
  },
  toggleButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  fileInput: {
    marginBottom: '10px',
  },
  deleteCheckbox: {
    marginRight: '10px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '20px',
  },
  previewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  },
});

// Define the props type
interface MotherboardComponentProps {
  motherboard: Motherboard;
}

const MotherboardComponent: React.FC<MotherboardComponentProps> = ({ motherboard }) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  // Check if photos array is empty or not
  const hasPhotos = motherboard.photos && motherboard.photos.length > 0;

  // State to manage the selected main image
  const [mainImage, setMainImage] = useState<string>(
    hasPhotos ? motherboard.photos[0] : 'default-no-photo.jpg' // Fallback to default no-photo image if no photos
  );

  const handleThumbnailClick = (photo: string): void => {
    setMainImage(photo);
  };
  const [isEditingPhotos, setIsEditingPhotos] = useState<boolean>(false);
  const [photosToAdd, setPhotosToAdd] = useState<File[]>([]);
  const [photosToRemove, setPhotosToRemove] = useState<number[]>([]);
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);

  // Toggle photo edit mode
  const togglePhotoEditMode = () => {
    setIsEditingPhotos((prev) => !prev);
  };

  // Handle photo addition with preview
  const handlePhotoAddition = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPhotosToAdd(filesArray);
      
      // Generate previews for added photos
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewPhotos(previews);
    }
  };

  // Handle photo removal selection by extracting ID from URL
  const handlePhotoRemovalSelection = (photoUrl: string) => {
    const photoId = parseInt(photoUrl.split('/').pop() || '', 10);
    setPhotosToRemove((prev) =>
      prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]
    );
  };
  const [loading, setLoading] = useState<boolean>(false);
  const handlePhotoSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    photosToAdd.forEach((photo) => formData.append('photosToAdd', photo));
    photosToRemove.forEach((photoId) => formData.append('photoIdsToRemove', String(photoId)));
  
    try {
      const response = await fetch(`http://localhost:8080/product/${id}/photos`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        alert('Photos updated successfully!');
        window.location.reload();
      } else {
        alert('Failed to update photos.');
      }
    } catch (error) {
      console.error('Error updating photos:', error);
      alert('An error occurred while updating photos.');
    } finally {
      setLoading(false);
    }
  };
  const [isEditing, setIsEditing] = useState<boolean>(false);
const [updatedMotherboard, setUpdatedMotherboard] = useState(motherboard);

// Toggle edit mode
const toggleEditMode = () => {
  setIsEditing((prev) => !prev);
};

// Handle input changes
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setUpdatedMotherboard((prev) => ({
    ...prev,
    [name]: ['price', 'memorySlots'].includes(name)
      ? Number(value)
      : value,
  }));
};

// Submit updated data
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log('Sending data:', JSON.stringify(updatedMotherboard));
  try {
    const response = await fetch(`http://localhost:8080/motherboard/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMotherboard),
    });

    if (response.ok) {
      alert('Motherboard data updated successfully!');
      setIsEditing(false);
      window.location.reload();
    } else {
      const errorMsg = await response.text();
      console.error('Error:', errorMsg);
      alert('Failed to update motherboard data: ' + errorMsg);
    }
  } catch (error) {
    console.error('Error updating motherboard data:', error);
    alert('An error occurred while updating the data.');
  }
};
  return (
    <>
      <div className={classes.container}>
        {!isEditingPhotos ? (
          <ImageGallery photos={motherboard.photos} onMainImageChange={() => {}} />
        ) : (
          <div className={classes.formContainer}>
          <h3>Update Photos</h3>
          <input
            type="file"
            multiple
            className={classes.fileInput}
            onChange={handlePhotoAddition}
          />
          <h4>Preview of Added Photos:</h4>
          <div className={classes.previewContainer}>
            {previewPhotos.map((photo, index) => (
              <img key={index} src={photo} alt={`preview-${index}`} className={classes.thumbnail} />
            ))}
          </div>
          <h4>Select Photos to Remove:</h4>
          {motherboard.photos.map((photoUrl: string, index: number) => (
            <div key={index}>
              <input
                type="checkbox"
                className={classes.deleteCheckbox}
                onChange={() => handlePhotoRemovalSelection(photoUrl)}
              />
              <img src={photoUrl} alt={`thumbnail-${index}`} className={classes.thumbnail} />
            </div>
          ))}
          <button onClick={handlePhotoSubmit} className={classes.submitButton}>
            Submit Changes
          </button>
          </div>
        )}

        <button onClick={togglePhotoEditMode} className={classes.toggleButton}>
          {isEditingPhotos ? 'Cancel' : 'Edit Photos'}
        </button>

        {/* Product Details */}
        <div className={classes.details}>
          <div className={classes.title}>
            {motherboard.manufacturer} {motherboard.model}
          </div>
          <div className={classes.rating}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.round(motherboard.rating) ? classes.star : classes.emptyStar}>★</span>
            ))}
          </div>
          <table className={classes.table}>
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
            </tbody>
          </table>
          <div className={classes.sell}>
            <div className={classes.price}>{motherboard.price} zł</div>
            <CounterInput />
            <button className={classes.addToCart}>Dodaj do koszyka</button>
          </div>
        </div>
      </div>

      {/* Specification Section */}
      <div className={classes.specification}>
  <h1 className={classes.specificationTitle}>Specyfikacja</h1>
  {isEditing ? (
    <form onSubmit={handleSubmit} className={classes.updateForm}>
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
  ) : (
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
  )}
  <button onClick={toggleEditMode} className={classes.toggleButton}>
    {isEditing ? 'Cancel' : 'Edit'}
  </button>
</div>
    </>
  );
};

export default MotherboardComponent;
