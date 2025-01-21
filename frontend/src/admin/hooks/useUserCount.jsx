import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUserCount = () => {
  const [userCount, setUserCount] = useState('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/users/count');
        setUserCount(response.data.count.toString());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return { userCount, loading, error };
};
