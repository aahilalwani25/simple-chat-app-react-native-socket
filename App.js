/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import styles from './styles';
import ChatBox from './components/ChatBox';
import socket from './components/socket';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user_message:'',
      chats:[],  //chats array with object:{message:'',isUser:''}
    };
  }

  onSend(user_message){
    this.setState({
      chats:[...this.state.chats,{message:user_message,isUser:true}]
    })
    socket.send(user_message);
  }

  componentDidMount() {
    socket.on('connect',()=>{

      // if(socket.connected){
        console.log('client is connected to the server: ',socket.id);
        socket.on('message',(message)=>{
          this.setState({
            chats:[...this.state.chats,{message:message,isUser:false}]
          })
        });
      //}
    });
  }

  

  render() {
    return (
      <View style={[styles.backgroundColor, styles.full_screen]}>
        <View
          style={[
            {backgroundColor: 'black', height: '7%', justifyContent: 'center'},
            styles.borderBottomRadius,
          ]}>
          <Text style={{fontSize: 30, justifyContent: 'center', left: 10}}>
            Chat Application
          </Text>
        </View>

        <FlatList
          data={this.state.chats}

          renderItem={item => (
            <View>
              <ChatBox message={item.item.message} isUser={item.item.isUser} />
            </View>
          )}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            bottom: 10,
          }}>
          <TextInput
            onChangeText={(text)=>this.setState({user_message:text})}
            style={{
              borderRadius: 20,
              borderWidth: 2,
              width: '70%',
              color: 'black',
            }}
            placeholder="Enter a message"
            placeholderTextColor={'grey'}
          />
          <TouchableOpacity
            onPress={() => this.onSend(this.state.user_message)}
            style={{
              backgroundColor: 'black',
              width: '20%',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
