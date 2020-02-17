import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { StyleSheet,Text, TouchableHighlight, View } from 'react-native';

const Topbar = ({orderAlpha, orderCash }) =>{
  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
          <TouchableHighlight onPress={()=>orderAlpha()} style={styles.buton} >
              <Text style={styles.tx}> A⬇️ </Text>
          </TouchableHighlight >
          <Text  style={styles.appTx}>PlaceMyBet</Text>
          <TouchableHighlight onPress={()=>orderCash()}  style={styles.buton}>
              <Text style={styles.tx}> $⬆️</Text>
          </TouchableHighlight>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
      width: "100%",
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      position: "absolute",
      top: 30
  },
  wrapper:{
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
  },
  buton:{
      height: "100%",
      width: "33%",
  },
  appTx: {
    width: "33%",
    fontWeight:"bold",
    textAlign: "center",
  },
  tx:{
    textAlign: "center",
    paddingTop: 10,
  }
});

export default Topbar;
