import { Button, SafeAreaView, Text, TextInput, View } from "react-native";
import Pdf from "react-native-pdf";
import React, { useRef, useState } from "react";
import useFiche from "../hooks/useFiche";

const ReadPdf = () => {
  const pdfRef = useRef();
  const [nbrPages, setNbrPages] = useState(0);
  const [pageAt, setPageAt] = useState(null);
  const [error, setError] = useState(null);
  const { pdf } = useFiche();
  const pdfServer = {
    uri: "http://192.168.123.210:4000/pdf/MAN-INFO-MAIL-0002_Signatures Outlook-9-2-2024.pdf",
    cache: true
  };
  const onlineSrc = {
    uri: `http://samples.leanpub.com/thereactnativebook-sample.pdf`,
    cache: true
  };
  const [srcPDF, setSrcPDF] = useState(onlineSrc);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 20,
      }}
    >
      <Button title="changer pdf" onPress={() => setSrcPDF(pdfServer)} />
      <Button
        title="changer pdf initial"
        onPress={() => {
          setSrcPDF(onlineSrc);
          console.log(pdfServer);
        }}
      />
      <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TextInput
          value={pageAt}
          onChangeText={setPageAt}
          style={{
            width: 50,
            height: 35,
            // borderWidth: 1,
            // borderColor: "#000",
            fontSize: 22,
            padding: 5,
            textAlign: "center"
          }}
        />
        <Text style={{ fontSize: 22 }}> /{nbrPages} </Text>
        <Button title="Aller à la page" onPress={()=>{
          console.log(typeof parseInt(pageAt))
          pdfRef.current.setPage(parseInt(pageAt))
        }} />
      </View>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Pdf
      trustAllCerts={false}
      ref={pdfRef}
        source={srcPDF}
        onLoadComplete={(numberOfPages, filePath) => {
          setNbrPages(numberOfPages);
        }}
        singlePage={true}
        onError={(err) => {
          setError(err);
        }}
        style={{ flex: 1, alignSelf: "stretch" }}
      />
    </SafeAreaView>
  );
};

export default ReadPdf;
