import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
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
    margin: 'auto',
    objectFit: 'cover',
  },
  thumbnailContainer: {
    marginTop: '30px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '100%',
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

interface ImageGalleryProps {
  photos: string[];
  onMainImageChange: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ photos, onMainImageChange }) => {
  const classes = useStyles();
  const [mainImage, setMainImage] = useState<string>(photos[0] || 'default-no-photo.jpg');

  return (
    <div className={classes.imageGallery}>
      <img src={mainImage} alt="image1" className={classes.mainImage} />
      {photos.length > 0 && (
        <div className={classes.thumbnailContainer}>
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`thumbnail-${index}`}
              className={classes.thumbnail}
              onClick={() => {
                setMainImage(photo);
                onMainImageChange(photo);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;