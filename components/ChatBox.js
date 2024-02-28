import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[
          {width: '50%', margin:5,},
          this.props.isUser === true
            ? [
                {alignSelf: 'flex-end', backgroundColor: 'black'},
                styles.borderLeftVerticalRadius,
              ]
            : [
                {
                  alignSelf: 'flex-start',
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 2,
                },
                styles.borderRightVerticalRadius,
              ],
        ]}>
        <Text
          style={[
            {fontSize: 20, left: 10},
            this.props.isUser === true ? {color: 'white'} : {color: 'black'},
          ]}>
          {this.props.message}
        </Text>
      </View>
    );
  }
}

export default ChatBox;
