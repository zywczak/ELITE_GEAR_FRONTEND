import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/footer";
import Header from "../components/header";
import Nav from "../components/nav";
import { useParams } from 'react-router-dom';
import CPUComponent from '../components/Cpu';
import CPUForm from '../components/addCPUForm';

const CpuPage = () => { // Rename the function to start with an uppercase letter
  const [cpu, setCpu] = useState<any | null>(null); // Consistent casing
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCpu = async () => { // Consistent casing
      try {
        const response = await axios.get(`http://localhost:8080/cpu/${id}`);
        setCpu(response.data); // Consistent casing
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch CPU data.'); // Consistent casing
        setLoading(false);
      }
    };

    fetchCpu();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cpu) {
    return <div>No CPU data available.</div>; // Consistent casing
  }

  return (
    <>
      <Header />
      <Nav />
      <CPUComponent cpu={cpu} />
      <Footer />
    </>
  );
};

export default CpuPage; // Ensure the export matches the renamed function
