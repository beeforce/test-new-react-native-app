// import React, { Component } from 'react'
// import { Text, StyleSheet, View, Button, Image } from 'react-native'
// import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import RootNavigation from '../navigation/RootNavigation';

export default class Homepage extends Component {

  render() {
  return (
    <View style={styles.container}>
      <RootNavigation />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    userImage: {
      height: 100,
      width: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
});
