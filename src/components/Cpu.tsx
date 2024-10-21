import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { CPU } from '../models/CPU';
import CounterInput from './CounterInput';

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
    margin: '0 auto', // Centering the table
    borderCollapse: 'collapse', // Collapse borders
    tableLayout: 'fixed', // Ensures equal width for all columns
    '& th': {
      backgroundColor: '#555', // Header background
      color: '#fff', // Header text color
      padding: '10px', // Padding for header cells
    },
    '& td': {
      padding: '8px', // Padding for data cells
      borderBottom: '1px solid #666', // Data cell bottom bord
    },
  },
});

// Define the props type
interface CPUComponentProps {
  cpu: CPU;
}

const CPUComponent: React.FC<CPUComponentProps> = ({ cpu }) => {
  const classes = useStyles();

  // Check if photos array is empty or not
  const hasPhotos = cpu.photos && cpu.photos.length > 0;

  // State to manage the selected main image
  const [mainImage, setMainImage] = useState<string>(
    hasPhotos ? cpu.photos[0] : 'default-no-photo.jpg' // Fallback to default no-photo image if no photos
  );

  const handleThumbnailClick = (photo: string): void => {
    setMainImage(photo);
  };

  return (
    <>
      <div className={classes.container}>
        {/* Image and Thumbnails */}
        <div className={classes.imageGallery}>
          <img
            src={mainImage}
            alt={cpu.model}
            className={classes.mainImage}
          />
          {hasPhotos && (
            <div className={classes.thumbnailContainer}>
              {cpu.photos.map((photo: string, index: number) => (
                <img
                  key={index}
                  src={photo}
                  alt={`thumbnail-${index}`}
                  className={classes.thumbnail}
                  onClick={() => handleThumbnailClick(photo)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className={classes.details}>
          <div className={classes.title}>
            {cpu.manufacturer} {cpu.model}
          </div>
          <div className={classes.rating}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.round(cpu.rating) ? classes.star : classes.emptyStar}>★</span>
            ))}
          </div>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className={classes.rowName}>Speed:</td>
                <td>{cpu.speed} GHz</td>
              </tr>
              <tr>
              <td className={classes.rowName}>Technological Process:</td>
              <td>{cpu.technologicalProcess} nm</td>
            </tr>
              <tr>
                <td className={classes.rowName}>Supported Memory:</td>
                <td>{cpu.supportedMemory}</td>
              </tr>
              <tr>
                <td className={classes.rowName}>Threads:</td>
                <td>{cpu.threads}</td>
              </tr>
            </tbody>
          </table>
          <div className={classes.sell}>
            <div className={classes.price}>{cpu.price} zł</div>
            <CounterInput />
            <button className={classes.addToCart}>Dodaj do koszyka</button>
          </div>
        </div>
      </div>

      {/* Specification Section */}
      <div className={classes.specification}>
        <h1 className={classes.specificationTitle}>Specyfikacja</h1>
        <table className={classes.specificationTable}>
          <tbody>
            <tr>
              <td className={classes.rowName}>Speed:</td>
              <td>{cpu.speed} GHz</td>
            </tr>
            <tr>
              <td className={classes.rowName}>Architecture:</td>
              <td>{cpu.architecture}</td>
            </tr>
            <tr>
              <td className={classes.rowName}>Supported Memory:</td>
              <td>{cpu.supportedMemory}</td>
            </tr>
            <tr>
              <td className={classes.rowName}>Threads:</td>
              <td>{cpu.threads}</td>
            </tr>
            <tr>
              <td className={classes.rowName}>Technological Process:</td>
              <td>{cpu.technologicalProcess} nm</td>
            </tr>
            <tr>
              <td className={classes.rowName}>Power Consumption:</td>
              <td>{cpu.powerConsumption} W</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CPUComponent;
