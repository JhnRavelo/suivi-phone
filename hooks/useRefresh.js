import useAuth from "./useAuth";
import { axiosDefault } from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRefresh = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const refreshToken = await AsyncStorage.getItem("jwt");
    const response = await axiosDefault.post("/refresh", { refreshToken });
    await AsyncStorage.removeItem("jwt")
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });
    await AsyncStorage.setItem("jwt", response.data.refreshToken);

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefresh;
