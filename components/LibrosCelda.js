import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const LibrosCelda = ({ book, onFavorite, onDelete, onDetail }) => {
 console.log(book);
//
  return (
    <View style={styles.contenedor} onPress={() => { onDetail(book) }} >
      <View style={styles.uno}>
        <Text style={styles.color}>Titulo: {book.getTitle()} </Text>
        <Text style={styles.color}>Autor: {book.getAutor()}</Text>
      </View>
      <View>
        <TouchableHighlight underlayColor={'transparent'} onPress={() => { onDelete(book);}}>
          <Text style={styles.boton}> Borrar</Text>
        </TouchableHighlight >
        <TouchableHighlight underlayColor={'transparent'} style={book.getFavourite() ? styles.botonFav : styles.boton} onPress={() => {
          console.log(book);
          onFavorite(book);
        }}>
          <Text style={styles.btnTx}> Favorito</Text>
        </TouchableHighlight >
        <TouchableHighlight underlayColor={'transparent'} onPress={() => { onDetail(book);}}>
          <Text style={styles.boton}> Detalles</Text>
        </TouchableHighlight >
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    borderRadius: 5,
    width: "90%",
    height: 100,
    backgroundColor: 'grey',
    marginTop: 20,
    marginLeft: "5%",
    marginRight: "5%",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  uno: {
    width: "65%",
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  
  boton: {
    marginTop:3,
    borderRadius: 5,
    paddingTop: 4,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.4,

  },
  botonFav: {    
    borderRadius: 25,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'green',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  
  color:{
    color:'white'
  }
});

export default LibrosCelda;
