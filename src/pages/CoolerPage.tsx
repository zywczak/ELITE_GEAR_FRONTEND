import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/footer";
import Header from "../components/header";
import CoolerComponent from "../components/Cooler";
import Nav from "../components/nav";
import { useParams } from 'react-router-dom';

const CoolerPage = () => {
  const [cooler, setCooler] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>(); // Fetch ID from URL params

  useEffect(() => {
    // Fetch Cooler data from the backend API
    const fetchCooler = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/coolers/${id}`);
        setCooler(response.data); // Store fetched data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cooler data.');
        setLoading(false);
      }
    };

    fetchCooler();
  }, [id]); // Re-fetch data if the ID changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cooler) {
    return <div>No cooler data available.</div>;
  }

  return (
    <>
      <Header />
      <Nav />
      <CoolerComponent cooler={cooler} />
      <Footer />
    </>
  );
};

export default CoolerPage;
