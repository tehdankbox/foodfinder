import React from 'react';
import { Button, View, Text, Picker, TouchableNativeFeedback, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import menuHW from '../assets/menuHW.png';
import Coracao from '../assets/coracaoW.png';
import Lupa from '../assets/lupaW.png';

let mapStyle = [
  {"featureType": "administrative", "elementType": "geometry", "stylers": [{"visibility": "off"}]},
  {"featureType": "poi", "stylers": [{"visibility": "off"}]},
  {"featureType": "road", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]},
  {"featureType": "transit", "stylers": [{"visibility": "off"}]}]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      origin: { latitude: 42.3616132, longitude: -71.0672576 },
      destination: { latitude: 42.3730591, longitude: -71.033754 },
      originText: '',
      destinationText: '',
      locations: [],
      item: ''
    }
  }

  selectLocation = (id) => {
    this.setState({ id: id });
  }

  accessLocation = () => {
    this.props.navigation.navigate('Location', {locationId: this.state.id})
  }

  genMarker = (id, name, lat, lon) => {
    return(
    <Marker
      //draggable
      coordinate={{
        latitude: lat,
        longitude: lon,
      }}
      title={name}
      description={'Toque para acessar'}
      onPress={() => this.selectLocation(id)}
      onCalloutPress={this.accessLocation}
      //onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
    />
    )
  }

  getInitialState() {
    return {
      region: {
      },
    };
  }

  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.appContainer}>
        <View style={styles.bar}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Drawer')}>
            <Image source={menuHW} style={styles.barIcon}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Coracao} style={styles.barIcon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
            <Image source={Lupa} style={styles.barIcon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <MapView
            customMapStyle={mapStyle}
            style={styles.map}
            region={this.state.region}
            initialRegion={{
              latitude: -29.6476155,
              longitude: -50.7825752,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
          >
          {this.genMarker(0, "Xis do Vini", -29.65000000, -50.78056409)}
          {this.genMarker(1, "Fofão Lanches", -29.65108662, -50.78261967)}
          {this.genMarker(2, "Santo Grill", -29.64825764, -50.78474834)}
          {this.genMarker(3, "Xis do Gordo", -29.64827978, -50.78154210)}
          </MapView>
        </View>
        {/*
        <TouchableNativeFeedback onPress={this.registerCompany}>
          <View style={styles.option}>
            <Text style={styles.optionText}>
              Criar conta de Empresa
            </Text>
          </View>
        </TouchableNativeFeedback>
        */}

        {/* link rápido para alguma página
          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Food')} background={TouchableNativeFeedback.SelectableBackground()}>
          <View>
            <Text>Informações</Text>
          </View>
        </TouchableNativeFeedback>*/}
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  appContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  container: {
    height: 750,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    backgroundColor: '#a90f0f',
    padding:5,
  },
  barIcon: {
    width:50,
    height:30,
    flex:1,
  },

  option: {
    height:50,
  },

  botaoLupaContainer: {
    backgroundColor: '#880000',
    borderRadius: 10,
    width: 80,
    alignItems: 'center'
  }
})
