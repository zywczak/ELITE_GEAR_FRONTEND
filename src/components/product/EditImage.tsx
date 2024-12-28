import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import api from '../../api/axiosApi';
import { toast } from 'react-toastify';
import axios from 'axios';

const useStyles = createUseStyles({
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
  thumbnail: {
    width: '50px',
    height: '50px',
    margin: '0 5px',
    cursor: 'pointer',
    border: '1px solid #555',
    objectFit: 'cover',
  },
});

interface EditImageProps {
  productId: number;
  photos: string[];
  onClose: () => void;
}

const EditImage: React.FC<EditImageProps> = ({ productId, photos, onClose }) => {
  const classes = useStyles();

  const [photosToAdd, setPhotosToAdd] = useState<File[]>([]);
  const [photosToRemove, setPhotosToRemove] = useState<number[]>([]);
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePhotoAddition = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPhotosToAdd(filesArray);

      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewPhotos(previews);
    }
  };

  const handlePhotoRemovalSelection = (photoUrl: string) => {
    const photoId = parseInt(photoUrl.split('/').pop() || '', 10);
    setPhotosToRemove((prev) =>
      prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]
    );
  };

  const handlePhotoSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    photosToAdd.forEach((photo) => formData.append('photoFiles', photo));
    photosToRemove.forEach((photoId) => formData.append('photoIdsToDelete', String(photoId)));

    if (photosToAdd.length === 0 && photosToRemove.length === 0) {
      toast.error('No changes to submit.');
      setLoading(false);
      return;
    }

    try {
      await api.post(`/products/${productId}/photos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Photos updated successfully!');
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating photos:', error.response);
        toast.error(error.response?.data?.message || 'An error occurred while updating photos.');
      } else {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className={classes.formContainer}>
      <h3>Update Photos</h3>
      <input
        type="file"
        multiple
        className={classes.fileInput}
        onChange={handlePhotoAddition}
      />
      <div className={classes.previewContainer}>
        {previewPhotos.map((photo, index) => (
          <img key={index} src={photo} alt={`preview-${index}`} className={classes.thumbnail} />
        ))}
      </div>
      <h4>Select Photos to Remove:</h4>
      {photos.map((photoUrl: string, index: number) => (
        <div key={index}>
          <input
            type="checkbox"
            className={classes.deleteCheckbox}
            onChange={() => handlePhotoRemovalSelection(photoUrl)}
          />
          <img src={photoUrl} alt={`thumbnail-${index}`} className={classes.thumbnail} />
        </div>
      ))}
      <button onClick={handlePhotoSubmit} className={classes.submitButton} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Changes'}
      </button>
    </div>
  );
};

export default EditImage;
