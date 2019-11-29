import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, ScrollView, TextInput } from "react-native";

import ResultComponent from './ResultComponent'

import { db } from '../config';
let foodRef = db.ref('/food/');
let locationsRef = db.ref('/locations/');

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: [],
      locations: [],
      search: ''
    };
  }
  componentDidMount() {
    foodRef.on('value', snapshot => {
      let data = snapshot.val();
      let food = Object.values(data);
      this.setState({ food });
    });
    locationsRef.on('value', snapshot => {
      let data = snapshot.val();
      let locations = Object.values(data);
      this.setState({ locations });
    });
  }
  handleChange = e => {
    this.setState({
      search: e.nativeEvent.text
    });
  };

  render() {
    const { navigation } = this.props;
    const search = navigation.getParam('search', '');

    return (
      <ScrollView style={styles.conteudo}>
          <View style={styles.bigContainer}>
            <View style={styles.nameDecoration}>
              <View style={styles.textInput}>
                <Text style={styles.resultText}>{search}</Text>
              </View>

              <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.buttonCancel}>
                  <Text style={styles.buttonText}>Retornar</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.infoDecoration}>
              <ResultComponent food={this.state.food} locations={this.state.locations} name={search} navigation={this.props.navigation}/>
            </View>
          </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
    conteudo: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#f1f1f1',
    },

    textInput:{
      minWidth: 150,
      height: 50,
      padding: 8,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#2b2b2b',
      borderRadius: 4,
      backgroundColor: '#787878',
    },

    resultText:{
      fontSize: 23,
      color: 'white',
      textAlign: 'center',
    },

    buttonSearch:{
      width: 175,
      height: 50,
      padding: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 4,
      backgroundColor: '#d20b0b',
    },

    buttonCancel:{
      width: 125,
      height: 50,
      padding: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 4,
      backgroundColor: '#d20b0b',
    },

    buttonText:{
      fontSize: 23,
      color: 'white',
      textAlign: 'center',
    },

    infoContatos: {
        paddingBottom: 25,
    },

    nameDecoration: {
        backgroundColor: "#a90f0f",
        alignItems: 'center',
        //marginBottom: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#720505',
    },

    infoDecoration: {
        paddingTop: 0,
        backgroundColor: "#f1f1f1",
    },

    divUnderline: {
      borderBottomWidth: 3,
      borderBottomColor: 'lightgray',
      width: "100%",
      marginTop: 5,
      marginBottom: 5,
    },

    divUnderlineUltima: {
      borderBottomWidth: 3,
      borderBottomColor: 'lightgray',
      width: "100%",
    },
});
