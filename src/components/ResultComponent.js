import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import ItemComponent from './ItemComponent'


export default class ResultComponent extends Component {
  static propTypes = {
    food: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    name: PropTypes.string,
  };

  render() {
    const { navigation } = this.props.navigation;
    return (
      <View>
        {this.props.food.map((item, index) => {
          if((item.name).includes(this.props.name)) {
            return (
              <View key={index}>
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Location', {locationId: item.loc})}>
                  <View style={styles.divUnderline}>
                    <Text style={styles.conInfo}>{item.name} - R${item.price}</Text>
                    <ItemComponent id={item.loc} type={"resultName"} items={this.props.locations} navigation={this.props.navigation}/>
                  </View>
                </TouchableNativeFeedback>
              </View>
            );
          }
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conInfo: {
    fontSize: 20,
    color: '#424242',
    width: '100%',
    textAlign: 'center'
  },
  divUnderline: {
    borderBottomWidth: 3,
    borderBottomColor: 'lightgray',
    width: "100%",
    paddingTop: 10,
  },
});
