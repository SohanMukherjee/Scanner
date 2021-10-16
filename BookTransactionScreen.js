import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Touchable} from 'react-native';
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';

export default class BookTranscationScreen extends Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissons:null,
            scanned:false,
            scannedbookid:'',
            scannedstudentid:'',
            buttonState:"normal",
        }
    }

    getCameraPermission= async(id) => {
        console.log("hello")
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        console.log(status)
        this.setState({
            hasCameraPermissons:status==="granted",
            buttonState:id,
            scanned:false,
        })
    }

    handleBarcodeScanned= async({type,data}) => {
        const {buttonState} = this.state
        if(buttonState == "bookid"){
            this.setState({
                scanned:true,
                scannedbookid:data,
                buttonState:"normal"
            })
        }else if(buttonState== "studentid"){
            this.setState({
                scanned:true,
                scannedstudentid:data,
                buttonState:"normal"
            })
        }
        
    }
    render(){
        const hasCameraPermissons = this.state.hasCameraPermissons
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState

        if(buttonState !=="normal" && hasCameraPermissons){
            return(
                <BarCodeScanner onBarCodeScanned = {scanned?undefined:this.handleBarcodeScanned} 
                style ={StyleSheet.absoluteFillObject}></BarCodeScanner>
            )
        }else if (buttonState==="normal"){
            return(
                <View style={styles.container}>
                    <View>
                        <Image source = {require("../assets/booklogo.jpg")}
                        style = {{
                            width :200,
                            height:200
                        }}>
                <Text style= {{fontSize: 30, textAlign: 'center'}}>WILY</Text>
                        </Image>
                    </View>
                    <View style= {styles.inputView}>
                    <TextInput
              style = {styles.inputBox}
              placeholder = "Book ID"
              value = {this.state.scannedbookid}/>
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={()=>{
                    this.getCameraPermissions("bookid")
                  }}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <View style ={styles.inputView}>
            <TextInput
              style = {styles.inputBox}
              placeholder = "Student ID"
              value = {this.state.scannedstudentid}/>
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={()=>{
                    this.getCameraPermissions("studentid")
                  }}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
                    </View>
                    
                
            )
        }
       
    }
}
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
      },
      scanButton:{
        backgroundColor: '#66BB6A',
        borderWidth: 1.5,
        borderLeftWidth : 0,
        width : 50
      },
      buttonText:{
        fontSize: 15,
        textAlign : 'center',
        marginTop: 10
      },
      inputView : {
        flexDirection : 'row',
        margin : 20,
      },
      inputBox: {
        width : 200,
        height : 40,
        borderWidth : 1.5,
        borderRightWidth : 0,
        fontSize: 20
      }
});