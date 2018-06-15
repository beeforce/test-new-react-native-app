import React from 'react';
import { ScrollView, StyleSheet, Button, View, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import * as Progress from 'react-native-progress';

export default class VIPsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: "#fff",
    marginTop: Expo.Constants.statusBarHeight,
  },
});
