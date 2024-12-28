import { useState, useEffect } from 'react';
import Footer from "../components/footer";
import Header from "../components/header";
import CoolerComponent from "../components/cooler/Cooler";
import Nav from "../components/nav";
import { useParams } from 'react-router-dom';
import { Cooler } from '../models/Cooler';
import { ToastContainer } from 'react-toastify';
import Comments from '../components/comment/comments';
import api from '../api/axiosApi';

const CoolerPage = () => {
  const [cooler, setCooler] = useState<Cooler | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCooler = async () => {
      try {
        const response = await api.get(`/coolers/${id}`);
        setCooler(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchCooler();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cooler) {
    return <div>No cooler data available.</div>;
  }

  return (
    <>
      <Header />
      <Nav />
      <CoolerComponent cooler={cooler} />
      <Comments />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default CoolerPage;
