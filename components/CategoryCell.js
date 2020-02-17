import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';


const CategoryCell = ({ genere, onGenereSelected }) => {

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.tx}>{genere.name} </Text>
      </View>
      <View style={styles.right}>
        <TouchableHighlight style={genere.isSelected ? styles.butonFav : styles.buton} onPress={() => {
          console.log(genere);
          onGenereSelected(genere);
        }}>
          <Text style={styles.btnTx}> </Text>
        </TouchableHighlight >
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: "90%",
    height: 80,
    backgroundColor: 'white',
    borderColor: '#7a42f4',
    borderWidth: 1,
    marginTop: 5,
    marginLeft: "5%",
    marginRight: "5%",
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: "row",
  },
  left: {
    width: "50%",
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  right: {
    marginLeft: 10,
  },
  buton: {
    marginTop: 5,
    marginRight: 5,
    borderRadius: 25,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  butonFav: {
    borderRadius: 25,
    borderColor: '#7a42f4',
    backgroundColor: '#7a42f4',
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  btnTx: {

  },
  tx: {
    color: 'black'
  }
});

export default CategoryCell;
