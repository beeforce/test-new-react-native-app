import React from 'react';
import { StyleSheet, View, Text , Dimensions, Image, } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
}

render() {
    return (
        <View style={styles.container}>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
});
