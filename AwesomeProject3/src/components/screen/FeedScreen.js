import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
  ImageBackground,
  FlatList,
  Modal
} from 'react-native';
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import * as Progress from 'react-native-progress';

const ARTICLES = [
  { id: "1", uri: require('../../images/image.jpg'), 
  title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
  { id: "2", uri: require('../../images/image.jpg'),
   title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
  { id: "3", uri: require('../../images/image.jpg'),
   title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
  { id: "4", uri: require('../../images/image.jpg'),
   title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
  { id: "5", uri: require('../../images/image.jpg'),
   title: 'How to improve your english skill immediately', text: 'It plays a very important part in learning any language. Effective listening ensures understanding and it helps improve accuracy when speaking , among other things. How can you improve your listening skills? By listening actively, i.e. paying attention not only on what is said, but also how it is said. So, listen'},
]
const dataFeature = [
  {id: "LF1x9J1amxF8hrGCybP", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Get up to speed on Endlish for Work', date: '11/6/61 9.00'},
  {id: "LF1xJEirM6RZ3pRehqM", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Speaking for fun!', date: '11/6/61 9.00'},
  {id: "LF1xNs6BA8Ozcu8akq2", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Get up to speed on Endlish for Work', date: '11/6/61 9.00'},
  {id: "LF1xRnmrO-qTkr6nto2", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Speaking for fun!', date: '11/6/61 9.00'},
  {id: "LF1xWOcIQXNOopR341D", uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2Fimage.jpg?alt=media&token=cd0cb423-ecc4-4966-98d4-55cdeb3ef24f', title: 'Speaking for fun!', date: '11/6/61 9.00'},
]

const dataTips = [
  {id: "1", uri: require('../../images/icon_annou.png'), type: 'Announcement',
  title: 'Get up to speed on Endlish for Work', date: '11/6/61 9.00'},
  {id: "2", uri: require('../../images/icon_doc.png'), type: 'Document',
  title: 'Speaking for fun!', date: '11/6/61 9.00'},
  {id: "3", uri: require('../../images/icon_pen.png'), type: 'English',
  title: 'Get up to speed on Endlish for Work', date: '11/6/61 9.00'},
  {id: "4", uri: require('../../images/icon_quote.png'), type: 'Quote',
  title: 'Speaking for fun!', date: '11/6/61 9.00'},
]



const dataAds = []

const ARTICLES_length = ARTICLES.length;
const { height, width } = Dimensions.get('window')

export default class FeedScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.featuresRef = firebase.database().ref(`Data/Features`);
    this.tipsRef = firebase.database().ref(`Data/Tips`);
    this.AdsRef = firebase.database().ref(`Data/Ads`);
    this.state = {email: '' ,
                  cardIndex: 0,
                  user:null,
                  Modalopen : false,
                  loading: true,
                }
    
  } 

  componentDidMount(){
    // start listening for firebase updates
    this.listenForFeature(this.featuresRef);
    this.listenForTips(this.tipsRef);
    // user id from firebase
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`User/Firebase/${userId}/email`).on('value', snapshot => {
    this.setState({email: snapshot.val()})
 })
  }

  componentWillMount() {
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let userData = JSON.parse(user_data_json);
      this.setState({
        user: userData,
        active:'true',
      });
    });

    this.listenForAds(this.AdsRef);

  }



//swipe right of card swipe
swipeRight = () => {
  if(this.state.cardIndex < ARTICLES_length-1){
    this.setState({ cardIndex: this.state.cardIndex + 1 })
}else{
    this.swiper.goBackFromRight();
}
};


//swipe left of card swipe
swipeLeft = () => {
  console.log(this.state.cardIndex)
  if(this.state.cardIndex <= 0){

  }
  if (this.state.cardIndex === 0) {
    this.swiper.goBackFromRight();
  }
  if (this.state.cardIndex > 0) {
    this.setState({ cardIndex: this.state.cardIndex - 1 })
    this.swiper.goBackFromRight();
    this.swiper.goBackFromRight();
}

};

//key of flatlist
_keyExtractor = (item, index) => item._key;

renderItem(item){
  return(
  <View style = {{ flex: 1, marginBottom: 15, borderBottomWidth: 0.5, borderColor: '#c9c9c9',}}>
  <View style = {{ flex: 1, flexDirection: 'row', marginLeft:20, marginRight: 20, marginBottom: 15,}} >
  <Image source = {{uri: item.uri}} style={{ width:SCREEN_WIDTH* 0.15, height:SCREEN_WIDTH* 0.15,
    backgroundColor:'#fff', borderRadius:(SCREEN_WIDTH* 0.15)/2, marginLeft: 10,}}></Image>
  <View style = {{flex: 1, flexDirection: 'column', marginLeft: 10}}>

  <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>

  <View style = {{flex: 1,}}>
  <View style = {{borderColor: '#e67e22', borderRadius: 5, borderWidth: 2, width:57}}>
  <Text style = {{margin:2, color:'#e67e22', fontSize: 12,}}>Featured</Text>
  </View>
  </View>
  
  <View style = {{flex: 1, flexDirection: 'row', alignItems: 'baseline', alignSelf: 'flex-end'}}>
  <Text style = {{marginLeft:5, color:'#000000', fontSize: 12,}}>Posted :</Text>
  <Text style = {{margin:2, color:'#000000', fontSize: 12}}>{item.date}</Text>
  </View>

  </View>

  <Text style = {{fontSize: 14, fontWeight: 'bold', }}>{item.title}</Text>
  </View>
  </View>
  </View>
  )
}

//for get json data from firebase
listenForFeature(featuresRef) {
  featuresRef.on('value', (dataSnapshot) => {
    var tasks = [];
    dataSnapshot.forEach((child) => {
      tasks.push({
        title: child.val().title,
        uri: child.val().uri,
        date: child.val().date,
        _key: child.key
      });
    });

    this.setState({
      dataFeatures:tasks,
      loading: false,
    });
  });
  }

  listenForTips(tipsRef) {
    tipsRef.on('value', (dataSnapshot) => {
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          title: child.val().title,
          uri: child.val().uri,
          date: child.val().date,
          type: child.val().type,
          _key: child.key
        });
      });
  
      this.setState({
        dataTips:tasks,
        loading: false,
      });
    });
    }

    listenForAds(AdsRef) {
      AdsRef.on('value', (dataSnapshot) => {
        dataSnapshot.forEach((child) => {
          dataAds.push({
            title: child.val().title,
            uri: child.val().uri,
            date: child.val().date,
            _key: child.key
          });
        });
      });
    }

  //on close a modal swipe card
_onCloseModal = () => {
  this.setState({
    Modalopen: false,
    cardIndex: 0,
  })
}

//on open a modal swipe card
_pressRow = (rowID) => {
  this.setState({
    Modalopen: true
  })
}

getImageTypeTips = (type) => {
  switch (type) {
    case "Announcement":
        return (<Image resizeMode = 'stretch' source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2FtipsTypeImages%2Ficon_annou.png?alt=media&token=b15cf403-ed6e-4e7c-90d9-353035ee3399'}} style={{ width:25, height:25, borderRadius:(25/2),}}></Image>)
    case "Document":
        return (<Image resizeMode = 'stretch' source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2FtipsTypeImages%2Ficon_doc.png?alt=media&token=8932c2fd-739d-4a3e-b125-e90f80e6c8af'}} style={{ width:25, height:25, borderRadius:(25/2)}}></Image>)
    case "English":
        return (<Image resizeMode = 'stretch' source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2FtipsTypeImages%2Ficon_pen.png?alt=media&token=1e6623e2-fd87-41d7-a5c5-f13db5d0b10c'}} style={{ width:25, height:25, borderRadius:(25/2)}}></Image>)
    case "Quote":
        return (<Image resizeMode = 'stretch' source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/test-fb2a3.appspot.com/o/dataImages%2FtipsTypeImages%2Ficon_quote.png?alt=media&token=5b9cd387-6dd7-4183-aba3-ec4c1865e193'}} style={{ width:25, height:25, borderRadius:(25/2)}}></Image>)
}
}


//render flatlist of tips
renderItemTips(item){
  return(
  <TouchableHighlight onPress={() => this._pressRow(item.id)}>
  <View style = {{ flex: 1, marginBottom: 15, borderWidth:2, borderColor: '#515050', marginLeft:20, marginRight: 20, borderRadius: 25,}}>
  <View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 15, marginBottom: 15, marginLeft: 10, marginRight: 10}} >
  
  <View style = {{ flex: 1, flexDirection: 'row'}}>

  <View style = {{flex: 1,}}>
  <View style = {{ flex: 1, flexDirection: 'row', alignItems: 'baseline', alignSelf:'flex-start'}}>
  <View style={styles.viewIcon}>
  {this.getImageTypeTips(item.type)}
  </View>
  <Text style = {{marginLeft:5, color:'#e67e22', fontSize: 12,}}>{item.type}</Text>
  </View>
  </View>

  <View style = {{flex: 1, flexDirection: 'row', alignItems: 'baseline', position: 'absolute', right: 0}}>
  <Text style = {{marginLeft:5, color:'#000000', fontSize: 12,}}>Posted :</Text>
  <View style = {{ borderColor: '#000000', borderRadius: 5, borderWidth: 2, marginLeft:5}}>
  <Text style = {{margin:2, color:'#000000', fontSize: 12}}>{item.date}</Text>
  </View>
  </View>

  
  </View>
  <View style={{ flex:1}}>
  <Text style = {{marginLeft: 20, marginRight: 20, marginTop:3, fontSize: 14, fontWeight: 'bold',}}>{item.title}</Text>
  </View>

  </View>
  </View>
  </TouchableHighlight>
  )
}


  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
        transparent={true}
        animationType={'none'}
        visible={this.state.loading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={this.state.loading} />
          </View>
        </View>
      </Modal>
      <Modal style = {{flex:1, justifyContent: 'center'}} visible = {this.state.Modalopen} onRequestClose = {() => console.warn("this is close modal")}>
                <TouchableHighlight style = {{margin:10}} onPress ={this._onCloseModal}>
                <Image source = {require('../../images/icon_delete.png')}/>
                </TouchableHighlight>
                <View style = {{flex:1, justifyContent: 'center' , flexDirection: 'column', alignItems: 'center',}}>
                    <View style = {{flex:3,}}>
                        <CardStack
                        style={styles.content}
                        renderNoMoreCards={() => <Text style={{fontWeight:'700', fontSize:18, color:'gray'}}>No more cards :(</Text>}
                        disableTopSwipe
                        disableBottomSwipe
                        onSwipedLeft={this.swipeLeft}
                        onSwipedRight = {this.swipeRight}
                        verticalSwipe = {false}
                        ref={swiper => {
                          this.swiper = swiper
                        }}
                      >
                      {ARTICLES.map((item) => {
                        return (
                        <Card style={[styles.card, styles.card1]} key={item.id}>
                        <View style = {{ flexDirection: 'row', marginTop: 7, marginRight: SCREEN_WIDTH* 0.15 }}>
                        <Image source={require('../../images/icon_tips.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5, marginTop: 10, marginBottom:10, marginLeft:10}} />
                        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#000000', marginTop: 7, marginLeft: 3}}>{item.id} {item.title}</Text>
                        </View>
                        <ImageBackground source={item.uri} resizeMode={'stretch'} style={{ height: 120, width: SCREEN_WIDTH* 0.7, justifyContent:'center', alignSelf: 'center', marginTop: 7}}>
                        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#fff', marginHorizontal: 30, textAlign: 'center', 
                        textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>
                        {item.title}</Text>
                        </ImageBackground>
                  
                      <Text style = {{fontSize: 16, color: '#000000', marginHorizontal: SCREEN_WIDTH*0.05, marginTop: 5, marginBottom:15}}>{item.text}</Text>
                        </Card>
                      );
                    })}
                    </CardStack>
                    </View>

                    <View style={styles.buttonContainer}>
                    <View>
                      <Text style = {{fontSize: 14, fontWeight: 'bold', color: '#ff4d4d',}}>Prev</Text>
                      <TouchableOpacity style={[styles.button,styles.red]} onPress={()=>{
                        this.swiper.swipeLeft();
                      }}>
                        <Image source={require('../../images/icon_left.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                      </TouchableOpacity>
                      </View>
                      <View>
                      <Text style = {{fontSize: 14, fontWeight: 'bold', color: '#17c0eb', textAlign:'center',}}>{this.state.cardIndex +1 } / {ARTICLES_length}</Text>
                      <Progress.Bar progress={(this.state.cardIndex + 1)/ ARTICLES_length} width={SCREEN_WIDTH*0.5} height={15} style = {{alignSelf: 'center', marginTop:10}}/>
                      </View>
                      <View>
                      <Text style = {{fontSize: 14, fontWeight: 'bold', color: '#32ff7e',}}>Next</Text>
                      <TouchableOpacity style={[styles.button,styles.green]} onPress={()=>{
                        this.swiper.swipeRight();
                      }}>
                        <Image source={require('../../images/icon_right.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                      </TouchableOpacity>
                      </View>
                    </View>

                    </View>
                </Modal>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                { nativeEvent: { contentOffset: { y: this.scrollY } } }
                            ]
                        )}
                    >
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <Swiper height={200} autoplay showsButtons dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 3, marginLeft: 7, marginRight: 7}} />}
          activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 3, marginLeft: 7, marginRight: 7}} />}
          paginationStyle={{
            bottom: 10
          }}>
                        {dataFeature.map((item) => {
                          return (
                        <View style={styles.slide1} key={item.id}>
                        <ImageBackground source = {{uri: item.uri}} resizeMode={'cover'} style = {{width:width, height:230, justifyContent:'center', alignItems: 'center',}}>
                        <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#fff', marginHorizontal: 30, textAlign: 'center', 
                        textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>{item.title}</Text>
                        </ImageBackground>
                        </View>
                          );
                        })}
                        </Swiper>
                          <View style = {{flex:1, justifyContent: 'center', marginTop:15}}>
                        <FlatList data = {this.state.dataFeatures} keyExtractor={this._keyExtractor}
                        renderItem = {({item}) => this.renderItem(item)} />
                        </View>
                        <View style = {{flex:1, justifyContent: 'center', borderBottomColor: '#c9c9c9', borderBottomWidth: 0.5}}>
                        <FlatList data = {this.state.dataTips} keyExtractor={this._keyExtractor}
                        renderItem = {({item}) => this.renderItemTips(item)} />
                        </View>
                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    Introducing Airbnb Plus
                                </Text>
                                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                                    A new selection of homes verified for quality & comfort

                                </Text>
                                <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../../images/image.jpg')}
                                    />

                                </View>
                                <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../../images/image.jpg')}
                                    />

                                </View>
                        </View>
                    </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
    );
  }
}

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    width: SCREEN_WIDTH* 0.8,
    height: SCREEN_HEIGHT* 0.7,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#000000',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  card1: {
    backgroundColor: '#fff',
    borderColor: '#000000',
    borderWidth: 0.5,
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  buttonContainer:{
    width:SCREEN_WIDTH*0.8,
    height: SCREEN_HEIGHT* 0.125,
    flexDirection:'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  },
  green:{
    width:SCREEN_WIDTH* 0.125,
    height:SCREEN_WIDTH* 0.125,
    backgroundColor:'#fff',
    borderRadius:(SCREEN_WIDTH* 0.125)/2,
    borderWidth:3,
    borderColor:'#17c0eb',
  },
  viewIcon:{
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:35,
    height:35,
    backgroundColor:'#fff',
    borderRadius:(35/2),
    borderWidth:2,
    borderColor:'transparent',
    overflow: 'hidden',
  },
  red:{
    width:SCREEN_WIDTH* 0.125,
    height:SCREEN_WIDTH* 0.125,
    backgroundColor:'#fff',
    borderRadius:(SCREEN_WIDTH* 0.125)/2,
    borderWidth:3,
    borderColor:'#17c0eb',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
