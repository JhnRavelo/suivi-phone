import { Alert, FlatList, ScrollView, View } from "react-native";
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
import { useEffect, useState } from "react";
import Calendars from "../components/Calendars";
import useDateToTimestamp from "../hooks/useDateToTimestamp";
import SortSuivi from "../components/SortSuivi";
import addSuiviIcon from "../assets/png/nouveau-fichier.png";
import useChart from "../hooks/useChart";

const TableSuivi = ({ navigation }) => {
  const suiviStyles = useSuiviStyles();
  const { suivis, setSuivis, setUpdateRow } = useSuivi();
  const { scanInfo } = useScan();
  const axiosPrivate = useAxiosPrivate();
  const { setLoading } = useLoading();
  const buttonStyles = useButtonStyles();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { setYears, setStatProducts, setStatProblems } = useChart();
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [rowSuivis, setRowSuivis] = useState([]);
  const getTimestamp = useDateToTimestamp();
  const [tri, setTri] = useState("calendar");
  const [problem, setProblem] = useState("");

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
              setYears(res.data.years);
              setStatProblems(res.data.statProblems);
              setStatProducts(res.data.statProducts);
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

  useEffect(() => {
    if (suivis) {
      let filterSuivis = suivis;
      if (firstDate && lastDate) {
        filterSuivis = filterSuivis.filter((suivi) => {
          const suiviCreatedAt = suivi.createdAt.split("\n")[0];
          const suiviTimestamp = getTimestamp(suiviCreatedAt);
          return (
            suiviTimestamp >= getTimestamp(firstDate) &&
            suiviTimestamp <= getTimestamp(lastDate)
          );
        });
      }
      if (problem) {
        filterSuivis = filterSuivis.filter((suivi) =>
          suivi.problem.includes(problem)
        );
      }
      setRowSuivis(filterSuivis);
    }
  }, [suivis, problem, lastDate, firstDate]);

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
        <SortSuivi
          firstDate={firstDate}
          lastDate={lastDate}
          tri={tri}
          setTri={setTri}
          problem={problem}
          setProblem={setProblem}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setOpen={setOpen}
        />
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
          icon={addSuiviIcon}
          touchableStyle={[suiviStyles.buttonAddSuivi]}
          iconStyle={{ width: 30, height: 30, tintColor: "#fff" }}
          viewStyle={buttonStyles.buttonView}
          onPress={() => handleClick()}
        />
      )}
    </LinearGradientBody>
  );
};

export default TableSuivi;
