import React, { Component } from "react";
import { StyleSheet, Button, Text, TextInput, View, Slider, ScrollView } from 'react-native';
import AspectoCategorias from '../components/AspectoCategorias';
import BookService from '../core/BookService';
import { TouchableHighlight } from "react-native-gesture-handler";

class AddBooks extends Component {

    constructor(props) {

        super(props)

        this.state = {
            title: '',
            autor: '',
            details: '',
            genere: '',
            pages: 0,
            puntuation: 0,
            catregoriesOpened: false,
            generes: [
                {
                    isSelected: false,
                    name: "Juveniles",
                    value: 0,
                },
                {
                    isSelected: false,
                    name: "Arte",
                    value: 1,
                },
                {
                    isSelected: false,
                    name: "Belicas",
                    value: 2,
                },
                {
                    isSelected: false,
                    name: "Ciencía ficción y fantasía",
                    value: 3,
                },
                {
                    isSelected: false,
                    name: "Biografías",
                    value: 4,
                },
                {
                    isSelected: false,
                    name: "Informatica",
                    value: 5,
                },
                {
                    isSelected: false,
                    name: "Fantasia",
                    value: 6,
                },
                {
                    isSelected: false,
                    name: "Eligue tu propia aventura",
                    value: 7,
                },
                {
                    isSelected: false,
                    name: "Viajes",
                    value: 8,
                },
            ]
        }
        this.onBookAdded = null;

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onAutorChange = this.onAutorChange.bind(this);
        this.onDetailsChange = this.onDetailsChange.bind(this);
        this.onGenereChange = this.onGenereChange.bind(this);
        this.onPagesChange = this.onPagesChange.bind(this);
        this.onSlideValueChange = this.onSlideValueChange.bind(this);
        this.onClickGenere = this.onClickGenere.bind(this);
        this.onGenereSelected = this.onGenereSelected.bind(this);
        this.onPressAddBook = this.onPressAddBook.bind(this);
        this.bookService = new BookService;
    }

    componentDidMount() {
        console.log("Intro");
    }

    onTitleChange(title) {
        this.setState({ title });
    }

    onAutorChange(a_value) {
        let autor = a_value;
        this.setState({ autor });
    }

    onDetailsChange(a_value) {
        let details = a_value;
        this.setState({ details });
    }

    onGenereChange(a_value) {
        let genere = a_value;
        this.setState({ genere });
    }

    onPagesChange(a_value) {
        let pages = a_value;
        this.setState({ pages });
    }

    onSlideValueChange(a_value) {
        let puntuation = a_value;
        this.setState({ puntuation });
    }

    onPressAddBook() {
        this.bookService.AddBook(this.state.title, this.state.autor, this.state.details, this.state.genere, this.state.pages, this.state.puntuation);
        this.onBookAdded();
    }

    onClickGenere() {
        let catregoriesOpened = !this.state.catregoriesOpened;
        this.setState({ catregoriesOpened });
    }

    onGenereSelected(genere) {
        let generes = this.state.generes.map(g => {
            if (g.value === genere.value) {
                return { ...g, isSelected: !g.isSelected }
            }
            return g
        });
        this.setState({ generes });
    }

    GenereBook() {
        if (this.state.catregoriesOpened)
            return this.state.generes;
        return [];
    }

    generesSelected() {
        let vl = "Selecteds: ";
        let someSeleceted = false;
        this.state.generes.forEach(g => {
            if (g.isSelected) {
                vl += "#" + g.name + " "
                someSeleceted = true

            }
        });
        if (!someSeleceted)
            vl = "";
        if (this.state.catregoriesOpened)
            return "";

        return vl;
    }

    areGenereSelected() {
        let someSeleceted = false;
        this.state.generes.forEach(g => {
            if (g.isSelected) {
                someSeleceted = true
            }
        });

        return someSeleceted;
    }

    canAdd() {
        let valid = (this.state.title != "" && this.state.autor != "" && this.state.details != "" && this.areGenereSelected() && this.state.pages != "")
        console.log(valid)
        return valid;
    }

    render() {
        const { puntuation } = this.state;
        const listCategories = this.GenereBook();
        this.onBookAdded = this.props.onBookAdded;

        return (
            <View style={styles.temp}>
                <TouchableHighlight style={styles.button} onPress={this.onPressAddBook} disabled={!this.canAdd()}>
                    <Text style={styles.txtBtn}> Añadir </Text>
                </TouchableHighlight >
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Text style={styles.label}>Titulo</Text>
                        <TextInput style={styles.input} onChangeText={this.onTitleChange}></TextInput>

                        <Text style={styles.label}>Autor</Text>
                        <TextInput style={styles.input} onChangeText={this.onAutorChange}></TextInput>

                        <Text style={styles.label}>Detalles</Text>
                        <TextInput style={styles.input} onChangeText={this.onDetailsChange}></TextInput>

                        <Text style={styles.labelGenSelected}>{this.generesSelected()}</Text>


                        <Text style={styles.label}>Paginas</Text>
                        <TextInput style={styles.input} onChangeText={this.onPagesChange}></TextInput>

                        <Text style={styles.label}>Puntuation</Text>
                        <TextInput style={styles.input} onChangeText={this.onSlideValueChange}></TextInput>

                        
                        <Text style={styles.label} onPress={this.onClickGenere}>Genero</Text>

                        <View style={styles.scrollCells}>
                            {listCategories.map(genere => {
                                return <AspectoCategorias genere={genere} onGenereSelected={this.onGenereSelected} key={genere.value} ></AspectoCategorias>
                            })
                            }
                        </View>
                        
                    </View>
                </ScrollView>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    temp:{
        flex: 1,
        width:"100%",
    },
    container: {
        flex: 1,
        backgroundColor: "whait",
        alignItems: 'left',
        justifyContent: 'center',
        paddingBottom: 100,
        borderRadius: 5,
    },
    scroll: {
        backgroundColor: "#f0f0f0",
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
        color: '#1c2d6b',
        margin: 10
    },
    input: {
        
        width: 300,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        position: 'relative',
        textAlign:"center"
        
    },
    slider: {
        position: 'relative',
        right: 0,
        width: 200,
    },
    button: {
        position:"relative",
        width: 370,
        height: 40,
        left: "5.5%",
        top: 10,
        alignItems: 'center',

        backgroundColor: '#493A57',

    },
    txtBtn: {
        fontWeight: "bold",
        fontSize: 20
    },
    
});

export default AddBooks;