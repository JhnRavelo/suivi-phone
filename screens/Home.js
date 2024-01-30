import React from "react";
import NavigationBottomTabHome from "../navigation/NavigationBottomTabHome";
import { useLoading } from "../hooks/useLoading";
import CircleLoading from "../components/CircleLoading";

const Home = () => {
  const { loading } = useLoading();

  return (
    <>
      <NavigationBottomTabHome />
      {loading && <CircleLoading />}
    </>
  );
};

export default Home;
