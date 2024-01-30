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
  const { setLocation } = useLocation();
  let screenName = screenRoute.name;

  useEffect(() => {
    fetchTypesOfProducts();
    hasLocationAdress()
  }, []);

  useEffect(() => {
    setScreen(screenName);
  }, [navigation]);

  const fetchTypesOfProducts = async () => {
    try {
      const res = await axiosPrivate.get("/productType/getAll");
      if (res.data?.success) {
        const productTypesArray = res.data.productTypes.map((item) => {
          return { label: item.name, value: item.id };
        });

        setProductTypes(productTypesArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasLocationAdress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Vous n'avez pas de permission sur la localiastion");
    } else {
      await Location.enableNetworkProviderAsync();
      let currentLocation = await Location.getCurrentPositionAsync({});
      let currentAddress = await Location.reverseGeocodeAsync({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      });
      let address = currentAddress[0];
      console.log(address.city)
      setLocation(`${address.country}-${address.city}-${address.region}`);
    }
  };

  return <NavigationStackQRCodeGenerator />;
};

export default QrCode;
