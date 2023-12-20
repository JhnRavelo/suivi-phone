import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import userIcon from "../assets/png/utilisateur.png";
import cadenaIcon from "../assets/png/cadenas.png";
import chevronRight from "../assets/png/chevron-droit.png";
import { LinearGradient } from "expo-linear-gradient";
import { axiosDefault } from "../api/axios";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradientBody from "../components/LinearGradienBodyt";
import LoginInput from "../components/LoginInput";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import {StackActions} from '@react-navigation/native'
import logo from "../assets/png/Logo_Euro.png"
import useStyles from "../styles/main";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const styles = useStyles()

  const validate = () => {
    let error = {};
    if (!email) {
      error.email = "Veuillez mettre votre email";
    } else if (!emailRegex.test(email)) {
      error.email = "Email invalide";
    }

    if (!password) {
      error.password = "Veuillez mettre votre mot de passe";
    }

    setErrors(error);

    return Object.keys(error).length === 0;
  };

  const handleLogin = async () => {
    const valid = validate();
    if (valid) {
      try {
        const res = await axiosDefault.post("/auth", { email, password });
        if (!res.data.success) {
          setErrors({
            password: "Connexion Invalide",
            email: "Connexion Invalide",
          });
        } else {
          setEmail("");
          setPassword("");
          setErrors({});
          setAuth({
            name: res.data.name,
            email: res.data.email,
            accessToken: res.data.accessToken,
          });
          await AsyncStorage.setItem("jwt", res.data.refreshToken);
          navigation.dispatch(
            StackActions.replace("home")
          );
        }
      } catch (error) {
        setErrors({
          password: "Problème serveur",
          email: "Problème serveur",
        });
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const user = await AsyncStorage.getItem("jwt");
      if (user) {
        const user = await axiosPrivate.get("/auth/user");
        if (user.data.success) {
          setAuth((prev) => {
            return {
              ...prev,
              name: user.data.name,
              email: user.data.email,
            };
          });
          navigation.dispatch(
            StackActions.replace("home")
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradientBody>
      <View style={styles.container}>
        <View style={[styles.screen, styles.boxShadow]}>
          <View style={styles.screenContent}>
            <View style={styles.login}>
              <Image source={logo} style={styles.logoLogin} />
              <LoginInput
                value={email}
                icon={userIcon}
                onChange={setEmail}
                placeholder="Adresse email"
                errors={errors?.email}
                secure={false}
              />
              <LoginInput
                value={password}
                icon={cadenaIcon}
                onChange={setPassword}
                placeholder="Mot de passe"
                errors={errors?.password}
                secure={true}
              />
              <Pressable
                style={[styles.loginSubmit, styles.boxShadow]}
                onPress={() => handleLogin()}
              >
                <Text style={styles.buttonText}>Se Connecter</Text>
                <Image source={chevronRight} style={styles.buttonIcon} />
              </Pressable>
            </View>
          </View>
          <View style={styles.screenBg}>
            <View style={[styles.screenBgShape, styles.screenBgShape1]}></View>
            <View style={[styles.screenBgShape, styles.screenBgShape2]}></View>
            <LinearGradient
              colors={["#2157A1", "#3799B8"]}
              style={[styles.screenBgShape, styles.screenBgShape3]}
            />
            <View style={[styles.screenBgShape, styles.screenBgShape4]}></View>
          </View>
        </View>
      </View>
    </LinearGradientBody>
  );
};

export default Login;
