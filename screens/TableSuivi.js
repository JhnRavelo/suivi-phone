import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormTitle from "../components/FormTitle";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";
import useSuiviStyles from "../styles/suiviStyles";
import useSuivi from "../hooks/useSuivi";
import deleteIcon from "../assets/png/effacer.png";
import AppButton from "../components/Button";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import useScan from "../hooks/useScan";
import { useLoading } from "../hooks/useLoading";

const TableSuivi = ({ navigation }) => {
  const suiviStyles = useSuiviStyles();
  const { suivis, setSuivis } = useSuivi();
  const { scanInfo } = useScan();
  const axiosPrivate = useAxiosPrivate();
  const { setLoading } = useLoading();
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
          try {
            setLoading(true);
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

  return (
    <LinearGradientBody>
      <Header />
      <FormTitle title="Tableau des suivis" />
      <View style={suiviStyles.tableContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={suiviStyles.listContainer}>
            <View style={suiviStyles.tableHeader}>
              <View style={[suiviStyles.tableHeaderView, { width: 150 }]}>
                <Text style={[suiviStyles.tableHeaderText]}>Problème</Text>
              </View>
              <View style={[suiviStyles.tableHeaderView, { width: 150 }]}>
                <Text style={[suiviStyles.tableHeaderText]}>Solution</Text>
              </View>
              <View style={[suiviStyles.tableHeaderView, { width: 180 }]}>
                <Text style={[suiviStyles.tableHeaderText]}>Observation</Text>
              </View>
              <View style={[suiviStyles.tableHeaderView, { width: 90 }]}>
                <Text style={[suiviStyles.tableHeaderText]}>Technicien</Text>
              </View>
              <View style={[suiviStyles.tableHeaderView, { width: 100 }]}>
                <Text style={[suiviStyles.tableHeaderText]}>Date</Text>
              </View>
              <View style={[suiviStyles.tableHeaderView, { width: 60 }]}>
                <Text style={[suiviStyles.tableHeaderText]}>Action</Text>
              </View>
            </View>
            <View style={suiviStyles.flatListView}>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                data={suivis}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={suiviStyles.tableRow}>
                    <View style={[suiviStyles.tableCellView, { width: 150 }]}>
                      <Text style={[suiviStyles.tableCell]}>
                        {item.problem}
                      </Text>
                    </View>
                    <View style={[suiviStyles.tableCellView, { width: 150 }]}>
                      <Text style={[suiviStyles.tableCell]}>
                        {item.solution}
                      </Text>
                    </View>
                    <View style={[suiviStyles.tableCellView, { width: 180 }]}>
                      <Text style={[suiviStyles.tableCell]}>
                        {item?.observation?.includes(";")
                          ? item?.observation?.split(";")[0]
                          : item.observation}
                      </Text>
                      {item?.observation?.includes(";") &&
                        item?.observation?.split(";")[1] != "null" && (
                          <View
                            style={{
                              width: 150,
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              alignItems: "center",
                              alignSelf: "center",
                              gap: 10,
                            }}
                          >
                            {item.observation
                              .split(";")[1]
                              .split(",")
                              .map((img, index) => (
                                <Image
                                  key={index}
                                  source={{ uri: img }}
                                  style={{
                                    width: 70,
                                    height: 70,
                                    resizeMode: "cover",
                                  }}
                                />
                              ))}
                          </View>
                        )}
                    </View>
                    <View style={[suiviStyles.tableCellView, { width: 90 }]}>
                      <Text style={[suiviStyles.tableCell]}>
                        {item?.user?.name}
                      </Text>
                    </View>
                    <View style={[suiviStyles.tableCellView, { width: 100 }]}>
                      <Text style={[suiviStyles.tableCell]}>
                        {item.createdAt.split(" ")[0]}
                      </Text>
                    </View>
                    <View style={[suiviStyles.tableCellView, { width: 60 }]}>
                      <TouchableOpacity
                        style={suiviStyles.buttonIcon}
                        onPress={() => {
                          handleDelete(item);
                        }}
                      >
                        <Image source={deleteIcon} style={suiviStyles.icon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      {suivis.length != 0 && (
        <AppButton
          text="Ajout de suivi"
          style={suiviStyles.buttonAddSuivi}
          onPress={handleClick}
        />
      )}
    </LinearGradientBody>
  );
};

export default TableSuivi;
