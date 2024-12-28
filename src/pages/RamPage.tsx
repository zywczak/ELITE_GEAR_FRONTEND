import { useState, useEffect } from 'react';
import Footer from "../components/footer";
import Header from "../components/header";
import Nav from "../components/nav";
import { useParams } from 'react-router-dom';
import RAMComponent from '../components/ram/Ram';
import { RAM } from '../models/RAM';
import api from '../api/axiosApi';
import { ToastContainer } from 'react-toastify';
import Comments from '../components/comment/comments';

const RAMPage = () => {
  const [ram, setRam] = useState<RAM | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRAM = async () => {
      try {
        const response = await api.get(`/ram/${id}`);
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
      <Comments/>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default RAMPage;
