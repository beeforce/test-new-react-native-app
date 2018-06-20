import React, {Component} from 'react'
import  { StyleSheet, View, Image, Text, Dimensions, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import Signup from '../Login/Signup';
import RootNavigation from '../navigation/RootNavigation';
import { Button } from 'react-native-elements';
import AwesomeButton from 'react-native-really-awesome-button/src/themes/rick';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);


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
    this.state = { isLoading: false};
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
    
  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
           <ActivityIndicator size="large" color="#0000ff" style = {{ alignSelf: 'center' , flex: 1}} />
     </View>
      )
    }
    return (
      // <View style={styles.container}>
      // <View style={styles.contentContainer}>
      // <Image source = {require('../../images/logo_app.png')}
      //         resizeMode={'stretch'}
      //         style = {{ width:windowWidth * 0.7, height: windowHeight * 0.2, alignSelf: 'center', marginTop:40 }}
      //         ></Image>
      // <View style={styles.content}>
      // <View style={styles.searchSection}>
      // <Icon name="envelop" style={{ paddingRight: 10, }} size={25} color = '#2c3e50'/>
      // <TextInput style={styles.inputtextstyle}
      // placeholder="Email Address"
      // placeholderTextColor="#2c3e50"
      // underlineColorAndroid="transparent"
      // onChangeText={(email) => this.setState({email})}
      // value={this.state.email}
      // keyboardType = "email-address"
      // returnKeyType = "next"
      // onSubmitEditing = {() => this.passwordInput.focus()}
      // ></TextInput>
      // </View>
      // <View style={styles.searchSection}>
      // <Icon name="keyboard" style={{ paddingRight: 10,}} size={25} color = '#2c3e50'/>
      // <TextInput style={styles.inputtextstyle}
      //  placeholder="Password"
      //  placeholderTextColor="#2c3e50"
      //  underlineColorAndroid="transparent"
      //  onChangeText={(password) => this.setState({password})}
      // value={this.state.password}
      // returnKeyType = "go"
      // onSubmitEditing = {() => this.loginFirebase(this.state.email, this.state.password)}
      // secureTextEntry
      // ref = {(input) => this.passwordInput = input}
      // ></TextInput>
      // </View>
      // <TouchableOpacity style={styles.LoginButton}
      // onPress = {() => this.loginFirebase(this.state.email, this.state.password)}
      // ><Text style={styles.LoginTextstyle}>Login</Text></TouchableOpacity>
      // <TouchableOpacity style={styles.LoginButton2}
      // onPress = {() => this.loginWithFacebook()}
      // ><Text style={styles.LoginTextstyle}>Connect with Facebook</Text></TouchableOpacity>
      // <View style = {styles.signupContainer}>
      // <Text style = {{color: '#ffffff'}}>Don't have an account? </Text>
      // </View>
      // </View>
      // </View>
      // <View style={styles.footer}>
      // <View style = {{flexDirection: 'row', justifyContent: 'space-between'}} >
      // <TouchableOpacity>
      //  <Text style={{color: '#c44569', fontSize: 16, fontFamily: 'Roboto_Regular', paddingLeft:15, paddingBottom: 20}}>Forget Password</Text></TouchableOpacity>
      // <TouchableOpacity
      //  onPress={() => this.props.navigation.push('Signup')}>
      //  <Text style={{color: '#c44569', fontSize: 16, fontFamily: 'Roboto_Regular', paddingRight:15, paddingBottom: 20}}>Create Account</Text></TouchableOpacity>
      //  {/* <Text style={{color: '#2ecc71', fontSize: 15, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', 
      //  textShadowOffset: {width: -1, height: 1},textShadowRadius: 10}}>Signup!</Text></TouchableOpacity> */}
      // </View>
      // </View>
      // </View>
      <View style = {{flex:1, backgroundColor: '#ffffff'}}>
      <View style={styles.contentContainer}>
        <View style = {{flexDirection: 'column'}}>
        <View style={styles.container} >
          <View style={styles.background} >
            <View style={styles.image}>
      <Image source = {require('../../images/logo_app.png')}
              resizeMode={'stretch'}
              style = {{ width:windowWidth * 0.7, height: windowHeight * 0.2, alignSelf: 'center', marginTop:40 }}
              ></Image>
      <View style={styles.content}>
      <View style={styles.searchSection}>
      <Icon name="envelop" style={{ paddingRight: 10, }} size={25} color = '#2c3e50'/>
      <TextInput style={styles.inputtextstyle}
      placeholder="Email Address"
      placeholderTextColor="#2c3e50"
      underlineColorAndroid="transparent"
      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      keyboardType = "email-address"
      returnKeyType = "next"
      onSubmitEditing = {() => this.passwordInput.focus()}
      ></TextInput>
      </View>
      <View style={styles.searchSection}>
      <Icon name="keyboard" style={{ paddingRight: 10,}} size={25} color = '#2c3e50'/>
      <TextInput style={styles.inputtextstyle}
       placeholder="Password"
       placeholderTextColor="#2c3e50"
       underlineColorAndroid="transparent"
       onChangeText={(password) => this.setState({password})}
      value={this.state.password}
      returnKeyType = "go"
      onSubmitEditing = {() => this.loginFirebase(this.state.email, this.state.password)}
      secureTextEntry
      ref = {(input) => this.passwordInput = input}
      ></TextInput>
      </View>
      <AwesomeButton
          style={styles.LoginButton}
          type="anchor"
          width={ windowWidth * 0.75}
          textColor="#fff"
          onPress = {() => this.loginFirebase(this.state.email, this.state.password)}
        >
          Login
        </AwesomeButton>
      {/* <TouchableOpacity style={styles.LoginButton}
      onPress = {() => this.loginFirebase(this.state.email, this.state.password)}
      ><Text style={styles.LoginTextstyle}>Login</Text></TouchableOpacity> */}
      <Text style = {{color:'#2c3e50', alignSelf: 'center', paddingTop: 10, fontFamily: 'Roboto_medium', fontSize: 15, fontWeight: 'bold'}}>OR</Text>
      </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.LoginButton2}
          onPress = {() => this.loginWithFacebook()}
          >
          <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Icon name="facebook" style={{ paddingRight: 10,}} size={20} color = '#fff'/>
          <Text style={styles.LoginTextstyle}>Connect with Facebook</Text>
          </View>
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.footer}>
        <View style = {{flexDirection: 'row', justifyContent: 'space-between'}} >
        <TouchableOpacity>
        <Text style={{color: '#c44569', fontSize: 16, fontFamily: 'Roboto_Regular', paddingLeft:15, paddingBottom: 20}}>Forget Password</Text></TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.props.navigation.push('Signup')}>
        <Text style={{color: '#c44569', fontSize: 16, fontFamily: 'Roboto_Regular', paddingRight:15, paddingBottom: 20}}>Create Account</Text></TouchableOpacity>
        {/* <Text style={{color: '#2ecc71', fontSize: 15, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: {width: -1, height: 1},textShadowRadius: 10}}>Signup!</Text></TouchableOpacity> */}
        </View>
      </View>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
    
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: windowWidth,
    overflow: 'hidden',
    margin: 10,
    height: windowHeight * 0.73,
  },
  background: {
    borderRadius: (windowHeight+windowWidth) /2,
    width: windowWidth + 200,
    height: windowHeight,
    marginLeft: -100,
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
  },
  image: {
    height: windowHeight * 0.73,
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
    marginLeft: 100,
    backgroundColor: '#f2f2f2'
  },
  contentContainer:{
    flex:1
  },
    content:{
      marginTop: 40
    },
    canvas: {
        width: windowWidth,
        height: windowHeight * 0.33
    },
    searchSection: {
      flexDirection: 'row',
      alignItems: 'baseline',
      height: 50,
      margin: 3,
      marginHorizontal: 40,
      borderBottomWidth: 0.5, 
      borderColor: '#3d3d3d',
    },
    inputtextstyle:{
      flex: 1,
      paddingTop: 10,
      paddingLeft: 7,
      fontSize: 16,
      fontFamily: 'Roboto_medium'
    },
    LoginButton:{
      marginTop: 30,
      alignSelf: 'center',
      height: 55,
    },
    LoginButton2:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2980b9',
      marginHorizontal: 40,
      height: 55,
      borderRadius: 27,
    },
    LoginTextstyle:{
      color: '#ffffff',
      fontWeight: 'bold',
    },
  });

const RootStack = createStackNavigator({
    Login: Login,
    Signup: Signup,
    Homepage: RootNavigation,

  }
);


export default RootStack;