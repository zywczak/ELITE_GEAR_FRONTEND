import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Footer from '../components/footer';
import Header from '../components/header';
import Nav from '../components/nav';
import ProductItem from '../components/product/productItem';
import { Product } from '../models/Product';
import CPUForm from '../components/cpu/addCPUForm';
import CoolerForm from '../components/cooler/addCoolerForm';
import RAMForm from '../components/ram/addRAMForm';
import MotherboardForm from '../components/motherboard/addMotherboardForm';
import api from '../api/axiosApi';
import axios from 'axios';
import { isAdmin } from '../utils/AuthUttils.';
import { ToastContainer } from 'react-toastify';

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
  const { category } = useParams<{ category: string }>(); 
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    document.title = `Produkty - ${category}`;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/${category}`);
        setProducts(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {

            const backendError = err.response.data?.error || 
                                  err.response.data?.message;
            setError(backendError);
        } else {
            setError('An unexpected error occurred.');
        }
    } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

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
       {isAdmin() && (
      <button className={classes.addButton} onClick={handleToggleForm}>
        {showForm ? 'Zamknij formularz' : 'Dodaj produkt'}
      </button>
       )}
      {showForm && <div className={classes.formContainer}>{renderForm()}</div>}

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
      <ToastContainer />
    </>
  );
};

export default Products;
