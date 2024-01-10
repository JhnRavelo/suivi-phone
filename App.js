import NavigationStackLog from "./navigation/NavigationStackLog";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { ScanProvider } from "./context/ScanContext";

const App = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    fetchFont();
  });

  const fetchFont = async () => {
    await Font.loadAsync({
      "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    });
    setIsReady(true);
  };

  return (
    <>
      {isReady && (
        <AuthProvider>
          <ScanProvider>
            <NavigationContainer>
              <NavigationStackLog />
            </NavigationContainer>
          </ScanProvider>
        </AuthProvider>
      )}
    </>
  );
};

export default App;
