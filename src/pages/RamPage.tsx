import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/footer";
import Header from "../components/header";
import Nav from "../components/nav";
import { useParams } from 'react-router-dom';
import RAMComponent from '../components/Ram';

const RAMPage = () => {
  const [ram, setRam] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRAM = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ram/${id}`);
        setRam(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch RAM data.');
        setLoading(false);
      }
    };

    fetchRAM();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ram) {
    return <div>No RAM data available.</div>;
  }

  return (
    <>
      <Header />
      <Nav />
      <RAMComponent ram={ram} />
      <Footer />
    </>
  );
};

export default RAMPage;
