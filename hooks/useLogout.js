import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "./useAuth";
import useFiche from "./useFiche";
import { useNavigation, StackActions } from "@react-navigation/native";
import useAxiosPrivate from "./usePrivateAxios";
import useQRCodeForm from "./useQRCodeForm";
import useScan from "./useScan";
import useSuivi from "./useSuivi";
import { useLoading } from "./useLoading";

const useLogout = () => {
  const { setAuth } = useAuth();
  const { setFiche } = useFiche();
  const { setDataQRCodeVerify, setFormDataQRCode, setProductAdded } =
    useQRCodeForm();
  const { setScanned, setScanInfo } = useScan();
  const { setSuivis } = useSuivi();
  const { setLoading } = useLoading();
  const navigation = useNavigation();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      setLoading(true);
      const refreshToken = await AsyncStorage.getItem("jwt");
      const res = await axiosPrivate.post("/auth/logout", { refreshToken });
      if (res.data.success) {
        await AsyncStorage.removeItem("jwt");
        setAuth({});
        setFiche([]);
        setFormDataQRCode({});
        setDataQRCodeVerify([]);
        setProductAdded(null);
        setScanned(true);
        setScanInfo("");
        setSuivis([]);
        setLoading(false);
        navigation.dispatch(StackActions.replace("login"));
      } else {
        setLoading(false);
        navigation.dispatch(StackActions.replace("login"));
      }
    } catch (error) {
      setLoading(false);
      navigation.dispatch(StackActions.replace("login"));
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;
