import React from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI';

import Icon from '../assets/icon.png';

export default class SplashScreen extends React.Component {
  state = {
    name: '',
    locations: []
  };

  constructor(props: Object) {
    super(props);
    this.state ={ timer: 1}
  }

  componentDidMount(){
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
      1000
    );

  }

  componentDidUpdate(){
    if(this.state.timer === 0){
      clearInterval(this.interval);
      this.goHome();
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  goHome = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.splashStyle}>
        <View>
          <Image source={Icon} style={styles.splashImage}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashStyle: {
    backgroundColor: '#E50000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  splashImage: {
    height: 250,
    width: 250
  }


})
