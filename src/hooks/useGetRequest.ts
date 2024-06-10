import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const useGetRequest = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(url);
        setData(response.data);
      } catch (error: any) {
        setError(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [url]);

  return { data, loading, error };
};

export default useGetRequest;
