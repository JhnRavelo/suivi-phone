import {
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

const TableSuivi = ({ navigation }) => {
  const suiviStyles = useSuiviStyles();
  const { suivis } = useSuivi();
  const handleClick = () => {
    navigation.navigate("addsuivi");
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
              {/* <View style={[suiviStyles.tableHeaderView, { width: 70 }]}>
                <Text style={[suiviStyles.tableHeaderText]}>Action</Text>
              </View> */}
            </View>
            <View style={suiviStyles.flatListView}>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                data={suivis}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={suiviStyles.tableRow}>
                    <Text style={[suiviStyles.tableCell, { width: 150 }]}>
                      {item.problem}
                    </Text>
                    <Text style={[suiviStyles.tableCell, { width: 150 }]}>
                      {item.solution}
                    </Text>
                    <Text style={[suiviStyles.tableCell, { width: 180 }]}>
                      {item.observation}
                    </Text>
                    <Text style={[suiviStyles.tableCell, { width: 90 }]}>
                      {item?.user?.name}
                    </Text>
                    <Text style={[suiviStyles.tableCell, { width: 100 }]}>
                      {item.createdAt.split(" ")[0]}
                    </Text>
                    {/* <TouchableOpacity style={suiviStyles.buttonIcon}>
                      <Image source={deleteIcon} style={suiviStyles.icon} />
                    </TouchableOpacity> */}
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <AppButton
        text="Ajout de suivi"
        style={suiviStyles.buttonAddSuivi}
        onPress={handleClick}
      />
    </LinearGradientBody>
  );
};

export default TableSuivi;
