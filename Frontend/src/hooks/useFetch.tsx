import { useState, useEffect } from 'react';
import axios from 'axios';

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
}

function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    axios.get(url)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
