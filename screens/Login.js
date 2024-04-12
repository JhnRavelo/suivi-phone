import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import userIcon from "../assets/png/utilisateur.png";
import cadenaIcon from "../assets/png/cadenas.png";
import chevronRight from "../assets/png/chevron-droit.png";
import { LinearGradient } from "expo-linear-gradient";
import { axiosDefault } from "../api/axios";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradientBody from "../components/LinearGradienBody";
import Input from "../components/Input";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import { StackActions } from "@react-navigation/native";
import logo from "../assets/png/Logo_Euro.png";
import useStyles from "../styles/main";
import CircleLoading from "../components/CircleLoading";
import { useLoading } from "../hooks/useLoading";
import ReactButton from "../components/ReactButton";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const styles = useStyles();
  const { loading, setLoading } = useLoading();

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
        setLoading(true);
        const res = await axiosDefault.post("/auth", { email, password });
        if (!res.data.success) {
          setErrors({
            password: "Connexion Invalide",
            email: "Connexion Invalide",
          });
          setLoading(false);
        } else {
          setLoading(false);
          setEmail("");
          setPassword("");
          setErrors({});
          setAuth({
            name: res.data.name,
            email: res.data.email,
            accessToken: res.data.accessToken,
          });
          await AsyncStorage.setItem("jwt", res.data.refreshToken);
          navigation.dispatch(StackActions.replace("home"));
        }
      } catch (error) {
        setLoading(false);
        setErrors({
          password: "Problème serveur",
          email: "Problème serveur",
        });
        console.log("ERROR SUBMIT", error)
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
        setLoading(true);
        const user = await axiosPrivate.get("/auth/user");
        if (user.data.success) {
          setAuth((prev) => {
            return {
              ...prev,
              name: user.data.name,
              email: user.data.email,
            };
          });
          setLoading(false);
          navigation.dispatch(StackActions.replace("home"));
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      await AsyncStorage.removeItem("jwt")
      console.log("ERROR VERIFY USER", error);
    }
  };

  return (
    <>
      <LinearGradientBody>
        <View style={styles.container}>
          <View style={[styles.screen, styles.boxShadow]}>
            <View style={styles.screenContent}>
              <View style={styles.login}>
                <Image source={logo} style={styles.logoLogin} />
                <Input
                  value={email}
                  icon={userIcon}
                  onChange={setEmail}
                  placeholder="Adresse email"
                  errors={errors?.email}
                  secure={false}
                />
                <Input
                  value={password}
                  icon={cadenaIcon}
                  onChange={setPassword}
                  placeholder="Mot de passe"
                  errors={errors?.password}
                  secure={true}
                />
                <ReactButton
                  touchableStyle={[styles.loginSubmit, styles.boxShadow]}
                  onPress={() => handleLogin()}
                  textStyle={styles.buttonText}
                  icon={chevronRight}
                  iconStyle={styles.buttonIcon}
                  text="Connexion"
                  viewStyle={styles.buttonView}
                />
              </View>
            </View>
            <View style={styles.screenBg}>
              <View
                style={[styles.screenBgShape, styles.screenBgShape1]}
              ></View>
              <View
                style={[styles.screenBgShape, styles.screenBgShape2]}
              ></View>
              <LinearGradient
                colors={["#2157A1", "#3799B8"]}
                style={[styles.screenBgShape, styles.screenBgShape3]}
              />
              <View
                style={[styles.screenBgShape, styles.screenBgShape4]}
              ></View>
            </View>
          </View>
        </View>
      </LinearGradientBody>
      {loading && <CircleLoading />}
    </>
  );
};

export default Login;
