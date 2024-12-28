import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { CartItemProps } from '../models/CartItemProps';
import api from '../api/axiosApi';
import CartTable from '../components/cart/cartTable';
import OrderForm from '../components/cart/OrderForm';
import axios from 'axios';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    city: '',
    street: '',
    houseNumber: '',
    postalCode: '',
  });

  const fetchCartItems = async () => {
    try {
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {

            const backendError = err.response.data?.error || 
                                  err.response.data?.message;
            toast.error(backendError);
        } else {
            toast.error('An unexpected error occurred.');
        }
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart');
      setCartItems([]);
      toast.success('Cart cleared successfully');
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {

            const backendError = err.response.data?.error || 
                                  err.response.data?.message;
            toast.error(backendError);
        } else {
            toast.error('An unexpected error occurred.');
        }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = (productId: number) => {
    toast.info(`Product with id ${productId} quantity updated`);
    fetchCartItems();
  };

  const handleOrderButtonClick = () => {
    setShowOrderForm(true);
    toast.info('Fill out the order form to complete your purchase');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitOrder = async () => {
    try {
      const response = await api.post('/orders/create', formData);
      toast.success('Order placed successfully');
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      toast.error('Error submitting order');
      console.error('Error submitting order:', error);
    }
  };

  const totalValue = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <>
      <Header />
      <Nav />
      <CartTable
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onClearCart={clearCart}
        totalValue={totalValue}
        onPlaceOrderClick={handleOrderButtonClick}
      />
      {showOrderForm && (
        <OrderForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmitOrder={handleSubmitOrder}
        />
      )}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default CartPage;
