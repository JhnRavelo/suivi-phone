import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "./useAuth";
import { useNavigation, StackActions } from "@react-navigation/native";
import useAxiosPrivate from "./usePrivateAxios";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigation = useNavigation();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("jwt");
      const res = await axiosPrivate.post("/auth/logout", { refreshToken });
      if (res.data.success) {
        await AsyncStorage.removeItem("jwt");
        setAuth({});
        navigation.dispatch(StackActions.replace("login"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;
