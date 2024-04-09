import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ReactButton from "./ReactButton";
import Gallery from "./Gallery";

const List = ({
  data,
  tableViewStyle,
  tableTextStyle,
  galleryImgStyle,
  galleryContainerStyle,
}) => {
  return (
    <>
      {data.map((item, index) => {
        if (item.label.includes(";")) {
          const observationArray = item.label.split(";");
          return (
            <View style={[tableViewStyle, { width: 180 }]} key={index}>
              {observationArray[0] && (
                <Text style={[tableTextStyle, { marginBottom: 5 }]}>
                  {observationArray[0]}
                </Text>
              )}
              <Gallery
                observation={item?.label}
                screen="update"
                imgStyle={galleryImgStyle}
                imgContainerStyle={galleryContainerStyle}
              />
            </View>
          );
        } else {
          return (
            <View style={[tableViewStyle, { width: item.width }]} key={index}>
              <Text style={tableTextStyle}>{item.label}</Text>
            </View>
          );
        }
      })}
    </>
  );
};

const Table = ({
  data,
  tableContainerStyle,
  tableViewStyle,
  tableTextStyle,
  type,
  handleUpdate,
  handleDelete,
  icon,
  iconStyle,
  buttonStyle,
  galleryContainerStyle,
  galleryImgStyle,
}) => {
  return (
    <View style={tableContainerStyle}>
      {type == "header" ? (
        <List
          data={data}
          tableTextStyle={tableTextStyle}
          tableViewStyle={tableViewStyle}
        />
      ) : (
        <>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={handleUpdate}
          >
            {
              <List
                data={data}
                tableTextStyle={tableTextStyle}
                tableViewStyle={tableViewStyle}
                galleryContainerStyle={galleryContainerStyle}
                galleryImgStyle={galleryImgStyle}
              />
            }
          </TouchableOpacity>
          <View style={[tableViewStyle, { width: 60 }]}>
            <ReactButton
              touchableStyle={buttonStyle}
              onPress={handleDelete}
              icon={icon}
              iconStyle={iconStyle}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Table;
