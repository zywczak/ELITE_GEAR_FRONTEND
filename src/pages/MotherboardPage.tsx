import { useState, useEffect } from 'react';
import Footer from "../components/footer";
import Header from "../components/header";
import MotherboardComponent from "../components/motherboard/Motherboard";
import Nav from "../components/nav";
import { useParams } from 'react-router-dom';
import { Motherboard } from '../models/Motherboard';
import { ToastContainer } from 'react-toastify';
import Comments from '../components/comment/comments';
import api from '../api/axiosApi';

const MotherboardPage = () => {
  const [motherboard, setMotherboard] = useState<Motherboard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMotherboard = async () => {
      try {
        const response = await api.get(`/motherboard/${id}`);
        setMotherboard(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchMotherboard();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!motherboard) {
    return <div>No motherboard data available.</div>;
  }

  return (
    <>
      <Header />
      <Nav />
      <MotherboardComponent motherboard={motherboard} />
      <Comments />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default MotherboardPage;
