import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, ActivityIndicator } from 'react-native';

//barra inferior
const Botbar = ({ setView, currentView }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableHighlight onPress={() => setView("ALL")} style={currentView == "ALL" ? styles.butonSel : styles.buton} >
          {/* <Text style={styles.tx}> All</Text> */}
          <Image
              style={styles.img}
            source={require('../assets/all.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
        </TouchableHighlight >
        <TouchableHighlight onPress={() => setView("FAV")} style={currentView == "FAV" ? styles.butonSel : styles.buton}>
          {/* <Text style={styles.tx}> Favorites</Text> */}
          <Image
              style={styles.img}
            source={require('../assets/fav.png')}
            PlaceholderContent={<ActivityIndicator />}
          />

        </TouchableHighlight>
        <TouchableHighlight onPress={() => setView("ADD")} style={currentView == "ADD" ? styles.butonSel : styles.buton}>
          {/* <Text style={styles.tx}> AddBooks</Text> */}
          <Image
            style={styles.img}
            source={require('../assets/add.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
        </TouchableHighlight>
        <TouchableHighlight style={currentView == "STATISTICS" ? styles.butonSel : styles.buton}>
          {/* <Text style={styles.tx}> AddBooks</Text> */}
          <Image
            style={styles.img}
            source={require('../assets/detaills.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
        </TouchableHighlight>
        
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    backgroundColor: '#493A57',
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    paddingBottom: 20,
    bottom: 0
  },
  img: {
    marginTop: 5,
    width: 50, 
    height: 50,
  },
  wrapper: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
  },
  buton: {
    height: "100%",
    width: "23%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  butonSel: {
    height: "100%",
    width: "30%",
    borderTopColor: 'black',
    borderTopWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tx: {
    textAlign: "center",
    paddingTop: 10,
  }
});

export default Botbar;
