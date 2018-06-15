import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default class ScheduleScreen extends React.Component {
  static navigationOptions = {
    title: 'Schedule',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
