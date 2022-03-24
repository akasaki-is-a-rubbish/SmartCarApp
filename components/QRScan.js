import React, {Component} from 'react';
import {QRScannerView} from 'react-native-qrcode-scanner-view';
import {View} from 'react-native';
export default class QRScan extends Component {
  barcodeReceived = event => {
    console.log('Type: ' + event.type + '\nData: ' + event.data);
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
