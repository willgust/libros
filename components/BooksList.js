import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import LibrosCelda from './LibrosCelda';

//lista de libros
class BooksList extends Component{

  constructor(props){
    super(props)
  }

  render(){
    const {books, onFavorite,onDelete,onDetail} = this.props
    return (
      <View>
        { books.map(book => {
          return <LibrosCelda book ={book} onFavorite={onFavorite} onDelete={onDelete} onDetail={onDetail}/>
        })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: 'blue',
    marginTop: 5,
    justifyContent: 'center',  
    alignItems: "center",
    flexDirection: "row",     
  },  
});

export default BooksList;
