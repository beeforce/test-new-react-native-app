import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar  } from 'react-native';
import Expo from 'expo';
import Setup from './src/boot/Setup';

export default class App extends React.Component {
  render() {
    return (
     <Setup />
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e67e22',
    paddingTop: Expo.Constants.statusBarHeight,
  },
});
