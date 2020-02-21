// import React from 'react';
import React, { Component } from 'react';
import { createAppContainer, withNavigation, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import MainView from './views/MainView'
import LoginView from './views/LoginView'
import SplashView from './views/SplashView'
import AddBooks from './views/AddBooks';
import DetailView from './views/DetailView'

console.disableYellowBox = true;


const navigationOptionsNone = {
  header: null
};

const CoreNavigatior = createStackNavigator({
  MainListView: {
    screen: MainView, navigationOptions: {
      header: null,
    },
  },
  DetailBookView: {
    screen: DetailView, navigationOptions: {
      header: null,
    },
  },
})


const LoginNavigator = createStackNavigator(
  {
    Main: LoginView,
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: navigationOptionsNone,
    headerMode: 'screen'
  }
)

const Tabs = createStackNavigator(
  {
    Main: CoreNavigatior,
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: navigationOptionsNone,
    headerMode: 'screen'
  }
)

const SwitchNavigator = createSwitchNavigator(
  {
    Splash: SplashView,
    App: Tabs,
    Login: LoginNavigator
  },
  {
    initialRouteName: 'Splash'
  }
)

class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const AppContainer = createAppContainer(SwitchNavigator)

export default App;
