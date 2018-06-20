import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
import * as firebase from 'firebase';
import Swiper from 'react-native-deck-swiper'
import { CardViewWithImage, CardView } from 'react-native-simple-card-view';




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
      <CardViewWithImage
        width={300}
        content={ 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut distinctio!' }
        source={ {uri: 'https://placeimg.com/640/480/tech'} }
        title={ 'Hello World!' }
        imageWidth={ 100 }
        imageHeight={ 100 }
        roundedImage={ true }
        roundedImageValue={ 50 }
        imageMargin={ {top: 10} }
    />
    <CardView>
    <View>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis dolores eos ipsam nulla
            numquam officia provident repellat suscipit. Impedit itaque natus obcaecati odit quas recusandae. Deserunt
            ipsam iusto molestiae!
        </Text>
        </View>
    </CardView>
      </View>
    );
  }
}

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  card: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    alignItems: 'center',
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});
