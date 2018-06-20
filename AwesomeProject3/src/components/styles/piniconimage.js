import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PinIconImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        };
    }


  render() {
    const { favorite } = this.state;
    return (
        // <Icon name = {this.props.name}
        // size = {13}
        // style = {{ padding: 10 }}
        // color = {this.props.press ? 'red' : '#000'}  
        //    />
        <Icon
                        name={favorite ? 'heart' : 'heart-o'}
                        color={favorite ? '#F44336' : 'rgb(50, 50, 50)'}
                        size={16}
                        style={{ padding: 10 }}
                        onPress={() => this.setState({ favorite: !favorite })}
                    />
    );
  }
}