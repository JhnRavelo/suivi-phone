import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import useGetDateFormat from "../hooks/useGetDateFormat";
import useCalendarStyles from "../styles/calendarStyles";

const ONE_DAY_STAMP = 86400000;

const Calendars = ({ setOpen, setFirstDate, setLastDate }) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const getDateFormat = useGetDateFormat();
  const styles = useCalendarStyles();

  const handleDateSelect = (date) => {
    let updatedDates = { ...selectedDates };
    const { dateString, timestamp } = date;
    const updatedDatesLength = Object.keys(updatedDates).length;
    if (updatedDatesLength == 0) {
      updatedDates[dateString] = {
        selected: true,
        color: "blue",
        textColor: "white",
        timestamp,
      };
    } else if (updatedDatesLength == 1) {
      let firstDay, endingDay;
      updatedDates[dateString] = {
        selected: true,
        color: "blue",
        textColor: "white",
        timestamp,
      };
      const values = Object.values(updatedDates);
      if (values[0].timestamp > values[1].timestamp) {
        firstDay = values[1].timestamp;
        endingDay = values[0].timestamp;
      } else {
        firstDay = values[0].timestamp;
        endingDay = values[1].timestamp;
      }
      const firstDayString = getDateFormat(firstDay);
      const endingDayString = getDateFormat(endingDay);
      setFirstDate(firstDayString);
      setLastDate(endingDayString);
      updatedDates[firstDayString] = {
        startingDay: true,
        color: "blue",
        textColor: "white",
      };
      updatedDates[endingDayString] = {
        endingDay: true,
        color: "blue",
        textColor: "white",
      };
      for (
        let i = firstDay + ONE_DAY_STAMP;
        i < endingDay;
        i += ONE_DAY_STAMP
      ) {
        updatedDates[getDateFormat(i)] = {
          selected: true,
          color: "#77B5FE",
          textColor: "white",
        };
      }
    } else if (updatedDatesLength > 1) {
      updatedDates = {};
    }
    setSelectedDates(updatedDates);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedDates({});
  };

  const handleClose = () => {
    setSelectedDates({});
    setFirstDate("");
    setLastDate("");
    setOpen(false);
  };

  const handleDateFilter = () => {
    setOpen(false);
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Picker
            selectedValue={selectedYear}
            style={styles.yearPicker}
            onValueChange={(itemValue) => handleYearChange(itemValue)}
          >
            {Array.from({ length: 50 }, (_, i) => (
              <Picker.Item
                key={i}
                label={`${selectedYear - 25 + i}`}
                value={`${selectedYear - 25 + i}`}
              />
            ))}
          </Picker>
          <Calendar
            key={selectedYear}
            markingType="period"
            onDayPress={(date) => handleDateSelect(date)}
            current={selectedYear + "-" + selectedMonth + "-01"}
            onMonthChange={(date) => setSelectedMonth(date.month)}
            markedDates={selectedDates}
          />
          <View style={{ flexDirection: "row-reverse" }}>
            <Pressable onPress={() => handleClose()}>
              <Text style={styles.btnText}>Annuler</Text>
            </Pressable>
            <Pressable onPress={() => handleDateFilter()}>
              <Text style={styles.btnText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Calendars;
