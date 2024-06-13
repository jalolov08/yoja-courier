import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const useGetRequest = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.get(url);
      setData(response.data);
    } catch (error: any) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refresh = () => {
    fetchData();
  };

  return { data, loading, error, refresh };
};

export default useGetRequest;
