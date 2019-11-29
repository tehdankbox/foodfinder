import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import IconeVoltar from "../assets/backIconRed.png"
import MapPin from "../assets/mapPin.png"
import IconPhone from "../assets/phoneIconUsed.png"
import IconStar from "../assets/starIcon.png"

import ItemComponent from './ItemComponent'

import { db } from '../config';
let itemsRef = db.ref('/locations/');

export default class ContactScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  render() {
    const { navigation } = this.props;
    const locationId = navigation.getParam('locationId', '');

    return (
      <ScrollView style={styles.conteudo}>
        <View style={styles.upperBar}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={IconeVoltar} style={styles.upperBarIcon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <Image source={MapPin} style={styles.upperBarIcon}/>
          </TouchableOpacity>
          <View>
            <Image source={IconPhone} style={styles.upperBarIcon}/>
          </View>
          <TouchableOpacity>
            <Image source={IconStar} style={styles.upperBarIcon}/>
          </TouchableOpacity>
        </View>
          <View style={styles.txtNomeContainer}>
            <View style={styles.nameDecoration}>
              <ItemComponent id={locationId} type={"conName"} items={this.state.items} navigation={this.props.navigation} />
            </View>
            <View style={styles.infoDecoration}>
                <ItemComponent id={locationId} type={"conPhone"} items={this.state.items} navigation={this.props.navigation}/>
              <View style={styles.divUnderline}></View>
                <ItemComponent id={locationId} type={"conWpp"} items={this.state.items} navigation={this.props.navigation}/>
              <View style={styles.divUnderline}></View>
                <ItemComponent id={locationId} type={"conEmail"} items={this.state.items} navigation={this.props.navigation}/>
              <View style={styles.divUnderlineUltima}></View>
            </View>
          </View>

          {/*
          <View style={styles.lista}>
            <Text style={styles.listaTxt}>Ingredientes</Text>
          </View>

          <View style={styles.ingredientes}>
            <ItemComponent id={locationId} type={"foodIngredients"} items={this.state.items} navigation={this.props.navigation}/>
          </View>
          */}
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

    upperBar: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignContent: 'center',
      backgroundColor: '#a90f0f',
    },

    upperBarIcon: {
      width:60,
      flex:1,
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
