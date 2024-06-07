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
  photoUri?: string | null;
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
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(token);
        const stateString = await AsyncStorage.getItem("authState");
        if (stateString) {
          const state: IAuthState = JSON.parse(stateString);
          setAuthState(state);
        }
        try {
          const response = await axios.get(`${API}/courier/me`);
          const { _id, phone, name, surname, city, status, photoUri } =
            response.data.courier;
          setAuthState((prevState) => ({
            ...prevState,
            token: token,
            authenticated: true,
            phone,
            _id,
            name,
            surname,
            city,
            status,
            photoUri,
          }));
          await AsyncStorage.setItem(
            "authState",
            JSON.stringify({
              token: token,
              authenticated: true,
              phone,
              _id,
              name,
              surname,
              city,
              status,
              photoUri,
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadToken();
  }, []);
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
