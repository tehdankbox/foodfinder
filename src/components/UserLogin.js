import React from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as FirebaseAPI from '../modules/firebaseAPI';

import { db } from '../config';

let addItem = item => {
  db.ref('/testes/').push({
    name: item
  });
};
export default class AddItem extends React.Component {
    static navigationOptions = {
        title: 'Reeeeee',
    };

    state = {
      name: ''
    };

    handleChange = e => {
      this.setState({
        name: e.nativeEvent.text
      });
    };
    handleSubmit = () => {
      addItem(this.state.name);
    };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login de SuuSuário</Text>
        <TextInput
          style={styles.TextInput}
          onChange={this.handleChange}
        />
        <TouchableOpacity
          onPress={this.handleSubmit}>
          <View>
            <Text>Submit</Text>
          </View>
        </TouchableOpacity>
        <Button
          title="Retornar ao mapa"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInput:{
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'gray'
  },
})
