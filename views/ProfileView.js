import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableHighlight, View } from 'react-native';
import { withNavigation } from 'react-navigation'
import { NavigationActions } from 'react-navigation'
import TopBarButtonLeft from '../components/TopBarButtonLeft';
import { AsyncStorage } from 'react-native';
import { ActivityIndicator } from 'react-native';
import ApiManager from '../core/ApiManager';
import LocalStorageManager from '../core/LocalStorageManager';

class ProfileView extends Component {

    static apiManager = null;
    static storageManager = null;

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
            userName: "",
            mail: "",
            bankName: "",
            cuenta: "",
            badge: 0,
        }

        this.onPressLogout = this.onPressLogout.bind(this);
        this.onActionLeft = this.onActionLeft.bind(this);
        this.onGetUserLoggedInfoSucces = this.onGetUserLoggedInfoSucces.bind(this);
        apiManager = new ApiManager;
        storageManager = new LocalStorageManager;


    }

    componentDidMount() {
        console.log("Profile componentDidMount");
        apiManager.GetUserLoggedInfo(this.onGetUserLoggedInfoSucces, this.onGetUserLoggedInfoFailure);
        this.props.navigation.setParams({ onActionLeft: this.onActionLeft });

    }

    onGetUserLoggedInfoSucces(user) {
        console.log("onGetUserLoggedInfoSucces");

        let userName = user.userName;
        let mail = user.mail;
        let bankName = user.bankName;
        let cuenta = user.cuenta;
        let badge = user.badge;
        this.setState({ userName, mail, bankName, cuenta, badge });
    }

    onGetUserLoggedInfoFailure() {

    }

    onActionLeft() {
        console.log("Profile" + "onActionLeft");
        const backAction = NavigationActions.back({
            key: null
        })
        this.props.navigation.dispatch(backAction);
    }

    onPressLogout() {
        this._deleteTokenInAsync();
        this.props.navigation.navigate('Login');
    }

    _deleteTokenInAsync = async () => {
        try {
            await AsyncStorage.removeItem(storageManager.UserLoggedKey);

        } catch (error) {
            console.log(error);
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 50, height: 50, marginBottom: 20 }}
                    source={require('../assets/placemybet_logo.png')}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <View style={styles.wrapper}>
                    <Text>{this.state.userName} </Text>
                    <Text>{this.state.mail} </Text>
                    <Text>******</Text>
                </View>
                <View style={styles.wrapper}>
                    <Text>{this.state.bankName} </Text>
                    <Text>{this.state.cuenta} </Text>
                    <Text>{this.state.badge} </Text>
                </View>
                <TouchableHighlight style={styles.button} onPress={this.onPressLogout}>
                    <Text style={styles.submit}>
                        Logout
                    </Text>
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
    button: {
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#ffffff',
        width: 80,
        marginRight: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 200,
        marginBottom: 10,
        padding: 10,
        borderColor: '#7a42f4',
        borderWidth: 1
    }
});

export default withNavigation(ProfileView);