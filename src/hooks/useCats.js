import { useState, useEffect } from 'react';

function useCats() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      const response = await fetch(
        'https://cataas.com/api/cats?limit=100'
      );

      const data = await response.json();

      const uniqueCats = Array.from(
        new Map(data.map(cat => [cat.id, cat])).values()
      );

      setCats(uniqueCats);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return { cats, loading };
}

export default useCats;