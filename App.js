import NavigationStackLog from "./navigation/NavigationStackLog";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { ScanProvider } from "./context/ScanContext";
import { ScreenProvider } from "./context/ScreenContext";
import { QRCodeGeneratorProvider } from "./context/QRCodeGeneratorContext";
import { SuiviProvider } from "./context/SuiviContext";

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
            <ScreenProvider>
              <QRCodeGeneratorProvider>
                <SuiviProvider>
                  <NavigationContainer>
                    <NavigationStackLog />
                  </NavigationContainer>
                </SuiviProvider>
              </QRCodeGeneratorProvider>
            </ScreenProvider>
          </ScanProvider>
        </AuthProvider>
      )}
    </>
  );
};

export default App;
