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

const TableSuivi = ({ navigation }) => {
  const suiviStyles = useSuiviStyles();
  const { suivis, setSuivis, setUpdateRow } = useSuivi();
  const { scanInfo } = useScan();
  const axiosPrivate = useAxiosPrivate();
  const { setLoading } = useLoading();
  const buttonStyles = useButtonStyles();
  const handleClick = () => {
    navigation.navigate("addsuivi");
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
            console.log(error);
          }
        },
      },
    ]);
  };

  const handleUpdate = (item) => {
    setUpdateRow(item);
    navigation.navigate("updatesuivi");
  };

  return (
    <LinearGradientBody>
      <Header />
      <FormTitle title="Tableau des suivis" />
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
                data={suivis}
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
                  // const observationArray = item?.observation?.split(";");
                  return (
                    // <View style={suiviStyles.tableRow}>
                    //   <TouchableOpacity
                    //     key={item.id}
                    //     onPress={() => handleUpdate(item)}
                    //     style={{ flexDirection: "row" }}
                    //   >
                    //     <View
                    //       style={[suiviStyles.tableCellView, { width: 150 }]}
                    //     >
                    //       <Text style={[suiviStyles.tableCell]}>
                    //         {item.problem}
                    //       </Text>
                    //     </View>
                    //     <View
                    //       style={[suiviStyles.tableCellView, { width: 150 }]}
                    //     >
                    //       <Text style={[suiviStyles.tableCell]}>
                    //         {item.solution}
                    //       </Text>
                    //     </View>
                    //     <View
                    //       style={[suiviStyles.tableCellView, { width: 180 }]}
                    //     >
                    //       {item?.observation?.includes(";") &&
                    //         observationArray[0] && (
                    //           <Text
                    //             style={[
                    //               suiviStyles.tableCell,
                    //               { marginBottom: 5 },
                    //             ]}
                    //           >
                    //             {observationArray[0]}
                    //           </Text>
                    //         )}
                    //       <Gallery
                    //         observation={item?.observation}
                    //         screen="update"
                    //         imgStyle={suiviStyles.imgStyle}
                    //         imgContainerStyle={suiviStyles.imgContainer}
                    //       />
                    //     </View>
                    //     <View
                    //       style={[suiviStyles.tableCellView, { width: 90 }]}
                    //     >
                    //       <Text style={[suiviStyles.tableCell]}>
                    //         {item?.user}
                    //       </Text>
                    //     </View>
                    //     <View
                    //       style={[suiviStyles.tableCellView, { width: 100 }]}
                    //     >
                    //       <Text style={[suiviStyles.tableCell]}>
                    //         {item.createdAt}
                    //       </Text>
                    //     </View>
                    //   </TouchableOpacity>
                    //   <View style={[suiviStyles.tableCellView, { width: 60 }]}>
                    //     <ReactButton
                    //       touchableStyle={suiviStyles.buttonIcon}
                    //       onPress={() => {
                    //         handleDelete(item);
                    //       }}
                    //       icon={deleteIcon}
                    //       iconStyle={suiviStyles.icon}
                    //     />
                    //   </View>
                    // </View>
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
