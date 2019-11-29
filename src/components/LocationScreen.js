import React, { Component } from "react";
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView } from "react-native";
import ItemComponent from './ItemComponent';

import IconeVoltar from "../assets/backIconRed.png";
import MapPin from "../assets/mapPin.png";
import IconPhone from "../assets/phoneIcon.png";
import IconStar from "../assets/starIcon.png";
import ArrowDown from "../assets/arrowBlackDown.png";
import ArrowUp from "../assets/arrowBlackUp.png";

import { db } from '../config';
let itemsRef = db.ref('/locations/');
let foodRef = db.ref('/food/');
let drinkRef = db.ref('/drink/');

export default class LocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'Location'),
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      categorias: [0, 0],
      items: [],
      food: [],
    };
  }

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
    foodRef.on('value', snapshot => {
      let data = snapshot.val();
      let food = Object.values(data);
      this.setState({ food });
    });
    drinkRef.on('value', snapshot => {
      let data = snapshot.val();
      let drink = Object.values(data);
      this.setState({ drink });
    });
  }

  onUpdateItem = i => {
   this.setState(state => {
     const categorias = state.categorias.map((valor, index) => {
       if (i == index) {
         if(valor == 1){
           return 0;
         }
         else {
           return 1;
         }
       }
       else{
          return valor;
       }
   });

     return {
       categorias,
     };
   });
 };

 renderSeta(index){
  if(this.state.categorias[index]) {
    return(<Image source={ArrowUp} style={styles.categoriaSeta}/>);
  }
  else {
    return(<Image source={ArrowDown} style={styles.categoriaSeta}/>);
  }
 }

  renderCategorias(index, locationId){
    switch (index) {
      case 0:
        if(this.state.categorias[index]) {
            return (
              <View style={styles.cardapioItemLinha}>
                <ItemComponent id={locationId} type={"cardapio"} items={this.state.food} navigation={this.props.navigation} />
              </View>
            )
        }
        break;
      case 1:
        if(this.state.categorias[index]){
          return(
            <View style={styles.cardapioItemLinha}>
              <ItemComponent id={locationId} type={"bebidas"} items={this.state.drink} navigation={this.props.navigation} />
            </View>
          )
        }
        break;
    }
  }

  showHambButton = () => {
    if(this.state.showHamb)
      this.setState({showHamb:false});
    else
      this.setState({showHamb:true});
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact', { locationId: locationId })}>
            <Image source={IconPhone} style={styles.upperBarIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={IconStar} style={styles.upperBarIcon}/>
          </TouchableOpacity>
        </View>

        <View style={styles.viewImg}>
          <Image source={{uri:"https://firebasestorage.googleapis.com/v0/b/foodfinder-rn.appspot.com/o/locations%2Flocation"+locationId+".png?alt=media"}} style={styles.imgRestaurante}/>
        </View>
        <View style={styles.txtInfo}>
          <View style={styles.viewTxt}>
            <ItemComponent id={locationId} type={"locName"} items={this.state.items} navigation={this.props.navigation}/>
            <ItemComponent id={locationId} type={"locPlace"} items={this.state.items} navigation={this.props.navigation}/>
          </View>
          <View style={styles.tipo}>
            <ItemComponent id={locationId} type={"locSpec"} items={this.state.items} navigation={this.props.navigation}/>
          </View>
        </View>
        <View style={styles.lista}>
          <Text style={styles.listaTxt}>Cardápio</Text>
        </View>
        <View style={styles.cardapio}>
          <TouchableNativeFeedback onPress={() => this.onUpdateItem(0)}>
            <View style={styles.categoria}>
              <Text style={styles.categoriaTxt}>
                Alimentos
              </Text>
              {this.renderSeta(0)}
            </View>
          </TouchableNativeFeedback>

          {this.renderCategorias(0, locationId)}

          <TouchableNativeFeedback onPress={() => this.onUpdateItem(1)}>
            <View style={styles.categoria}>
              <Text style={styles.categoriaTxt}>
                Bebidas
              </Text>
              {this.renderSeta(1)}
            </View>
          </TouchableNativeFeedback>

          {this.renderCategorias(1, locationId)}

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    conteudo: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#DDDDDD',
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

    imgRestaurante: {
      width: 412,
      height: 250,
    },

    IconVoltar: {
      width: 65,
      height: 65,
    },

    viewImg: {
      borderBottomWidth: 3,
      borderBottomColor: '#720505',
    },

    viewTxt: {
      backgroundColor: '#a90f0f',
      flexDirection: 'column',
    },

    restNome: {
      fontSize: 30,
      color: 'white',
      paddingLeft: 7,
    },

    restLocal: {
      fontSize: 20,
      color: 'white',
      paddingLeft: 7,
      width: 308,
      marginBottom: 10,
    },

    txtInfo: {
      flexDirection: 'row',
      backgroundColor: '#a90f0f',
      borderBottomWidth: 3,
      borderBottomColor: '#720505',
    },

    tipo: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#880000',
      justifyContent: 'center',
    },

    LogoRest: {
      width: 70,
      height: 70,
    },

    tipoTxt: {
      color: 'white',
    },

    lista: {
      backgroundColor: '#a90f0f',
      borderBottomWidth: 3,
      borderBottomColor: '#720505',
      alignItems: 'center',
      justifyContent: 'center'
    },

    listaTxt: {
      color: 'white',
      fontSize: 30,
      paddingBottom: 5,
    },

    cardapio: {

    },

    categoria: {
      flexDirection: 'row',
      paddingTop: 10,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: 'white',
      width: '100%',
      elevation: 15,
      borderBottomWidth: 3,
      borderColor: '#cccccc',
    },

    categoriaTxt: {
      fontSize: 25,
      width: '60%',
      marginLeft: '10%',
      textAlign: 'center',
    },

    categoriaSeta: {
      marginTop: -5,
      width: 50,
      height: 50,
    },

    cardapioItemLinha: {
      flexDirection: 'column',
    },

    cardapioItem: {
      flexDirection: 'row',
      borderWidth: 3,
      borderColor: '#720505',
      margin: 10,

    },

    cardapioItemImg: {
      width: 185,
      height: 185,
      justifyContent: 'center'
    },

    cardapioItemImgText: {
      width: 185,
      height: 185,
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderLeftWidth: 3,
      borderLeftColor: '#720505',
      marginLeft: -3,
    },

    cardapioItemBotao: {
      paddingVertical: 5,
      backgroundColor: '#dddddd',
      borderColor: '#cccccc',
      borderWidth: 2,
      margin: 20,
      marginTop: 10,
    },

    cardapioItemBotaoTexto: {
      textAlign:'center',
    },

    itemContainer: {
      padding: 2,
    },

    itemNome: {
      textAlign: "center",
      fontSize: 21,
      color: '#313131',
      paddingTop: 10,
    },

    itemInfo: {
      textAlign: "center",
      fontSize: 15,
      color: '#313131',
      paddingTop: 10,
    },
});
