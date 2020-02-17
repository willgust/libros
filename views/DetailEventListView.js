import React, { Component } from 'react';
import { StyleSheet, Slider, Text, TextInput, TouchableHighlight, Image, View, Alert } from 'react-native';
import TopBarButtonLeft from '../components/TopBarButtonLeft';
import ApiManager from '../core/ApiManager';
import { NavigationActions } from 'react-navigation'
import { ActivityIndicator } from 'react-native';

class DetailEventListView extends Component {
    static mercados = null;
    static apiManager = null;

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'PlaceMyBet',
            headerTitleStyle: {
                textAlign: 'center',
                flexGrow: 1,
                alignSelf: 'center',
            },
            headerLeft: () => (
                <TopBarButtonLeft onActionLeft={navigation.getParam('onActionLeft', 'null')} />
            )
        }
    };

    constructor(props) {
        super(props)

        this.state = {
            sliderValue: 1.5,
            currentMercado: 1.5,
            overPress: true,
            youWin: 0,
            yourBet: 0,
            mercado: {
                over_under: 0,
                cuote_Over: 0,
                cuote_Under: 0,
                id: 0,
            },
        };

        this.onActionLeft = this.onActionLeft.bind(this);
        this.onSlideValueChange = this.onSlideValueChange.bind(this);
        this.onSlidingComplete = this.onSlidingComplete.bind(this);
        this.onGetMarketsFromEventSucces = this.onGetMarketsFromEventSucces.bind(this);
        this.onGetMarketsFromEventFailure = this.onGetMarketsFromEventFailure.bind(this);
        this.onPressBtnOver_Under = this.onPressBtnOver_Under.bind(this);
        this.onInputBetChange = this.onInputBetChange.bind(this);
        this.recalculateYoWin = this.recalculateYoWin.bind(this);
        this.recalculateYoWinOver = this.recalculateYoWinOver.bind(this);
        this.onPressBtnBet = this.onPressBtnBet.bind(this);

        apiManager = new ApiManager;
    }

    componentDidMount() {
        console.log("Detail componentDidMount");
        this.props.navigation.setParams({ onActionLeft: this.onActionLeft });
        const event = JSON.parse(this.props.navigation.getParam('event', 'null'));

        apiManager.GetMarketsFromEvent(event.Id, this.onGetMarketsFromEventSucces, this.onGetMarketsFromEventFailure);
    }

    onGetMarketsFromEventSucces(markets) {
        console.log(markets[0]);
        mercados = markets.map(m => {
            return {
                over_under: m.over_under,
                cuote_Over: m.cuoteOver,
                cuote_Under: m.cuoteUnder,
                id: m.id,
            }
        });

        let mercado = mercados[0];
        console.log(mercado);
        this.setState({ mercado });
    }

    onGetMarketsFromEventFailure() {

    }

    onActionLeft() {
        console.log("Profile" + "onActionLeft");
        const backAction = NavigationActions.back({
            key: null
        })
        this.props.navigation.dispatch(backAction);
    }

    onSlidingComplete(a_value) {
        if (a_value < 2) {
            let sliderValue = 1.5;
            let currentMercado = sliderValue;

            let mercado = mercados[0];
            let youWin = this.state.youWin;
            this.setState({ sliderValue, currentMercado, mercado, youWin });
        }
        else if (a_value >= 2 && a_value < 2.5) {
            let sliderValue = 2.5;
            let currentMercado = sliderValue;
            let mercado = mercados[1];
            let youWin = this.state.youWin;
            this.setState({ sliderValue, currentMercado, mercado, youWin });
        }
        else if (a_value >= 2.5 && a_value < 3) {
            let sliderValue = 2.5;
            let currentMercado = sliderValue;
            let mercado = mercados[1];
            let youWin = this.state.youWin;
            this.setState({ sliderValue, currentMercado, mercado, youWin });
        }
        else if (a_value >= 3) {
            let sliderValue = 3.5;
            let currentMercado = sliderValue;
            let mercado = mercados[2];
            let youWin = this.state.youWin;
            this.setState({ sliderValue, currentMercado, mercado, youWin });
        }
    }

    onSlideValueChange(a_value) {
        let sliderValue = a_value;
        this.setState({ sliderValue });
    }

    onPressBtnOver_Under(a_value) {
        let overPress = false;
        let lastInputvalue = this.state.yourBet;
        console.log("onPressBtnOver_Under lastInputvalue " + lastInputvalue);
        if (a_value == "over") {
            overPress = true;
            this.setState({ overPress });
        }
        else {
            overPress = false;
            this.setState({ overPress });
        }
        console.log("onPressBtnOver_Under youWin " + this.state.yourBet)
        this.recalculateYoWinOver(lastInputvalue, overPress);
    }

    onInputBetChange(a_value) {
        let yourBet = parseInt(a_value);
        this.setState({ yourBet });
        this.recalculateYoWin(yourBet);
    }

    onPressBtnBet() {
        console.log("OnPressBet");
        apiManager.CreateBet(this.state.mercado.id, this.state.yourBet, this.state.overPress,
            () => {
                Alert.alert(
                    'Felicidades!',
                    'Tu apuesta se ha reliazo con exito',
                    [
                        { text: 'OK', onPress: () => this.onActionLeft() },
                    ],
                    { cancelable: false },
                );
            },
            () => {

            });
    }

    recalculateYoWinOver(a_value, isOver) {
        let youWin = a_value;

        if (youWin == "Nan")
            youWin = 0;

        if (isOver)
            youWin = this.state.mercado.cuote_Over * youWin;
        else
            youWin = this.state.mercado.cuote_Under * youWin;

        console.log("youWin " + youWin);
        this.setState({ youWin });
    }

    recalculateYoWin(a_value) {

        let youWin = a_value;

        if (youWin == "Nan")
            youWin = 0;

        if (this.state.overPress)
            youWin = this.state.mercado.cuote_Over * youWin;
        else
            youWin = this.state.mercado.cuote_Under * youWin;

        console.log("youWin " + youWin);
        this.setState({ youWin });
    }

    render() {

        const { navigation } = this.props
        const { sliderValue, currentMercado, mercado, overPress, youWin, yourBet } = this.state;
        const event = JSON.parse(navigation.getParam('event', 'null'))


        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.title}>{event.Partido}</Text>
                    <Text style={styles.title}>{event.Fecha}</Text>
                </View>

                <View style={styles.wrapper}>
                    <View style={styles.wrapper}>
                        <TouchableHighlight style={overPress ? styles.buttonPress : styles.button} onPress={() => { this.onPressBtnOver_Under("over") }}>
                            <View style={styles.childBtn}>
                                <Text>Over: {currentMercado}</Text>
                                <Text>{mercado.cuote_Over}</Text>
                                <Text>$</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.wrapper}>
                        <TouchableHighlight style={overPress ? styles.button : styles.buttonPress} onPress={() => { this.onPressBtnOver_Under("under") }}>
                            <View style={styles.childBtn}>
                                <Text>Under: {currentMercado}</Text>
                                <Text>{mercado.cuote_Under}</Text>
                                <Text>$</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <Slider style={styles.slider} minimumValue={1.5} maximumValue={3.5} onValueChange={this.onSlideValueChange} onSlidingComplete={this.onSlidingComplete} value={sliderValue}></Slider>

                <View style={styles.wrapper}>
                    <View style={styles.wrapperRow}>
                        <View style={styles.row}>
                            <Text>{overPress ? "Over:" : "Under:"} {currentMercado} </Text>
                            <Text>Total goals</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>{overPress ? mercado.cuote_Over : mercado.cuote_Under} $ </Text>
                            <TextInput style={styles.input} onChangeText={this.onInputBetChange} keyboardType={'numeric'} value={yourBet}></TextInput>
                        </View>
                    </View>
                    <View style={styles.wrapperRow}>
                        <View style={styles.row}>
                            <Text >You win ..</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>{youWin}$ </Text>
                        </View>
                    </View>
                </View>

                <TouchableHighlight onPress={this.onPressBtnBet}>
                    <Image
                        style={{ width: 50, height: 50, marginBottom: 20 }}
                        source={require('../assets/placemybet_logo.png')}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </TouchableHighlight>


            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        alignItems: 'center',
        justifyContent: 'center',
    },
    top: {
        position: "absolute",
        top: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
        marginBottom: 10,
        padding: 10,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
    },
    buttonPress: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: "red",
    },
    childBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperRow: {
        marginBottom: 10,
        height: 50,
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        textAlign: "center",
    },
    row: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%'
    },
    slider: {
        width: 200,
    }
});

export default DetailEventListView;