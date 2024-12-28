import { useState } from 'react';
import { RAM } from '../../models/RAM';
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

interface RAMComponentProps {
  ram: RAM;
}

const RAMComponent: React.FC<RAMComponentProps> = ({ ram }) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const [isEditingPhotos, setIsEditingPhotos] = useState<boolean>(false);

  const togglePhotoEditMode = () => {
    setIsEditingPhotos((prev) => !prev);
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
      const response = await api.put(`/ram/${id}`, updatedRam);

      if (response.status === 200) {
        toast.success('RAM data updated successfully!');
        setIsEditing(false);
        window.location.reload();
      } else {
        toast.error('Błąd:', response.data);
        alert('Failed to update RAM data: ' + response.data.message);
      }
    } catch (error: any) {
      toast.error('Error updating RAM data:', error);
      alert('Wystąpił błąd podczas aktualizacji danych.' + (error.response?.data?.message || ''));
    }
  };

  return (
    <>
      <div className={classes.container}>
        {!isEditingPhotos ? (
          <ImageGallery photos={ram.photos} onMainImageChange={() => {}} />
        ) : (
          <EditImage
            productId={Number(id)}
            photos={ram.photos}
            onClose={() => setIsEditingPhotos(false)}
          />
        )}
        {isAdmin() && (
        <button onClick={togglePhotoEditMode} className={classes.toggleButton}>
          {isEditingPhotos ? 'Cancel' : 'Edit Photos'}
        </button>
        )}

        <DetailsTable ram={ram} />
      </div>

      <div className={classes.specification}>
        <h1 className={classes.specificationTitle}>Specyfikacja</h1>
        {isEditing ? (
          <EditSpecificationTable
            updatedRam={updatedRam}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <SpecificationTable ram={ram} />
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

export default RAMComponent;
