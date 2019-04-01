import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Alert,Button,PermissionsAndroid } from 'react-native';
import Asms from "react-native-sms-android";
import SmsAndroid  from 'react-native-get-sms-android';
import SmsRetriever from 'react-native-sms-retriever';

export default class App extends React.Component {

  constructor(Props) {
    super(Props);
    this.state = { phoneNumber: '+84969013457', Message: "test" };
  };
  componentDidMount(){
    this.onSmsListenerPressed()
  }
  someFunction = async()=> {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          'title': 'ReactNativeCode Send SMS Permission',
          'message': 'ReactNativeCode App needs access to your Send SMS '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        SmsAndroid.autoSend('+84969013457', 'Test', (fail) => {
            console.log("Failed with this error: " + fail)
        }, (success) => {
            console.log("SMS sent successfully");
        });
      }
      else {
        Alert.alert("Send SMS Permission Not Granted");
      }
  };
  onPhoneNumberPressed = async () => {
    try {
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
   };
   onSmsListenerPressed = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        alert('1');
        SmsRetriever.addSmsListener(event => {
          alert(event.message);
          SmsRetriever.removeSmsListener();
        }); 
      }
      else{alert('fail')}
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  render() {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity onPress={this.onSmsListenerPressed}>
        <View>
          <Image
            //We are showing the Image from online
            source={{
              uri:
                'https://aboutreact.com/wp-content/uploads/2018/09/sms.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/sms.png')}
            style={styles.ImageStyle}
          />
          <Text style={styles.text}>Send SMS</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: 'black',
    textAlign:'center',
    fontSize: 25,
    marginTop:16,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
  },
});