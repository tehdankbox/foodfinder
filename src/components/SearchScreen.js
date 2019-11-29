import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, ScrollView, TextInput } from "react-native";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    };
  }
  handleChange = e => {
    this.setState({
      search: e.nativeEvent.text
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.conteudo}>
          <View style={styles.txtNomeContainer}>
            <View style={styles.nameDecoration}>
              <TextInput
                placeholder={"Nome do alimento"}
                style={styles.TextInput}
                onChange={this.handleChange}
              />

              <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Result', {search: this.state.search})} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.buttonSearch}>
                  <Text style={styles.buttonText}>Pesquisar</Text>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.buttonCancel}>
                  <Text style={styles.buttonText}>Retornar</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            {/*
              <View style={styles.infoDecoration}>
              <View style={styles.divUnderlineUltima}></View>
            </View>
            */}
          </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
    conteudo: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white',
    },

    TextInput:{
      width: 350,
      height: 50,
      padding: 4,
      marginVertical: 10,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      backgroundColor: '#d62a2a',
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
        paddingTop: 10,
        alignItems: 'center',
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
