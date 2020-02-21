import React, { Component } from "react";
import { StyleSheet, Button, Text, TextInput, View, Slider, ScrollView } from 'react-native';
import { TouchableHighlight } from "react-native-gesture-handler";
import { withNavigation } from 'react-navigation'

import BookModel from '../models/BookModel'

class DetailView extends Component {

    constructor() {

        super()

        this.state = {
            book: new BookModel("", "", "", [""], 0, 0)
        }

        this.onPressBack = this.onPressBack.bind(this)

    }

    componentDidMount() {
        console.log("Intro");
        let book = JSON.parse(this.props.navigation.getParam('book', 'null'));
        book = new BookModel(book.title, book.autor, book.details, book.genere, book.pages, book.puntuation)
        console.log(book)
        this.setState({ book });
        console.log(this.state.book)

    }

    generesSelected() {
        let vl = "Categories: ";
        this.state.book.getGenere().forEach(g => {
            vl += "#" + g + " "
        });

        return vl;
    }

    onPressBack() {
        const { navigate } = this.props.navigation;

        navigate("MainListView");
    }

    render() {
        let book = this.state.book;
        this.navigation = this.props.navigation;

        if (book == undefined)
            return (<View></View>);
        return (
            <View style={styles.temp}>
                <TouchableHighlight style={styles.button} onPress={this.onPressBack}>
                    <Text style={styles.txtBtn}>{"<"} </Text>
                </TouchableHighlight >
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Text style={styles.label}>Tutulo: {book.getTitle()}</Text>

                        <Text style={styles.label}>Autor: {book.getAutor()}</Text>

                        <Text style={styles.label}>Detalles: {book.getDetails()}</Text>

                        {/* <Text style={styles.labelGenSelected}>{this.generesSelected()}</Text> */}

                        {/* <Text style={styles.label}>Paginas: {book.getPages()}</Text> */}

                        <Text style={styles.label}>Puntuation: {book.getPuntuation()}</Text>
                    </View>
                </ScrollView>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    temp: {
        backgroundColor: "#3A5752",
        flex: 1,
        width: "100%",
    },
    container: {
        flex: 1,
        backgroundColor: "#3A5752",
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
    },
    scroll: {
        backgroundColor: "#3A5752",
        width: "100%",
        flexDirection: "column",
        flex: 1,
        marginTop: 5,
    },
    scrollCells: {
        width: "100%",
        flexDirection: "column",
        flex: 1,
        marginTop: 5
    },
    labelGenSelected: {
        position: 'relative',
        right: 0,
        color: '#1c2d6b',
        maxWidth: 300
    },
    label: {
        position: 'relative',
        right: 0,
        color: '#black',
        margin: 10
    },
    input: {
        width: 300,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    slider: {
        position: 'relative',
        right: 0,
        width: 200,
    },
    button: {
        position: "relative",
        width: 40,
        height: 40,
        left: "5%",
        top: 40,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 4,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 6 },
        marginBottom: 60
    },
    txtBtn: {
        fontWeight: "bold",
        fontSize: 18
    },

});

export default withNavigation(DetailView);