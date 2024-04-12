import * as Location from "expo-location";

const useGetLocation = (status) => {
  const getLocation = async () => {
    let myLocation;
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
      myLocation = `${address.country}-${address.city}-${address.region}`;
    }
    return myLocation;
  };
  return getLocation;
};

export default useGetLocation;
