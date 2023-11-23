import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions"


export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state ={
            domState: "normal", //estado de modo
            hasCameraPermissions: null, //verifica se tem permissão para usar a camera
            scanned:false, //ja fez o scanner ou não
            scannerData:"", //receber o dado escaneado
        }
    }

    getCameraPermission = async (donState) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)

        this.setState({
            hasCameraPermissions: status == "granted",
            donState:donState,
            scanned:false
        })
    }
    handlebarCodeScanner = async ({type,data}) => {

        this.setState({
            scannerData: data,
            donState: 'normal',
            scanned: true,
        })

    }
    render(){
        const{
            domState,
            hasCameraPermissions,
            scannerData,
            scanned,
        }= this.state
        if(domState == "scanner"){
            return(
                <BarCodeScanner
                onBarCodeScanned = {scanned?undefined: this.handlebarCodeScanner}
                style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        return(
            <View style={styles.container}>
                <Text style={styles.buttomText}>
                    {hasCameraPermissions? scannerData: "Solicitar permissão da camera"}
                </Text>
                <TouchableOpacity
                style={styles.buttom}
                    onPress={()=> this.getCameraPermission("scanner")}
                >
                    <Text style={styles.buttomText}>Digitalizar QRCode</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#5654d9"
    },
    buttom:{
        width:'43%',
        height:55,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "#f48d20", 
        borderRadius:15
    },
    buttomText:{
        fontSize:15,
        color:"#fff"
    }
})