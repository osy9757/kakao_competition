import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface FetchOptions extends Omit<AxiosRequestConfig, "url" | "data"> {
  method?: "get" | "post" | "put" | "delete";
  body?: any;
}

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
}

function useFetch<T>(url: string, options?: FetchOptions): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const requestConfig: AxiosRequestConfig = {
      ...options,
      url,
      method: options?.method || "get",
    };

    if (options?.body) {
      requestConfig.data = options.body;
    }

    axios(requestConfig)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [url, options]);

  return { data, isLoading, error };
}

export default useFetch;

//  get 예시
//  const { data, isLoading, error } = useFetch('https://api.example.com/data');

//  post, put
// const { data, isLoading, error } = useFetch('https://api.example.com/data', {
//   method: 'post',
//   body: { key: 'value' },
//   headers: { 'Content-Type': 'application/json' }
// });
