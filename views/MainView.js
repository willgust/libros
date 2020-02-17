// import React from 'react';
import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { StyleSheet, ScrollView, View, TextInput } from 'react-native';
import Botbar from '../components/Botbar';
import BooksList from '../components/BooksList';
import BookService from '../core/BookService';
import AddBooks from './AddBooks';

class MainView extends Component {

    constructor() {
        super();
        this.state = {
            inputValue: '',
            books: [],
            view: 'ALL',
            orderAlpha: false,
        }

        this.onOrderAlpha = this.onOrderAlpha.bind(this)
        this.onFavoriteBook = this.onFavoriteBook.bind(this)
        this.onDeleteBook = this.onDeleteBook.bind(this)
        this.setView = this.setView.bind(this)
        this.onGetBooksSucces = this.onGetBooksSucces.bind(this)
        this.onBookAdded = this.onBookAdded.bind(this)
        this.onFilterChange = this.onFilterChange.bind(this)
        this.getBooks = this.getBooks.bind(this)

        this.navigation = null;
        this.bookService = new BookService;
        this.allBooks=[];
    }

    componentDidMount() {
        this.getBooks(this.onGetBooksSucces);
    }

    onGetBooksSucces(a_books) {
        let books = a_books;
        console.log("onGetBooksSucces");
        console.log(books);
        this.allBooks = books;
        this.setState({ books });
    }

    onFavoriteBook(book) {
        console.log('onFavoriteBook');
        let books = this.state.books.map(b => {
            if (b.getTitle() == book.getTitle()) {
                b.setFavourite(!b.getFavourite());
                return b
            }
            return b
        });
        this.setState({ books });
    }

    onDeleteBook(book) {
        this.bookService.DeleteBook(book);
        this.getBooks();
    }

    onOrderAlpha() {
        this.setState({ orderAlpha: !this.state.orderAlpha })
        let filteredBooks = this.state.books;
        if (this.state.orderAlpha) {
            filteredBooks = filteredBooks.sort(function (a, b) {
                var x = a.getTitle().toLowerCase();
                var y = b.getTitle().toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });
        }
        else {
            filteredBooks = filteredBooks.sort(function (a, b) {
                var x = a.getTitle().toLowerCase();
                var y = b.getTitle().toLowerCase();
                if (x < y) { return 1; }
                if (x > y) { return -1; }
                return 0;
            });
        }

        this.setState({ filteredBooks });
    }

    onBookAdded() {
        this.getBooks();
    }

    getBooks() {
        this.bookService.GetMyBooks(this.onGetBooksSucces);
    }

    onFilterChange(val) {
        if (val == "") {
            this.getBooks();
        }
        else {
            let filtered = new Set();
            let temp = this.allBooks.filter(function (el) { return el.getTitle().includes(val) == true });
            temp.forEach(el => {
                filtered.add(el);
            });

            temp = this.allBooks.filter(function (el) { return el.getAutor().includes(val) == true });
            temp.forEach(el => {
                filtered.add(el);
            });
            let books = [];
            filtered.forEach(e => { books.push(e) });
            console.log(books);

            this.setState({ books });
        }
    }

    setView(view) {
        this.setState({ view })
    }

    render() {
        const { books, view, orderAlpha } = this.state;
        this.navigation = this.props.navigation;

        let filteredBooks;

        if (view == "ADD") {
            return (
                <View style={styles.container}>
                    <AddBooks onBookAdded={this.onBookAdded}></AddBooks>
                    <Botbar setView={this.setView} currentView={view}></Botbar>
                </View>)
        }
        else {
            if (view == "ALL") {
                filteredBooks = books;
            } else {
                filteredBooks = books.filter(e => e.getFavourite() == true);
            }
            return (
                <View style={styles.container}>
                    <View>
                        <TextInput style={styles.input} onChangeText={this.onFilterChange}></TextInput>
                    </View>
                    <ScrollView style={styles.scroll}>
                        <BooksList books={filteredBooks} onFavorite={this.onFavoriteBook} onDelete={this.onDeleteBook} ></BooksList>
                    </ScrollView>
                    <Botbar setView={this.setView} currentView={view}></Botbar>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#f0f0f0",
        backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        width: "100%",
        flexDirection: "column",
        flex: 1,
        marginTop: 5
    },
    input: {
        width: 300,
        height: 40,
        borderRadius: 25,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
});

export default withNavigation(MainView);
