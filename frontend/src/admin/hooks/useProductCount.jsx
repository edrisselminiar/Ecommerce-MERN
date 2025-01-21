import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProductCount = () => {
  const [productCount, setProductCount] = useState('0');
  const [loadingg, setLoadingg] = useState(true);
  const [errorr, setErrorr] = useState(null);

   // Get auth token function
   const getAuthToken = () => {
    return localStorage.getItem('token'); // or however you store your token
  };


  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const token = getAuthToken();
        // console.log('Fetching product count...'); // Debug log

        const response = await axios.get('http://localhost:3001/api/products/count', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // console.log('API Response:', response.data); // Debug log

        if (response.data.success) {
          setProductCount(response.data.count.toString());
        } else {
          setErrorr('Failed to get count');
        }
        setLoadingg(false);
      } catch (err) {
        // console.error('Error fetching product count:', err); // Debug log
        setErrorr(err.message);
        setLoadingg(false);
      }
    };

    fetchProductCount();
  }, []);

  // Debug log
  // console.log('Current product count:', productCount);

  return { productCount, loadingg, errorr };
};







