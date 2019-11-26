import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    id: PropTypes.number,
    type: PropTypes.string,
  };

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          if(index==this.props.id){
            if(this.props.type == "locPlace"){
              return (
                <View key={index}>
                  <Text style={styles.locPlace}>{item.street}, {item.number}, {item.district}, {item.city}, {item.state}, {item.cep}</Text>
                </View>
              );
            }
            if(this.props.type == "ingredients"){
              return (
                <View key={index}>
                  <Text style={styles.itemtext}>{item.ingredients}</Text>
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
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
