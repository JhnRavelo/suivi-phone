import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import NavigationStackQRCodeGenerator from "../navigation/NavigationStackQRCodeGenerator";
import useScreen from "../hooks/useScreen";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import useQRCodeGenerator from "../hooks/useQRCodeForm";
import useLocation from "../hooks/useLocation";
import * as Location from "expo-location";

const QrCode = ({ navigation }) => {
  const axiosPrivate = useAxiosPrivate();
  const screenRoute = useRoute();
  const { setScreen } = useScreen();
  const { setProductTypes } = useQRCodeGenerator();
  const { setStatusLocation } = useLocation();
  let screenName = screenRoute.name;

  useEffect(() => {
    fetchTypesOfProducts();
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatusLocation(status);
    })();
  }, []);

  useEffect(() => {
    setScreen(screenName);
  }, [navigation]);

  const fetchTypesOfProducts = async () => {
    try {
      const res = await axiosPrivate.get("/productType/getAll");
      if (res.data?.success) {
        const productTypesArray = res.data.types.map(
          (item) => {
            return { label: item.name, value: item.id };
          }
        );

        setProductTypes(productTypesArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <NavigationStackQRCodeGenerator />;
};

export default QrCode;
