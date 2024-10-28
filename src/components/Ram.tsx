import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { RAM } from '../models/RAM';
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
    backgroundColor: '#535252',
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
    textAlign: 'center',
    paddingBottom: '10px',
  },
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
interface RAMComponentProps {
  ram: RAM;
}

const RAMComponent: React.FC<RAMComponentProps> = ({ ram }) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  
  const hasPhotos = ram.photos && ram.photos.length > 0;

  const [mainImage, setMainImage] = useState<string>(
    hasPhotos ? ram.photos[0] : 'default-no-photo.jpg'
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
  const [updatedRam, setUpdatedRam] = useState(ram);
  
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedRam((prev) => ({
      ...prev,
      [name]: ['price', 'speed', 'moduleCount', 'voltage'].includes(name)
        ? Number(value)
        : name === 'backlight' || name === 'cooling'
        ? value === 'true'
        : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log('Wysyłane dane:', JSON.stringify(updatedRam));
    try {
      const response = await fetch(`http://localhost:8080/ram/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRam),
      });
  
      if (response.ok) {
        alert('RAM data updated successfully!');
        setIsEditing(false);
        window.location.reload();
      } else {
        const errorMsg = await response.text();
        console.error('Błąd:', errorMsg);
        alert('Failed to update RAM data: ' + errorMsg);
      }
    } catch (error) {
      console.error('Error updating RAM data:', error);
      alert('Wystąpił błąd podczas aktualizacji danych.');
    }
  };
  return (
    <>
      <div className={classes.container}>
        {!isEditingPhotos ? (
          <ImageGallery photos={ram.photos} onMainImageChange={() => {}} />
        ) : (
          //zrób z tego komponent do dodawania i usuwania zdjec --
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
          {ram.photos.map((photoUrl: string, index: number) => (
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
            {ram.manufacturer} {ram.model}
          </div>
          <div className={classes.rating}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.round(ram.rating) ? classes.star : classes.emptyStar}>★</span>
            ))}
          </div>
          <table className={classes.table}>
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
            </tbody>
          </table>
          <div className={classes.sell}>
            <div className={classes.price}>{ram.price} zł</div>
            <CounterInput />
            <button className={classes.addToCart}>Dodaj do koszyka</button>
          </div>
        </div>
      </div>

      <div className={classes.specification}>
        <h1 className={classes.specificationTitle}>Specyfikacja</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className={classes.updateForm}>
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
        ) : (
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
        )}
        <button onClick={toggleEditMode} className={classes.toggleButton}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </>
  );
};

export default RAMComponent;