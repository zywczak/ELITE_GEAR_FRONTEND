import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/axiosApi';

const ConfirmPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    const confirmOrder = async () => {
      if (orderId) {
        try {
          const response = await api.post(`/orders/confirm/${orderId}`);
          console.log(response.data);

          toast.success("Order confirmed successfully!");


          navigate('/order');

        } catch (error) {
          console.error("Error confirming order:", error);
          toast.error("Failed to confirm order.");
          setTimeout(() => {
            navigate('/orders');
          }, 2000);
        }
      }
    };

    confirmOrder();
  }, [orderId, navigate]);

  return (
    <div>
      <p>Processing order confirmation...</p>
    </div>
  );
};

export default ConfirmPage;
