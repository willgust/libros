import React, { Component } from "react";
import { StyleSheet, Button, Text, TextInput, View, Slider, ScrollView } from 'react-native';
import CategoryCell from '../components/CategoryCell';
import BookService from '../core/BookService';
import { TouchableHighlight } from "react-native-gesture-handler";

class IntroBooksView extends Component {

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
                    name: "Adolescentes",
                    value: 0,
                },
                {
                    isSelected: false,
                    name: "Arte y entretenimiento",
                    value: 1,
                },
                {
                    isSelected: false,
                    name: "Autoayuda",
                    value: 2,
                },
                {
                    isSelected: false,
                    name: "Biografías y memorias",
                    value: 3,
                },
                {
                    isSelected: false,
                    name: "Ciencía ficción y fantasía",
                    value: 4,
                },
                {
                    isSelected: false,
                    name: "Ciencía y Tecnología",
                    value: 5,
                },
                {
                    isSelected: false,
                    name: "Ficción y literatura",
                    value: 6,
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
                    <Text style={styles.txtBtn}> + </Text>
                </TouchableHighlight >
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput style={styles.input} onChangeText={this.onTitleChange}></TextInput>

                        <Text style={styles.label}>Autor</Text>
                        <TextInput style={styles.input} onChangeText={this.onAutorChange}></TextInput>

                        <Text style={styles.label}>Details</Text>
                        <TextInput style={styles.input} onChangeText={this.onDetailsChange}></TextInput>

                        <Text style={styles.label} onPress={this.onClickGenere}>Genere</Text>

                        <View style={styles.scrollCells}>
                            {listCategories.map(genere => {
                                return <CategoryCell genere={genere} onGenereSelected={this.onGenereSelected} key={genere.value} ></CategoryCell>
                            })
                            }
                        </View>
                        <Text style={styles.labelGenSelected}>{this.generesSelected()}</Text>


                        <Text style={styles.label}>Pages</Text>
                        <TextInput style={styles.input} onChangeText={this.onPagesChange}></TextInput>

                        <Text style={styles.label}>Puntuation</Text>
                        <Slider style={styles.slider} minimumValue={0} maximumValue={10} onValueChange={this.onSlideValueChange} onSlidingComplete={this.onSlidingComplete} value={puntuation}></Slider>
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
        backgroundColor: "#f0f0f0",
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
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
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    slider: {
        position: 'relative',
        right: 0,
        width: 200,
    },
    button: {
        position:"relative",
        width: 40,
        height: 40,
        left: "80%",
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

export default IntroBooksView;