import React, {Component} from 'react'
import  { StyleSheet, View, Image, Text, Dimensions, TextInput, TouchableOpacity, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import Homepage from '../Home/Homepage';
import Signup from '../Login/Signup';
import RootNavigation from '../navigation/RootNavigation';


// set connection of firebase
const config = {
  apiKey: "AIzaSyDpXOFHtisjvBKlSx5DLrEd0uFiHmXUfyU",
  authDomain: "test-fb2a3.firebaseapp.com",
  databaseURL: "https://test-fb2a3.firebaseio.com",
  projectId: "test-fb2a3",
  storageBucket: "test-fb2a3.appspot.com",
  messagingSenderId: "22316709366"
};
firebase.initializeApp(config);

//timezone
var moment = require('moment-timezone');


class Login extends Component {

  static navigationOptions = {
    header: null,
  }


  componentWillMount() {
    setInterval( () => {
      this.setState({
        curTime : moment().tz("Asia/Bangkok").format()
      })
    },1000)
  }
  

  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
    this.state = { email: '' };
    this.state = { password: ''};
    this.state = { isLoading: true};
    this.state = { curTime: ''};
  }



  loginFirebase = (email, password) => {
    if(!this.validate(email)){
      Alert.alert('Error !',
          'Your email is not correct',);
    }
    else if(this.state.password.length <= 5){
      Alert.alert('Error !',
          'Your password is too shot',);
    }else{
      try {
        firebase.auth().signInWithEmailAndPassword(email,password).then(function (user) {
          console.log(user);
          (user) => this.setState({isLoading: true})
        }).then((user) => {
          firebase.auth().onAuthStateChanged((user) => {
                if(user != null){
                    console.log(user)
                    firebase.database().ref('User').child('Login').child('Firebase').child(user.uid).set({
                      Login_time: this.state.curTime,
                    });
                    this.props.navigation.navigate('Homepage', {
                      uid: user.uid,

                    });
                }
            })
        }).catch((error) => {
          Alert.alert('Error !',
          'Your email or password is not correct',);
        })
          
      } catch (error) {
        console.log(error.toString());
        Alert.alert('Error !',error.toString());
      }
    }
  }

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    
    if(reg.test(text) === false)
    {
    return false;
      }
    else {
      return true;
    }
    }
    async loginWithFacebook(){
        const {type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
        ('229482407828081', {permissions: ['public_profile']})

        if(type == 'success'){
                      const credential = firebase.auth.FacebookAuthProvider.credential(token);
                      console.log(credential);
            firebase.auth().signInAndRetrieveDataWithCredential(credential).then((user) => {
              firebase.auth().onAuthStateChanged((user) => {
                if(user != null){
                    console.log(user)
                    firebase.database().ref('User').child('Login').child('Facebook').child(user.uid).set({
                      Login_time: this.state.curTime,
                    });
                    firebase.database().ref('User').child('Facebook').child(user.uid).set({
                      Name: user.displayName,
                      PhotoURL: user.photoURL,
                    });
                    this.props.navigation.navigate('Homepage', {
                      uid: user.uid,
                    });
                }
            })
            }).catch((error) => {
                console.log(error);
                Alert.alert('Error !',error.toString());
                
            })
        }
    }
    

    componentDidMount() {
        // firebase.auth().onAuthStateChanged((user) => {
        //     if(user != null){
        //         console.log(user)
        //     }
        // })
        this.setState({isLoading: false})
    }

  render() {

    if(this.state.isLoading){
      return(
        <ImageBackground source={require('../../images/image2.jpg')}
        style = {{width:windowWidth, height:windowHeight}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
           <ActivityIndicator
      animating
      color="#fff"
      size="large"
      style={styles.activityIndicator}
    />
     </View>
    </ImageBackground>
      )
    }
    return (
      <View style={styles.container}>
      <ImageBackground source={require('../../images/image2.jpg')}
      style = {{width:windowWidth, height:windowHeight}}>
      <View style={styles.content}>
      <Text style={{color: '#ffffff', fontSize:50, fontWeight: 'bold', alignSelf:'center'}}>Welcome</Text>
      <View style={styles.loginFormstyle}>
      <TextInput style={styles.inputtextstyle}
      placeholder="Enter your email"
      placeholderTextColor="#ffffff"
      underlineColorAndroid="transparent"
      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      keyboardType = "email-address"
      returnKeyType = "next"
      onSubmitEditing = {() => this.passwordInput.focus()}
      ></TextInput>
      <TextInput style={styles.inputtextstyle}
       placeholder="Enter your password"
       placeholderTextColor="#ffffff"
       underlineColorAndroid="transparent"
       onChangeText={(password) => this.setState({password})}
      value={this.state.password}
      returnKeyType = "go"
      onSubmitEditing = {() => this.loginFirebase(this.state.email, this.state.password)}
      secureTextEntry
      ref = {(input) => this.passwordInput = input}
      ></TextInput>
      <TouchableOpacity style={styles.LoginButton}
      onPress = {() => this.loginFirebase(this.state.email, this.state.password)}
      ><Text style={styles.LoginTextstyle}>Login</Text></TouchableOpacity>
      <Text style={{color: '#ffffff', marginTop: 10, alignSelf: 'center', fontSize: 16,}}>or</Text>
      <TouchableOpacity style={styles.LoginButton2}
      onPress = {() => this.loginWithFacebook()}
      ><Text style={styles.LoginTextstyle}>Connect with Facebook</Text></TouchableOpacity>
      </View>
      <View style = {styles.signupContainer}>
      <Text style = {{color: '#ffffff'}}>Don't have an account? </Text>
      <TouchableOpacity
       onPress={() => this.props.navigation.push('Signup')}>
      {/* onPress = {() => this.signUpUser(this.state.email,this.state.password)}> */}
       <Text style={{color: '#2ecc71', fontSize: 15, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', 
       textShadowOffset: {width: -1, height: 1},textShadowRadius: 10}}>Signup!</Text></TouchableOpacity>
      </View>
      </View>
      </ImageBackground>
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Expo.Constants.statusBarHeight,
    },
    content:{
      marginTop: 70,
      justifyContent: 'center',
    },
    canvas: {
        width: windowWidth,
        height: windowHeight * 0.33
    },
    loginFormstyle: {
        marginTop: 30,
    },
    inputtextstyle:{
        height: 50,
        margin: 3,
        marginHorizontal: 40,
        padding: 10,
        backgroundColor: '#747d8c',
        borderRadius: 10,
        color: '#ffffff'
    },
    LoginButton:{
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9b59b6',
      marginHorizontal: 40,
      height: 50,
      borderRadius: 10,
    },
    LoginButton2:{
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2980b9',
      marginHorizontal: 40,
      height: 50,
      borderRadius: 10,
    },
    LoginTextstyle:{
      color: '#ffffff',
      fontWeight: 'bold',
    },
    signupContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
  });

const RootStack = createStackNavigator({
    Login: Login,
    Signup: Signup,
    Homepage: RootNavigation,

  }
);


export default RootStack;