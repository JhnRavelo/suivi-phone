import React, { useEffect } from "react";
import NavigationBottomTabHome from "../navigation/NavigationBottomTabHome";
import { useLoading } from "../hooks/useLoading";
import CircleLoading from "../components/CircleLoading";

const Home = () => {
  const {loading} = useLoading()
  useEffect(()=>{
    console.log(loading)
  }, [loading])
  return (
    <>
      <NavigationBottomTabHome />
      {loading && <CircleLoading /> }
    </>
  );
};

export default Home;
