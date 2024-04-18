import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";
import { Canvas, Group } from "@shopify/react-native-skia";
import data from "../assets/js/data.js";
import * as d3 from "d3";
import { useSharedValue, withTiming } from "react-native-reanimated";
import AnimatedText from "../components/AnimatedText";
import BarPath from "../components/BarPath";
import XAxisText from "../components/XaxisText";
import FormTitle from "../components/FormTitle.js";
import useChart from "../hooks/useChart.js";
import useGetDataPerMonth from "../hooks/useGetDataPerMonth.js";
import { Picker } from "@react-native-picker/picker";

const colorBlue = "#1C2B39";
const date = new Date();

const Chart = () => {
  const { width } = useWindowDimensions();
  const { years, statProducts, statProblems } = useChart();
  const [year, setYear] = useState(
    years.length > 0 ? years[0] : date.getFullYear()
  );
  const [totalProblem, setTotalProblem] = useState({});
  const getChart = useGetDataPerMonth();
  const datas = useMemo(() => {
    if (statProducts.length > 0 && year) {
      const filterDatas = statProducts.filter((data) => data.year == year);
      const datas = getChart(filterDatas, data, "value");
      return datas;
    }
  }, [statProducts, year]);
  const totalValue = useMemo(() => {
    const totalValue = datas.reduce((acc, cur) => acc + cur.value, 0);
    return totalValue;
  }, [datas]);
  
  const barWidth = 18;
  const graphMargin = 20;
  const canvasHeight = 350;
  const canvasWidth = width;
  const graphHeight = canvasHeight - graphMargin;
  const graphWidth = width;
  const [selsctedDay, setSelsctedDay] = useState("Total");
  const selectedBar = useSharedValue(null);
  const selectedValue = useSharedValue(0);
  const progress = useSharedValue(0);
  const problemValue = useSharedValue(0);

  const xDomainInitial = datas?.map((dataPoint) => dataPoint?.label);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomainInitial).range(xRange).padding(1);
  const yDomainInitial = [0, d3.max(datas, (yDataPoint) => yDataPoint?.value)];
  const yRange = [0, graphHeight];
  let y = d3.scaleLinear().domain(yDomainInitial).range(yRange);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
    selectedValue.value = withTiming(totalValue, { duration: 1000 });
    if (totalProblem && totalProblem?.count) {
      problemValue.value = withTiming(totalProblem?.count, { duration: 1000 });
    }
  }, [progress, selectedValue, totalValue, totalProblem]);

  useEffect(() => {
    if (statProblems.length > 0 && year) {
      const filterStatProblem = statProblems.filter(
        (item) => item.year == year
      );
      setTotalProblem(filterStatProblem[0]);
    }
  }, [statProblems, year]);

  const touchHandler = (e) => {
    const touchX = e.nativeEvent.locationX;
    const touchY = e.nativeEvent.locationY;
    const index = Math.floor((touchX - barWidth / 2) / x.step());
    if (index >= 0 && index < datas.length) {
      const { label, value, month } = datas[index];
      if (
        touchX > x(label) - barWidth / 2 &&
        touchX < x(label) + barWidth / 2 &&
        touchY > graphHeight - y(value) &&
        touchY < graphHeight
      ) {
        selectedBar.value = label;
        setSelsctedDay(month);
        selectedValue.value = value;
      } else {
        selectedBar.value = null;
        setSelsctedDay("Total");
        selectedValue.value = totalValue;
      }
    }
  };

  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.textContainer}>
        <FormTitle title="Statistiques" />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: colorBlue,
              width: "auto",
              padding: 10,
              elevation: 2,
            }}
          >
            {totalValue > 0 && (
              <AnimatedText key={year} selectedValue={selectedValue} />
            )}
            <Text style={styles.textSteps}>{selsctedDay} Suivis</Text>
          </View>
          {years.length > 0 && (
            <View
              style={{
                width: 120,
                backgroundColor: "#fff",
                height: 50,
                borderRadius: 5,
                elevation: 5,
              }}
            >
              <Picker
                selectedValue={year}
                style={{ width: "100%" }}
                onValueChange={(value) => {
                  setYear(value);
                }}
              >
                {years.map((year, index) => (
                  <Picker.Item
                    key={index}
                    value={`${year}`}
                    label={`${year}`}
                  />
                ))}
              </Picker>
            </View>
          )}
          <View
            style={{
              borderWidth: 2,
              borderColor: colorBlue,
              width: "auto",
              padding: 10,
              elevation: 2,
            }}
          >
            <AnimatedText key={year} selectedValue={problemValue} />
            <Text style={styles.textSteps}>
              {totalProblem?.problems?.name
                ? totalProblem?.problems?.name
                : "Aucun probl"}
            </Text>
          </View>
        </View>
      </View>
      {datas.length > 0 && typeof y !== undefined && (
        <Canvas
          key={year}
          onTouchStart={(e) => touchHandler(e)}
          style={{ width: canvasWidth, height: canvasHeight }}
        >
          {datas.map((dataPoint, index) => (
            <Group key={index}>
              <BarPath
                progress={progress}
                x={x(dataPoint.label)}
                y={y(dataPoint.value)}
                barWidth={barWidth}
                graphHeight={graphHeight}
                label={dataPoint.label}
                selectedBar={selectedBar}
              />
              <XAxisText
                x={x(dataPoint.label)}
                y={canvasHeight}
                text={dataPoint.label}
                selectedBar={selectedBar}
              />
            </Group>
          ))}
        </Canvas>
      )}
    </LinearGradientBody>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebecde",
  },
  textContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  textTitle: {
    fontFamily: "Lato-Regular",
    fontSize: 24,
    color: colorBlue,
  },
  textSteps: {
    fontFamily: "Lato-Regular",
    fontSize: 18,
    color: colorBlue,
  },
});
