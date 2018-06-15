import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,

  
} from 'react-native';
import * as firebase from 'firebase';




export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };




//   componentDidMount() {
//     firebase.database().ref(`Data/Ads`).push().set({
//       title: "Ads 1",
//       date: "15/06/2018",
//       uri: "https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2FtipsTypeImages%2Fads.jpg?alt=media&token=b034a2d4-9964-4f93-a17c-b1b3c4cbf26d",
//     });
// }


  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Expo.Constants.statusBarHeight,
  },
});
