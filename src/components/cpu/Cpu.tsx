import { useState } from 'react';
import { CPU } from '../../models/CPU';
import { useParams } from 'react-router-dom';
import ImageGallery from '../product/ImageGallery';
import DetailsTable from './DetailsTable';
import EditImage from '../product/EditImage';
import { isAdmin } from '../../utils/AuthUttils.';
import EditSpecificationTable from './EditSpecificationTable';
import SpecificationTable from './SpecificationTable';
import api from '../../api/axiosApi';
import { toast } from 'react-toastify';
import useStyles from '../../styles/styles';

interface CPUComponentProps {
  cpu: CPU;
}

const CPUComponent: React.FC<CPUComponentProps> = ({ cpu }) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedCpu, setUpdatedCpu] = useState(cpu);
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedCpu((prev) => ({
      ...prev,
      [name]: ['price', 'speed', 'threads', 'technologicalProcess', 'powerConsumption'].includes(name)
        ? Number(value)
        : name === 'cooling'
        ? value === 'true'
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Wysyłane dane:', JSON.stringify(updatedCpu));
    try {
      const response = await api.put(`/cpu/${id}`, updatedCpu);

      if (response.status === 200) {
        toast.success('CPU data updated successfully!');
        setIsEditing(false);
        window.location.reload();
      } else {
        console.error('Błąd:', response.data);
        toast.error('Failed to update CPU data: ' + response.data.message);
      }
    } catch (error: any) {
      console.error('Error updating CPU data:', error);
      alert('Wystąpił błąd podczas aktualizacji danych: ' + error.response?.data?.message || error.message);
    }
  };

  const [isEditingPhotos, setIsEditingPhotos] = useState<boolean>(false);
  
  const togglePhotoEditMode = () => {
    setIsEditingPhotos((prev) => !prev);
  };

  return (
    <>
      <div className={classes.container}>
        {!isEditingPhotos ? (
          <ImageGallery photos={cpu.photos} onMainImageChange={() => {}} />
        ) : (
          <EditImage
            productId={Number(id)}
            photos={cpu.photos}
            onClose={() => setIsEditingPhotos(false)}
          />
        )}
        {isAdmin() && (
        <button onClick={togglePhotoEditMode} className={classes.toggleButton}>
          {isEditingPhotos ? 'Cancel' : 'Edit Photos'}
        </button>
        )}

        <DetailsTable cpu={cpu}/>
      </div>

      <div className={classes.specification}>
        <h1 className={classes.specificationTitle}>Specyfikacja</h1>
        {isEditing ? (
          <EditSpecificationTable
          updatedCpu={updatedCpu}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        ) : (
          <SpecificationTable cpu={cpu}/>
        )}
        <button onClick={toggleEditMode} className={classes.toggleButton}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </>
  );
};

export default CPUComponent;
