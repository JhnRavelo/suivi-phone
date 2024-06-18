import { PrinterMainActivity } from "../module/PrinterModule";

const usePrint = () => {
  return (str) => {
    PrinterMainActivity.getPrinterStatus((err, stat) => {
      if (err) return console.log(err);
      if (stat == 0 || stat == 4 || stat == 5 || stat == 1) {
        PrinterMainActivity.connectToDevice("66:22:6E:68:43:3F", (err, msg) => {
          if (err) return console.log(err);
          if (str) {
            PrinterMainActivity.printQRCode(str.toString());
          }
          console.log(msg);
        });
      } else {
        PrinterMainActivity.printQRCode(str.toString());
      }
    });
  };
};

export default usePrint;
