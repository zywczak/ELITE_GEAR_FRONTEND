import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/footer";
import Header from "../components/header";
import MotherboardComponent from "../components/Motherboard";
import Nav from "../components/nav";
import { useParams } from 'react-router-dom'; // If you're using react-router for dynamic id

const MotherboardPage = () => {
  const [motherboard, setMotherboard] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>(); // If using react-router to extract the dynamic ID

  useEffect(() => {
    // Fetch motherboard data from the API
    const fetchMotherboard = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/motherboard/${id}`);
        setMotherboard(response.data); // Update motherboard state with fetched data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch motherboard data.');
        setLoading(false);
      }
    };

    fetchMotherboard();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!motherboard) {
    return <div>No motherboard data available.</div>;
  }

  return (
    <>
      <Header />
      <Nav />
      <MotherboardComponent motherboard={motherboard} />
      <Footer />
    </>
  );
};

export default MotherboardPage;
