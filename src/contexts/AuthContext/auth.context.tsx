import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourierStatus, CourierType } from "../../types/courier.enum";

interface IAuthState {
  token: string | null;
  authenticated: boolean | null;
  phone?: string | null;
  _id?: string | null;
  name?: string | null;
  surname?: string | null;
  status?: CourierStatus | null;
  city?: string | null;
  type?: CourierType | null;
}

interface IAuth {
  authState?: IAuthState;
  onLogin?: (phone: string) => Promise<any>;
  onVerify?: (code: string) => Promise<any>;
  onLogout?: () => Promise<void>;
  setAuthState?: (newState: IAuthState) => void;
}
const AuthContext = createContext<IAuth>({});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<IAuthState>({
    token: null,
    authenticated: null,
  });
  async function login(phone: string) {
    try {
      const response = await axios.post(`${API}/courier/send-otp`, {
        phone,
      });
      setAuthState({
        phone,
        token: null,
        authenticated: false,
      });

      return response;
    } catch (error) {
      return { error: true, msg: (error as any).response.data };
    }
  }
  async function verify(code: string) {
    try {
      const response = await axios.post(`${API}/courier/verify-otp`, {
        phone: authState.phone,
        code,
      });
      const { token } = response.data;
      setAuthState({
        token: response.data.token,
        phone: authState.phone,
        authenticated: true,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await AsyncStorage.setItem("token", token);

      return response;
    } catch (error) {
      return (error as any).response;
    }
  }
  const value = {
    authState,
    setAuthState,
    onLogin: login,
    onVerify: verify,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
