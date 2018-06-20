// import React, { Component } from 'react'
// import { Text, StyleSheet, View, Button, Image } from 'react-native'
// import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';
import RootNavigation from '../navigation/RootNavigation';

export default class Homepage extends Component {

  render() {
    if (Platform.OS === 'ios'){
      return (
        <SafeAreaView style={styles.container}>
          <RootNavigation />
        </SafeAreaView>
      );
    }else{
      return (
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight}}>
          <RootNavigation />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
