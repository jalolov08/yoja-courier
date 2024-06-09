import { useState } from "react";
import axios from "axios";
import { API } from "../../config";

const useGetOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API}/order/aviable/${latitude}/${longitude}`
      );
      return response.data;
    } catch (error: any) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchOrders };
};

export default useGetOrders;
