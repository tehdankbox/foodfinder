import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import IconeVoltar from "../assets/backIconRed.png"
import MapPin from "../assets/mapPin.png"
import IconPhone from "../assets/phoneIcon.png"
import IconStar from "../assets/starIcon.png"

import ItemComponent from './ItemComponent'

import { db } from '../config';
let foodRef = db.ref('/food/');

export default class FoodScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: [],
    };
  }
  componentDidMount() {
    foodRef.on('value', snapshot => {
      let data = snapshot.val();
      let food = Object.values(data);
      this.setState({ food });
    });
  }

  render() {
    const { navigation } = this.props;
    const foodId = navigation.getParam('foodId', '');
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact', { locationId: locationId })}>
            <Image source={IconPhone} style={styles.upperBarIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={IconStar} style={styles.upperBarIcon}/>
          </TouchableOpacity>
        </View>
          <View style={styles.comidaImgContainer}>
              <Image source={{uri:"https://firebasestorage.googleapis.com/v0/b/foodfinder-rn.appspot.com/o/food%2Ffood"+foodId+".png?alt=media"}} style={styles.comidaImg}/>
          </View>
          <View style={styles.txtNomeContainer}>
          <ItemComponent id={foodId} type={"foodName"} items={this.state.food} navigation={this.props.navigation}/>
          <ItemComponent id={foodId} type={"foodPrice"} items={this.state.food} navigation={this.props.navigation}/>
          </View>

          <View style={styles.lista}>
            <Text style={styles.listaTxt}>Ingredientes</Text>
          </View>

          <View style={styles.ingredientes}>
            <ItemComponent id={foodId} type={"foodIngredients"} items={this.state.food} navigation={this.props.navigation}/>
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

    comidaImgContainer: {
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: '#720505',
        marginVertical: 20,
    },

    comidaImg: {
        width: 250,
        height: 250,
    },

    txtNomeContainer: {
        marginTop: 0,
    },

    txtNome: {
        fontSize: 21,
        textAlign: 'center',
        backgroundColor: "#f1f1f1",
        paddingVertical: 5,
    },

    txtInfo: {
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: "#e8e8e8",
        paddingVertical: 5,
        marginBottom: 20,
    },

    lista: {
      borderTopWidth: 2,
      borderColor: '#720505',
      backgroundColor: '#a90f0f',
      alignItems: 'center',
      justifyContent: 'center'
    },

    listaTxt: {
      color: 'white',
      fontSize: 30,
      paddingBottom: 5,
    },

    ingredientes: {
        borderTopWidth: 3,
        borderTopColor: '#4f0000',
        borderBottomWidth: 3,
        borderBottomColor: '#4f0000',
    },
});
