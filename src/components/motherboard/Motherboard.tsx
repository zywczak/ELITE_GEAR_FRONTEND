import { useState } from 'react';
import { Motherboard } from '../../models/Motherboard';
import ImageGallery from '../product/ImageGallery';
import { useParams } from 'react-router-dom';
import EditSpecificationTable from './EditSpecificationTable';
import DetailsTable from './DetailsTable';
import SpecificationTable from './SpecificationTable';
import { isAdmin } from '../../utils/AuthUttils.';
import EditImage from '../product/EditImage';
import api from '../../api/axiosApi';
import { toast } from 'react-toastify';
import useStyles from '../../styles/styles';

// Define the props type
interface MotherboardComponentProps {
  motherboard: Motherboard;
}

const MotherboardComponent: React.FC<MotherboardComponentProps> = ({ motherboard }) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const [isEditingPhotos, setIsEditingPhotos] = useState<boolean>(false);
  // Toggle photo edit mode
  const togglePhotoEditMode = () => {
    setIsEditingPhotos((prev) => !prev);
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

    try {
      const response = await api.put(`/motherboard/${id}`, updatedMotherboard);

      if (response.status === 200) {
        toast.success('Motherboard data updated successfully!');
        setIsEditing(false);
        window.location.reload();
      } else {
        console.error('Error:', response.data);
        toast.error('Failed to update motherboard data: ' + response.data.message);
      }
    } catch (error: any) {
      console.error('Error updating motherboard data:', error);
      toast.error('An error occurred while updating the data: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className={classes.container}>
        {!isEditingPhotos ? (
          <ImageGallery photos={motherboard.photos} onMainImageChange={() => {}} />
        ) : (
          <EditImage
            productId={Number(id)}
            photos={motherboard.photos}
            onClose={() => setIsEditingPhotos(false)}
          />
        )}
        {isAdmin() && (
        <button onClick={togglePhotoEditMode} className={classes.toggleButton}>
          {isEditingPhotos ? 'Cancel' : 'Edit Photos'}
        </button>
        )}

        <DetailsTable motherboard={motherboard} />
      </div>

      <div className={classes.specification}>
        <h1 className={classes.specificationTitle}>Specyfikacja</h1>
        {isEditing ? (
          <EditSpecificationTable
            updatedMotherboard={updatedMotherboard}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <SpecificationTable motherboard={motherboard} />
        )}
        {isAdmin() && (
          <button onClick={toggleEditMode} className={classes.toggleButton}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        )}
      </div>
    </>
  );
};

export default MotherboardComponent;
