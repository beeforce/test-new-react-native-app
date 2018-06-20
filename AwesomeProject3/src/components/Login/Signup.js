import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Dimensions, ImageBackground, Platform, SafeAreaView  } from 'react-native'
import * as firebase from 'firebase';


//timezone
var moment = require('moment-timezone');


class Signup extends Component {

  static navigationOptions = {
    title: 'Signup',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillMount() {
    setInterval( () => {
      this.setState({
        curTime : moment().tz("Asia/Bangkok").format()
      })
    },1000)
  }

    constructor(props) {
        super(props);
        this.state = { email: '' };
        this.state = { password: ''};
        this.state = { repassword: ''};
        this.state = { isLoading: true};
      }

    signUpUser = (email, password) =>{
        if(this.validate(email) && this.state.password.length > 6){
        try {
          firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=> {
            firebase.auth().onAuthStateChanged((user) => {
                  if(user != null){
                      console.log(user)
                      firebase.database().ref('User').child('Firebase').child(user.uid).set({
                      email: user.email,
                      create_time: this.state.curTime,
                      });
                      {this.loginFirebase(this.state.email, this.state.password)}
                    }
                  })
          })
        } catch (error) {
            console.log(error.toString());
        }
      }else{
          console.log("Email is not correct");
      }
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
        if(reg.test(text) === false){
          return false;
        }
        else {
          return true;
        }
      }
  

    render() {
      return (
        <View style = {styles.container}>
        <ImageBackground source={require('../../images/image2.jpg')}
        style = {{width:windowWidth, height:windowHeight}}>
        <View style = {{marginTop:15}}>
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
            returnKeyType = "next"
            onSubmitEditing = {() => this.repasswordInput.focus()}
            secureTextEntry
            ref = {(input) => this.passwordInput = input}
            ></TextInput>
            <TextInput style={styles.inputtextstyle}
            placeholder="Enter your password again"
            placeholderTextColor="#ffffff"
            underlineColorAndroid="transparent"
            onChangeText={(repassword) => this.setState({repassword})}
            value={this.state.repassword}
            returnKeyType = "go"
            secureTextEntry
            ref = {(input) => this.repasswordInput = input}
            ></TextInput>
            </View>
            <View style = {{marginTop:15}}>
            <TouchableOpacity style={styles.LoginButton}
            onPress = {() => this.signUpUser(this.state.email, this.state.password)}
            ><Text style={styles.LoginTextstyle}>Sign up!</Text></TouchableOpacity>
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
      backgroundColor: '#7bed9f',
    },
    inputtextstyle:{
        marginTop: 10,
        height: 50,
        marginHorizontal: 40,
        paddingLeft: 10,
        backgroundColor: '#2ed573',
        color: '#ffffff',
        borderRadius: 10,
        fontSize: 16,
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
    LoginTextstyle:{
      color: '#ffffff',
      fontWeight: 'bold',
    },
});

export default Signup;