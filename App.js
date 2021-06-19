import * as React from 'react';
import {Text,View,TouchableOpacity,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanApp extends React.Component{
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }
  getCameraPermissions=async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      buttonState:'clicked',
      hasCameraPermissions:status==='granted'
    })
  }
  handleBarcodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal'
    })
  }
  render(){
    const hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;

    if(hasCameraPermissions&&buttonState==='clicked'){
      return(
      <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}/>
      )
    }
    else if(buttonState==='normal'){
      return(
        <View>
          <Image source={require('./Scanner.jpg')}/>
        <Text style={{marginTop:50}}>{hasCameraPermissions?scannedData:"Request Camera Permissions"}</Text>
        <TouchableOpacity style={{marginTop:50}} onPress={this.getCameraPermissions} title="Barcode Scanner"><Text>Scan QR</Text></TouchableOpacity>
        </View>
      )
    }
  }
}







