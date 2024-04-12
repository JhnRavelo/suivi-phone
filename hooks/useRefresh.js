import useAuth from "./useAuth";
import { axiosDefault } from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoading } from "./useLoading";

const useRefresh = () => {
  const { setAuth } = useAuth();
  const { setLoading } = useLoading();
  const refresh = async () => {
    const refreshToken = await AsyncStorage.getItem("jwt");
    try {
      if (refreshToken) {
        const response = await axiosDefault.post("/refresh", { refreshToken });
        await AsyncStorage.removeItem("jwt");
        setAuth((prev) => {
          return {
            ...prev,
            accessToken: response.data.accessToken,
          };
        });
        await AsyncStorage.setItem("jwt", response.data.refreshToken);

        return response.data.accessToken;
      } else {
        await AsyncStorage.removeItem("jwt");
      }
    } catch (error) {
      setLoading(false);
      await AsyncStorage.removeItem("jwt");
      console.log("REFRESH ERROR", error);
    }
  };

  return refresh;
};

export default useRefresh;
