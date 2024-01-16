import React from 'react'
import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from "rn-fetch-blob"

const useDownloadQRCode = (setQRImage, QRImage) => {
    const saveImage = qr => {
        qr = qr.split('data:image/jpeg;base64,')[1];
    
        let date = new Date();
        const {fs} = RNFetchBlob;
        let filename =
          '/qr_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.jpeg';
        let PictureDir = fs.dirs.DownloadDir + filename;
    
        fs.writeFile(PictureDir, qr, 'base64')
          .then(() => {
            RNFetchBlob.android.addCompleteDownload({
              title: '🎁 Here is your QR code!',
              useDownloadManager: true,
              showNotification: true,
              notification: true,
              path: PictureDir,
              mime: 'image/jpeg',
              description: 'Image',
            });
          })
          .catch(err => {
            console.log('ERR: ', err);
          });
      };
  return () => {
    QRImage.toDataURL(async data => {
      const shareImageBase64 = {
        title: 'QR',
        message: 'Here is my QR code!',
        url: `data:image/jpeg;base64,${data}`,
      };
      setQRImage(String(shareImageBase64.url));

      if (Platform.OS === 'ios') {
        saveImage(String(shareImageBase64.url));
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'App needs access to your storage to download the QR code image',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage Permission Granted');
            saveImage(String(shareImageBase64.url));
          } else {
            console.log('Storage Permission Not Granted');
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
}

export default useDownloadQRCode
