import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import LogoLan from "../assets/logoLancheria.png";
import LogoRest from "../assets/logoRestaurante.png";


export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    id: PropTypes.number,
    type: PropTypes.string,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          if(index==this.props.id){
            if(this.props.type == "resultName"){
              return(
                <View key={index}>
                  <Text style={styles.result}>{item.name}</Text>
                </View>
              );
            }
            if(this.props.type == "locName"){
              return (
                <View key={index}>
                  <Text style={styles.locName}>{item.name}</Text>
                </View>
              );
            }
            if(this.props.type == "locPlace"){
              return (
                <View key={index}>
                  <Text style={styles.locPlace}>{item.street}, {item.number}, {item.district}, {item.city}, {item.state}, {item.cep}</Text>
                </View>
              );
            }
            if(this.props.type == "locSpec"){
              if(item.spec == 0){
                return (
                  <View key={index}>
                    <Image source={LogoLan} style={styles.locSpec}/>
                    <Text style={styles.locSpecTxt}>Lancheria</Text>
                  </View>
                );
              }
              if(item.spec == 1){
                return (
                  <View key={index}>
                    <Image source={LogoRest} style={styles.locSpec}/>
                    <Text style={styles.locSpecTxt}>Restaurante</Text>
                  </View>
                );
              }
            }
            if(this.props.type == "ingredients"){
              return (
                <View key={index}>
                  <Text style={styles.itemtext}>{item.ingredients}</Text>
                </View>
              );
            }
            if(this.props.type == "conName"){
              return (
                <View key={index}>
                  <Text style={styles.conName}>{item.name}</Text>
                </View>
              );
            }
            if (this.props.type == "conPhone") {
              if ((item.phone) != "") {
                return (
                  <View key={index}>
                    <Text style={styles.conInfo}>Telefone Fixo: {item.phone}</Text>
                  </View>
                );
              }
            }
            if (this.props.type == "conWpp") {
              if ((item.wpp) != "") {
                return (
                  <View key={index}>
                    <Text style={styles.conInfo}>WhatsApp: {item.wpp}</Text>
                  </View>
                );
              }
            }
            if (this.props.type == "conEmail") {
              if ((item.email) != "") {
                return (
                  <View key={index}>
                    <Text style={styles.conInfo}>Email: {item.email}</Text>
                  </View>
                );
              }
            }
            if(this.props.type == "foodName"){
              return (
                <View key={index}>
                  <Text style={styles.txtNome}>{item.name}</Text>
                </View>
              );
            }
            if(this.props.type == "foodPrice"){
              return (
                <View key={index}>
                  <Text style={styles.txtInfo}>R${item.price}</Text>
                </View>
              );
            }
            if(this.props.type == "foodIngredients"){
              return (
                <View key={index}>
                  <Text style={styles.txtItem}>{item.ingredients}</Text>
                </View>
              );
            }
            if(this.props.type == "drinkName"){
              return (
                <View key={index}>
                  <Text style={styles.txtNome}>{item.name}</Text>
                </View>
              );
            }
            if(this.props.type == "drinkPrice"){
              return (
                <View key={index}>
                  <Text style={styles.txtInfo}>R${item.price}</Text>
                </View>
              );
            }
            if(this.props.type == "drinkFlavor"){
              return (
                <View key={index}>
                  <Text style={styles.txtItem}>{item.flavor}</Text>
                </View>
              );
            }
          }
          if(item.loc == this.props.id){
            if(this.props.type == "cardapio"){
              return (
                <View style={styles.cardapioItem} key={index}>
                  <Image source={{uri:"https://firebasestorage.googleapis.com/v0/b/foodfinder-rn.appspot.com/o/food%2Ffood"+index+".png?alt=media"}} style={styles.cardapioItemImg}/>
                  <View style={styles.cardapioItemImgText}>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemNome}>{item.name}</Text>
                      <Text style={styles.itemInfo}>R${item.price}</Text>
                    </View>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Food', {foodId: index, locationId: item.loc})} background={TouchableNativeFeedback.SelectableBackground()}>
                      <View style={styles.cardapioItemBotao}>
                        <Text style={styles.cardapioItemBotaoTexto}>Informações</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              );
            }
            if(this.props.type == "bebidas"){
              return (
                <View style={styles.cardapioItem} key={index}>
                  <Image source={{uri:"https://firebasestorage.googleapis.com/v0/b/foodfinder-rn.appspot.com/o/drink%2Fdrink"+index+".jpeg?alt=media"}} style={styles.cardapioItemImg}/>
                  <View style={styles.cardapioItemImgText}>
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemNome}>{item.name}</Text>
                      <Text style={styles.itemInfo}>R${item.price}</Text>
                    </View>
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Drink', {drinkId: index, locationId: item.loc})} background={TouchableNativeFeedback.SelectableBackground()}>
                      <View style={styles.cardapioItemBotao}>
                        <Text style={styles.cardapioItemBotaoTexto}>Informações</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              );
            }
          }
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  locPlace: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 7,
    width: 308,
    marginBottom: 10,
  },
  locName: {
    fontSize: 30,
    color: 'white',
    paddingLeft: 7,
  },
  conInfo: {
    fontSize: 20,
    color: '#424242',
    paddingLeft: 7,
    width: 308,
    marginBottom: 10,
    textAlign: 'center'
  },
  result: {
    fontSize: 20,
    color: '#424242',
    width: '100%',
    marginBottom: 10,
    textAlign: 'center'

  },
  conName: {
    fontSize: 30,
    color: 'white',
    paddingLeft: 7,
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
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

  txtItem: {
      textAlign: 'center',
      paddingVertical: 5,
      fontSize: 18,
      backgroundColor: "#f1f1f1",
  },

  locSpec: {
    width: 70,
    height: 70,
  },

  locSpecTxt: {
    color: 'white',
  },
});
