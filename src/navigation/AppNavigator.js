import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import ContactScreen from '../components/ContactScreen';
import DrawerScreen from '../components/DrawerScreen';
import DrinkScreen from '../components/DrinkScreen';
import FoodScreen from '../components/FoodScreen';
import HomeScreen from '../components/HomeScreen';
import LocationScreen from '../components/LocationScreen';
import ResultScreen from '../components/ResultScreen';
import SearchScreen from '../components/SearchScreen';
import SplashScreen from '../components/SplashScreen';
// import MainTabNavigator from './MainTabNavigator';
// import LoginScreen from '../screens/LoginScreen'
// import AuthLoadingScreen from '../screens/AuthLoadingScreen'

const AppNavigator = createStackNavigator(
  {
    Splash: SplashScreen,
    Contact: ContactScreen,
    Drawer: DrawerScreen,
    Drink: DrinkScreen,
    Food: FoodScreen,
    Home: HomeScreen,
    Location: LocationScreen,
    Search: SearchScreen,
    Result: ResultScreen,
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

export default createAppContainer(AppNavigator);
