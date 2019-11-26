import React from 'react';
import { Button, View, Text, Picker, TouchableNativeFeedback, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import menuHW from '../assets/menuHW.png';
import Coracao from '../assets/coracaoW.png';
import Lupa from '../assets/lupaW.png';

import { db } from '../config';

let locationsRef = db.ref('/locations/');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props)
    this.state = {
      id: '1',
      idBurger: '',
      showNext: false,
      nomeItem: '',
      precoItem: '',
      origin: { latitude: 42.3616132, longitude: -71.0672576 },
      destination: { latitude: 42.3730591, longitude: -71.033754 },
      originText: '',
      destinationText: '',
      locations: [],
    }
  }

  registerUser = ()  => {
    this.props.navigation.navigate('UserRegister', {
      foodId: 1,
    })
  }

  registerCompany = ()  => {
    this.props.navigation.navigate('CompanyRegister')
  }

  selectLocation = (id) => {
    this.setState({ id: id });
  }

  accessLocation = () => {
    this.props.navigation.navigate('Location', {
      locationId: this.state.id,
    })
  }

  genMarker = (name) => {
    return(
    <Marker
      coordinate={{
        latitude: -29.650000,
        longitude: -50.7804653,
      }}
      title={name}
      description={'Toque para acessar'}
      onPress={() => this.selectLocation(0)}
      onCalloutPress={this.accessLocation}
    />
    )
  }

  componentDidMount() {
    locationsRef.on('value', snapshot => {
      let data = snapshot.val();
      let locations = Object.values(data);
      this.setState({ locations });
    });
  }

  getInitialState() {
    return {
      region: {
      },
    };
  }

  getLocationName = () => {
    return(
      this.state.locations.map((item, index) => {
        if(index==0){
          return (
            <View key={index}>
              <Text>{item.name}</Text>
            </View>
          );
        }
      })
    )
  }


  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.appContainer}>
        <View style={styles.barraSuperior}>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Drawer')}>
              <Image source={menuHW} style={styles.menuHam}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={this.state.region}
            initialRegion={{
              latitude: -29.6479155,
              longitude: -50.7859752,
              latitudeDelta: 0.006,
              longitudeDelta: 0.006,
            }}
          >
          {this.genMarker("Xis do Vini")}
          <Marker
            coordinate={{
              latitude: -29.6476204,
              longitude: -50.7847287,
            }}
            title={'Fofão Lanches'}
            description={'Toque para acessar'}
            onPress={() => this.selectLocation(1)}
            onCalloutPress={this.accessLocation}
          />
          </MapView>
        </View>

        <View style={styles.lowerBar}>
          <TouchableOpacity onPress={this.registerUser}>
            <Image source={Coracao} style={styles.lowerBarIcon}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Lupa} style={styles.lowerBarIcon}/>
          </TouchableOpacity>
        </View>

        <TouchableNativeFeedback >
          <View style={styles.option}>
            {this.getLocationName()}
          </View>
        </TouchableNativeFeedback>
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
    height: 655,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  barraSuperior: {
    height: 58,
    backgroundColor: '#a90f0f',
    flexDirection: 'row',
  },
  menuHam: {
    marginHorizontal: 15,
    marginVertical: 6,
    height: 45,
    width: 45,
  },
  lowerBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    backgroundColor: '#a90f0f',
    padding:5,
  },

  lowerBarIcon: {
    width:50,
    height: 30,
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
