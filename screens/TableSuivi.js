import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormTitle from "../components/FormTitle";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";
import useSuiviStyles from "../styles/suiviStyles";
import deleteIcon from "../assets/png/effacer.png";

const data = [
  {
    observation: "hgjk",
    problem: "klqd,fgqgjkqsndknfkvlqnsdqslddsqdfg",
    solution: "fqhudfhqushbjdqbjdqsjdq",
    id: 1,
  },
  {
    observation: "hgjk",
    problem: "klqd,fgqgjkqsndknfkvlqnsdqslddsqdfg",
    solution: "fqhudfhqushbjdqbjdqsjdq",
    id: 2,
  },
  {
    observation: "hgjk",
    problem: "klqd,fgqgjkqsndknfkvlqnsdqslddsqdfg",
    solution: "fqhudfhqushbjdqbjdqsjdq",
    id: 3,
  },
  {
    observation: "hgjk",
    problem: "klqd,fgqgjkqsndknfkvlqnsdqslddsqdfg",
    solution: "fqhudfhqushbjdqbjdqsjdq",
    id: 4,
  },
  {
    observation: "hgjk",
    problem: "klqd,fgqgjkqsndknfkvlqnsdqslddsqdfg",
    solution: "fqhudfhqushbjdqbjdqsjdq",
    id: 5,
  },
];

const TableSuivi = () => {
  const suiviStyles = useSuiviStyles();
  return (
    <LinearGradientBody>
      <Header />
      <FormTitle title="Suivi" />
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
              <View style={[suiviStyles.tableHeaderView, { width: 50 }]}>
                <Text style={[suiviStyles.tableHeaderText]}>Action</Text>
              </View>
            </View>
            <View style={{ overflow: "hidden", height: 250 }}>
              <FlatList
                style={{ flex: 1 }}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={suiviStyles.tableRow}>
                    <Text style={[suiviStyles.tableCell, { width: 150 }]}>
                      {item.observation}
                    </Text>
                    <Text style={[suiviStyles.tableCell, { width: 150 }]}>
                      {item.problem}
                    </Text>
                    <Text style={[suiviStyles.tableCell, { width: 180 }]}>
                      {item.solution}
                    </Text>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={deleteIcon}
                        style={{ width: 25, height: 25, resizeMode: "contain" }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradientBody>
  );
};

export default TableSuivi;
