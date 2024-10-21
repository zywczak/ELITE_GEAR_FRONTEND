import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Footer from '../components/footer';
import Header from '../components/header';
import Nav from '../components/nav';
import ProductItem from '../components/productItem';
import { Product } from '../models/Product';
import CPUForm from '../components/addCPUForm';
import CoolerForm from '../components/addCoolerForm';
import RAMForm from '../components/addRAMForm';
import MotherboardForm from '../components/addMotherboardForm';

const useStyles = createUseStyles({
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  },
  error: {
    color: 'red',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#007bff',
    },
  },
  addButton: {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    backgroundColor: '#AA7A00',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(94, 52, 1, 0.849)',
    },
  },
  formContainer: {
    marginTop: '20px',
  },
});

const Products: React.FC = () => {
  const { category } = useParams<{ category: string }>(); // Get category from URL params
  const [products, setProducts] = useState<Product[]>([]); // State for storing fetched products
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error message
  const [showForm, setShowForm] = useState<boolean>(false); // State to toggle form visibility
  const classes = useStyles();

  useEffect(() => {
    // Set the document title based on the category
    document.title = `Produkty - ${category}`;

    // Function to fetch data from the backend based on the category
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Reset error state

      try {
        const response = await fetch(`http://localhost:8080/${category}`); // Backend endpoint

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the response as JSON
        setProducts(data); // Set the fetched products to state
      } catch (error: any) {
        setError(error.message || 'Error fetching products'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (category) {
      fetchProducts(); // Call fetch only if category exists
    }
  }, [category]);

  // Function to toggle the form visibility
  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  // Function to render the appropriate form based on the category
  const renderForm = () => {
    switch (category) {
      case 'cpu':
        return <CPUForm />;
      case 'coolers':
        return <CoolerForm />;
      case 'ram':
        return <RAMForm />;
      case 'motherboard':
        return <MotherboardForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Nav />
      {/* Add Product Button */}
      <button className={classes.addButton} onClick={handleToggleForm}>
        {showForm ? 'Zamknij formularz' : 'Dodaj produkt'}
      </button>

      {/* Show Form if toggled */}
      {showForm && <div className={classes.formContainer}>{renderForm()}</div>}

      {/* Product List and Error Handling */}
      {loading && <p>Ładowanie...</p>}
      {error && <p className={classes.error}>{error}</p>}
      {products.length > 0 ? (
        <div className={classes.productList}>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              manufacturer={product.manufacturer}
              model={product.model}
              price={product.price}
              rating={product.rating}
              photos={product.photos}
            />
          ))}
        </div>
      ) : (
        !loading && <p>Brak produktów w tej kategorii.</p>
      )}
      <Footer />
    </>
  );
};

export default Products;
