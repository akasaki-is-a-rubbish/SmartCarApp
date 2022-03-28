import React, {Component} from 'react';
import {QRScannerView} from 'react-native-qrcode-scanner-view';
import {View, Alert} from 'react-native';
import {vehiclePair} from '../../services/auth';

export default class QRScan extends Component {
  barcodeReceived = event => {
    if (event.data !== null) {
      async function onSubmit(data) {
        try {
          let response = await vehiclePair(data);
          this.props.navigation.goBack();
        } catch (error) {
          console.log(error);
          Alert.alert('错误', '请重新扫码');
        }
      }
      onSubmit(event.data);
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <QRScannerView
          onScanResult={this.barcodeReceived}
          scanBarAnimateReverse={true}
        />
      </View>
    );
  }
}
