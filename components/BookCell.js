import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';


const BookCell = ({ book, onFavorite, onDelete }) => {
 console.log(book);
//
  return (
    <View style={styles.contenedor} >
      <View style={styles.uno}>
        <Text style={styles.color}>Titulo: {book.getTitle()} </Text>
        <Text style={styles.color}>Autor: {book.getAutor()}</Text>
      </View>
      <View>
        <TouchableHighlight onPress={() => { onDelete(book);}}>
          <Text style={styles.boton}> Borrar</Text>
        </TouchableHighlight >
        <TouchableHighlight style={book.getFavourite() ? styles.botonFav : styles.boton} onPress={() => {
          console.log(book);
          onFavorite(book);
        }}>
          <Text style={styles.btnTx}> Favorito</Text>
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
    width: "60%",
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  
  boton: {
    marginTop:5,
    borderRadius: 5,
    paddingTop: 5,
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

export default BookCell;
