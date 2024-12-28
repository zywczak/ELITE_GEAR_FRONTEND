import { useState } from 'react';
import { Cooler } from '../../models/Cooler';
import { useParams } from 'react-router-dom';
import ImageGallery from '../product/ImageGallery';
import EditImage from '../product/EditImage';
import DetailsTable from './DetailsTable';
import SpecificationTable from './SpecificationTable';
import EditSpecificationTable from './EditSpecificationTable';
import api from '../../api/axiosApi';
import { toast } from 'react-toastify';
import { isAdmin } from '../../utils/AuthUttils.';
import useStyles from '../../styles/styles';

interface CoolerComponentProps {
  cooler: Cooler;
}

const CoolerComponent: React.FC<CoolerComponentProps> = ({ cooler }) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const [isEditingPhotos, setIsEditingPhotos] = useState<boolean>(false);

  const togglePhotoEditMode = () => {
    setIsEditingPhotos((prev) => !prev);
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedCooler, setUpdatedCooler] = useState(cooler);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedCooler((prev) => ({
      ...prev,
      [name]: ['price', 'fanCount', 'fanSize'].includes(name)
        ? Number(value)
        : name === 'backlight'
        ? value === 'true'
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/coolers/${id}`, updatedCooler);
      toast.success('Cooler data updated successfully!');
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating cooler data:', error);
      toast.error('An error occurred while updating the data.');
    }
  };

  return (
    <>
      <div className={classes.container}>
        {!isEditingPhotos ? (
          <ImageGallery photos={cooler.photos} onMainImageChange={() => {}} />
        ) : (
          <EditImage
            productId={Number(id)}
            photos={cooler.photos}
            onClose={() => setIsEditingPhotos(false)}
          />
        )}
        {isAdmin() && (
          <button onClick={togglePhotoEditMode} className={classes.toggleButton}>
            {isEditingPhotos ? 'Cancel' : 'Edit Photos'}
          </button>
        )}
        <DetailsTable cooler={cooler} />
      </div>

      <div className={classes.specification}>
        <h1 className={classes.specificationTitle}>Specyfikacja</h1>
        {isEditing ? (
          <EditSpecificationTable
            updatedCooler={updatedCooler}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <SpecificationTable cooler={cooler} />
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

export default CoolerComponent;
