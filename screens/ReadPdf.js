import { SafeAreaView, Text, View } from "react-native";
import Pdf from "react-native-pdf";
import React, { useEffect, useRef, useState } from "react";
import useFiche from "../hooks/useFiche";
import ProgressBar from "../components/ProgressBar";

const ReadPdf = () => {
  const pdfRef = useRef();
  const [nbrPages, setNbrPages] = useState(1);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isScroll, setIsScroll] = useState(true);
  const { pdf } = useFiche();

  const onlineSrc = {
    uri: `http://samples.leanpub.com/thereactnativebook-sample.pdf`,
    cache: true,
  };

  useEffect(() => {
    if (!isScroll) {
      pdfRef.current.setPage(currentPage);
      setIsScroll(true);
    }
  }, [currentPage, isScroll]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 10,
      }}
    >
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Pdf
        trustAllCerts={false}
        ref={pdfRef}
        source={onlineSrc}
        onLoadComplete={(numberOfPages, filePath) => {
          setNbrPages(numberOfPages);
        }}
        onPageChanged={(page, numberOfPages) => {
          setCurrentPage(page);
          setIsScroll(true);
        }}
        onError={(err) => {
          setError(err);
        }}
        horizontal={true}
        enablePaging={true}
        style={{ flex: 1 }}
      />
      <View
        style={{
          height: "15%",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Text
          style={{
            // bottom: 50,
            textAlign: "center",
            fontFamily: "Lato-Regular",
          }}
        >
          {currentPage}/{nbrPages}
        </Text>
        <ProgressBar
          currentPage={currentPage}
          nbrPages={nbrPages}
          setCurrentPage={setCurrentPage}
          setIsScroll={setIsScroll}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReadPdf;
