import * as Expo from "expo";
import React, { Component } from "react";
import  { SafeAreaView, ActivityIndicator, Platform, StatusBar, View } from 'react-native';
import RootStack from '../components/Login/Login';


class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
        Roboto_Regular: require('../main/assets/fonts/Roboto-Regular.ttf'),
        Roboto_medium: require('../main/assets/fonts/Roboto-Medium.ttf'),
        icomoon: require('../main/assets/fonts/icomoon.ttf'),
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator size="large" color="#0000ff" style = {{ alignSelf: 'center' , flex: 1}} />;
    }
    if (Platform.OS === 'ios'){
      return (
        <SafeAreaView style = {{ flex:1}}>
        <RootStack />
        </SafeAreaView>
      );
    }else{
      return (
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight}}>
          <RootStack />
          </View>
      );
    }
  }
}
export default Setup