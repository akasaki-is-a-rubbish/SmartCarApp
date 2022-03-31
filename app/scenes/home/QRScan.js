import React, {useState} from 'react';
import {QRScannerView} from 'react-native-qrcode-scanner-view';
import {View, Text} from 'react-native';
import {vehiclePair} from '../../services/auth';
import {Dialog} from 'react-native-elements';

export default function QRScan(props) {
  const [isvisibleFail, setIsVisibleFail] = useState(false);
  const [isvisibleSuccess, setIsVisibleSuccess] = useState(false);

  const barcodeReceived = event => {
    if (event.data !== null) {
      async function onSubmit(data) {
        try {
          let response = await vehiclePair(data);
          if (response === 200) {
            setIsVisibleSuccess(true);
          } else {
            setIsVisibleFail(true);
          }
        } catch (error) {
          console.log(error);
          setIsVisibleFail(true);
        }
      }
      onSubmit(event.data);
    }
  };
  const toggleDialogFail = () => {
    setIsVisibleFail(!isvisibleFail);
  };

  const toggleDialogSuccess = () => {
    setIsVisibleSuccess(!isvisibleSuccess);
  };

  return (
    <View style={{flex: 1}}>
      <Dialog
        isVisible={isvisibleSuccess}
        onBackdropPress={toggleDialogSuccess}>
        <Text>车辆绑定成功</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="确定"
            onPress={() => props.navigation.navigate('Home')}
          />
        </Dialog.Actions>
      </Dialog>
      <Dialog isVisible={isvisibleFail} onBackdropPress={toggleDialogFail}>
        <Dialog.Title title="警告⚠" />
        <Text>二维码错误</Text>
      </Dialog>
      <QRScannerView
        onScanResult={barcodeReceived}
        scanBarAnimateReverse={true}
      />
    </View>
  );
}
