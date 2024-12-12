import { useState, useEffect } from 'react';
import axios from 'axios';

const useFirme = (url, token) => {
  const [firme, setFirme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFirme = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFirme(response.data.firme);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFirme();
  }, [url, token]);

  return { firme, loading, error };
};

export default useFirme;
