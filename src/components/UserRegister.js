import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemComponent from './ItemComponent';

import { db } from '../config';

let itemsRef = db.ref('/food/');


export default class List extends Component {
  state = {
    items: [],
  };


  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  render() {
    const {navigation} = this.props;
    const foodId = navigation.getParam('foodId', '');
    return (
         <View style={styles.container}>
           {this.state.items.length > 0 ? (
             <ItemComponent id={3} type={"ingredients"} items={this.state.items} />
           ) : (
             <Text>No items</Text>
           )}
         </View>
       );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 24,
    textAlign: 'center'
  }
});
