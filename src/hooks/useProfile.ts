import { useState } from "react";
import axios from "axios";
import { API } from "../../config";
import { CourierType } from "../types/courier.enum";
import { useAuth } from "../contexts/AuthContext/auth.context";

interface UseProfileResult {
  saveProfile: (
    firstName: string,
    lastName: string,
    city: string,
    type: CourierType
  ) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const useProfile = (): UseProfileResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuthState, authState } = useAuth();
  const saveProfile = async (
    firstName: string,
    lastName: string,
    city: string,
    type: CourierType
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${API}/courier/fill-profile`, {
        firstName,
        lastName,
        city,
        type,
      });

      if (response.status !== 200) {
        throw new Error("Ошибка сохранения профиля");
      }
      const courier = response.data.updatedCourier;
      if (authState) {
        setAuthState({
          ...authState,
          city,
          type,
          surname: lastName,
          name: firstName,
        });
      }

      setIsLoading(false);
      return true;
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
      return false;
    }
  };

  return { saveProfile, isLoading, error };
};

export default useProfile;
