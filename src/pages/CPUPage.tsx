import { useState, useEffect } from 'react';
import Footer from "../components/footer";
import Header from "../components/header";
import Nav from "../components/nav";
import { useParams } from 'react-router-dom';
import CPUComponent from '../components/cpu/Cpu';
import Comments from '../components/comment/comments';
import { CPU } from '../models/CPU';
import { ToastContainer } from 'react-toastify';
import api from '../api/axiosApi';

const CpuPage = () => {
  const [cpu, setCpu] = useState<CPU | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCpu = async () => {
      try {
        const response = await api.get(`/cpu/${id}`);
        setCpu(response.data); 
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchCpu();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cpu) {
    return <div>No CPU data available.</div>; 
  }

  return (
    <>
      <Header />
      <Nav />
      <CPUComponent cpu={cpu} />
      <Comments />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default CpuPage;
