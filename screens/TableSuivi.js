import {
  Alert,
  Animated,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import FormTitle from "../components/FormTitle";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";
import useSuiviStyles from "../styles/suiviStyles";
import useSuivi from "../hooks/useSuivi";
import deleteIcon from "../assets/png/effacer.png";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import useScan from "../hooks/useScan";
import { useLoading } from "../hooks/useLoading";
import ReactButton from "../components/ReactButton";
import useButtonStyles from "../styles/buttonStyles";
import Table from "../components/Table";
import { headerArray } from "../assets/js/dataSuivi";
import calendarIcon from "../assets/png/calendar.png";
import { useEffect, useState } from "react";
import Calendars from "../components/Calendars";
import useDateToTimestamp from "../hooks/useDateToTimestamp";
import chevronIcon from "../assets/png/fleche-vers-le-bas.png";
import problemIcon from "../assets/png/attention.png";

const TableSuivi = ({ navigation }) => {
  const suiviStyles = useSuiviStyles();
  const { suivis, setSuivis, setUpdateRow } = useSuivi();
  const { scanInfo } = useScan();
  const axiosPrivate = useAxiosPrivate();
  const { setLoading } = useLoading();
  const buttonStyles = useButtonStyles();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [rowSuivis, setRowSuivis] = useState([]);
  const getTimestamp = useDateToTimestamp();
  const [tri, setTri] = useState("calendar");
  const [problem, setProblem] = useState("");
  const [animation] = useState(new Animated.Value(0));

  const handleClick = () => {
    navigation.navigate("formsuivi");
  };

  const handleDelete = (item) => {
    Alert.alert("Suppression", "Voulez-vous vraiment le supprimez ?", [
      {
        text: "Annuler",
      },
      {
        text: "OK",
        onPress: async () => {
          setLoading(true);
          try {
            const res = await axiosPrivate.post("/suivi/delete", {
              deleteId: item.id,
              productId: scanInfo.split(",")[1],
            });
            if (res.data.success) {
              setLoading(false);
              setSuivis(res.data.suivis);
            } else {
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log("ERROR DELETE SUIVI", error);
          }
        },
      },
    ]);
  };

  const handleUpdate = (item) => {
    setUpdateRow(item);
    navigation.navigate("formsuivi");
  };

  const toggleRotation = () => {
    setModalOpen(!modalOpen);
    const toValue = modalOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });

  useEffect(() => {
    if (suivis) {
      if (firstDate && lastDate) {
        const filterSuivis = suivis.filter((suivi) => {
          const suiviCreatedAt = suivi.createdAt.split("\n")[0];
          const suiviTimestamp = getTimestamp(suiviCreatedAt);
          return (
            suiviTimestamp >= getTimestamp(firstDate) &&
            suiviTimestamp <= getTimestamp(lastDate)
          );
        });
        setRowSuivis(filterSuivis);
      } else setRowSuivis(suivis);
    }
  }, [suivis, lastDate, firstDate]);

  useEffect(() => {
    if (suivis) {
      if (problem) {
        const filterSuivis = suivis.filter((suivi) =>
          suivi.problem.includes(problem)
        );
        setRowSuivis(filterSuivis);
      } else setRowSuivis(suivis);
    }
  }, [suivis, problem]);

  return (
    <LinearGradientBody>
      <Header />
      {open && (
        <Calendars
          setOpen={setOpen}
          setFirstDate={setFirstDate}
          setLastDate={setLastDate}
        />
      )}
      <FormTitle title="Tableau des suivis" />
      {scanInfo && (
        <View
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReactButton
            icon={tri === "calendar" ? calendarIcon : problemIcon}
            iconStyle={{ width: 25, height: 25 }}
            onPress={() => (tri === "calendar" ? setOpen(true) : null)}
          />
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <ReactButton
              icon={chevronIcon}
              iconStyle={{ width: 10, height: 10 }}
              onPress={() => toggleRotation()}
            />
          </Animated.View>
          {modalOpen && (
            <ReactButton
              icon={tri === "calendar" ? problemIcon : calendarIcon}
              iconStyle={{ height: 25, width: 25 }}
              onPress={() => {
                tri === "calendar" ? setTri("problem") : setTri("calendar");
                toggleRotation();
                setProblem("")
                setFirstDate("")
                setLastDate("")
              }}
            />
          )}
          {tri == "calendar" ? (
            <View
              style={{
                width: 160,
                height: 25,
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#1C2B39",
                  fontWeight: "500",
                  textAlign: "center",
                  fontSize: 13,
                }}
              >
                {firstDate} / {lastDate}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: 120,
                height: 25,
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <TextInput
                style={{ width: "100%", paddingHorizontal: 10 }}
                placeholder="Rechercher"
                value={problem}
                onChangeText={setProblem}
              />
            </View>
          )}
        </View>
      )}
      <View style={suiviStyles.tableContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={suiviStyles.listContainer}>
            <Table
              tableContainerStyle={suiviStyles.tableHeader}
              tableViewStyle={suiviStyles.tableHeaderView}
              tableTextStyle={suiviStyles.tableHeaderText}
              data={headerArray}
            />
            <View style={suiviStyles.flatListView}>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                data={rowSuivis}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const itemEntries = Object.entries(item);
                  let row = [];
                  itemEntries.forEach(([key, value]) => {
                    if (key == "problem" || key == "solution") {
                      row.push({ label: value, width: 150 });
                    } else if (key == "observation") {
                      row.push({ label: value, width: 180 });
                    } else if (key == "user") {
                      row.push({ label: value, width: 90 });
                    } else if (key == "createdAt") {
                      row.push({ label: value, width: 100 });
                    }
                  });
                  return (
                    <Table
                      type="row"
                      data={row}
                      tableContainerStyle={suiviStyles.tableRow}
                      tableViewStyle={suiviStyles.tableCellView}
                      tableTextStyle={suiviStyles.tableCell}
                      handleUpdate={() => handleUpdate(item)}
                      handleDelete={() => handleDelete(item)}
                      icon={deleteIcon}
                      iconStyle={suiviStyles.icon}
                      buttonStyle={suiviStyles.buttonIcon}
                      key={item.id}
                      galleryContainerStyle={suiviStyles.imgContainer}
                      galleryImgStyle={suiviStyles.imgStyle}
                    />
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      {scanInfo && (
        <ReactButton
          text="Ajout de suivi"
          touchableStyle={[
            buttonStyles.buttonContainer,
            suiviStyles.buttonAddSuivi,
          ]}
          viewStyle={buttonStyles.buttonView}
          textStyle={buttonStyles.buttonText}
          onPress={() => handleClick()}
        />
      )}
    </LinearGradientBody>
  );
};

export default TableSuivi;
