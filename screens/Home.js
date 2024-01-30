import React, { useEffect, useState } from "react";
import NavigationBottomTabHome from "../navigation/NavigationBottomTabHome";
import { useLoading } from "../hooks/useLoading";
import CircleLoading from "../components/CircleLoading";
import * as Location from "expo-location"

const Home = () => {
  const {loading} = useLoading()
  const [adress, setAdress] = useState(null)

  useEffect(()=>{
    hasLocationAdress()
  }, [])

const hasLocationAdress = async ()=>{
  const {status} = await Location.requestForegroundPermissionsAsync()

  if(status!=="granted"){
    alert("Vous n'avez pas de permission sur la localiastion")
    return
  }
  let network = await Location.enableNetworkProviderAsync()
  console.log(network)
  let currentLocation = await Location.getCurrentPositionAsync({})
  let currentAdress = await Location.reverseGeocodeAsync({
    longitude: currentLocation.coords.longitude,
    latitude: currentLocation.coords.latitude
  })
  setAdress(currentAdress)

  console.log("ADRESSE", currentAdress)
}

  return (
    <>
      <NavigationBottomTabHome />
      {loading && <CircleLoading /> }
    </>
  );
};

export default Home;
