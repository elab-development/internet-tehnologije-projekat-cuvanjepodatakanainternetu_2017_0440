import { useState, useEffect } from 'react';
import axios from 'axios';

const useVlasnici = (url, token) => {
  const [vlasnici, setVlasnici] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVlasnici = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVlasnici(response.data.users);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVlasnici();
  }, [url, token]);

  return { vlasnici, loading, error };
};

export default useVlasnici;
