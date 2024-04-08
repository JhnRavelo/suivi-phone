import { SafeAreaView, Text, Pressable, Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";
import React, { useEffect, useRef, useState } from "react";
import useFiche from "../hooks/useFiche";
import ProgressBar from "../components/ProgressBar";

const ReadPdf = () => {
  const pdfRef = useRef();
  const [nbrPages, setNbrPages] = useState(1);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { pdf } = useFiche();
  const pdfServer = {
    uri: "http://192.168.123.210:4000/pdf/MAN-INFO-MAIL-0002_Signatures Outlook-9-2-2024.pdf",
    cache: true,
  };
  const onlineSrc = {
    uri: `http://samples.leanpub.com/thereactnativebook-sample.pdf`,
    cache: true,
  };

  useEffect(() => {
    pdfRef.current.setPage(currentPage);
  }, [currentPage]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 10,
      }}
    >
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <View
        style={{
          flex: 1,
        }}
      >
          <Pdf
            trustAllCerts={false}
            ref={pdfRef}
            source={onlineSrc}
            onLoadComplete={(numberOfPages, filePath) => {
              setNbrPages(numberOfPages);
            }}
            onPageChanged={(page, numberOfPages) => {
              setCurrentPage(page);
            }}
            onError={(err) => {
              setError(err);
            }}
            enablePaging={true}
            style={{ flex: 1 }}
          />
          <ProgressBar
            currentPage={currentPage}
            nbrPages={nbrPages}
            setCurrentPage={setCurrentPage}
          />
        </View>
    </SafeAreaView>
  );
};

export default ReadPdf;
