import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text, TextInput, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import LocalStorageManager from '../core/LocalStorageManager';


class SplashView extends Component {

  

    constructor() {
        super();

        this.storageManager = new LocalStorageManager;
    }

    componentDidMount() {
        this.onTryLogin();
    }

    onTryLogin = async () => {

        // try {
        //     let userLogged = await AsyncStorage.getItem(this.storageManager.UserLoggedKey());
        //     if (userLogged == null || userLogged == undefined) {
        //         this.props.navigation.navigate('Login');
        //         console.log("--------> No hay usuario");

        //     }
        //     else {
        //         console.log("--------> Hay usuario");
        //         userLogged = JSON.parse(userLogged);

        //         console.log(userLogged.id);
        //         this.apiManager.Login(userLogged.userName, userLogged.userPassword,
        //             (token, userLogged) => {
        //                 console.log("--------> Logeado");
        //                 this.props.navigation.navigate('App');
        //             },
        //             () => {
        //                 console.log("--------> No Logeado");                        
        //                 this.props.navigation.navigate('Login');
        //             });
        //     }

        // } catch (e) {
        //     console.log(e);
        // }

        this.props.navigation.navigate('Main');
    }

    render() {

        return (

            <View style={styles.container}>
                <Text>SPLASH</Text>

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
    label: {
        position: 'relative',
        right: 0,
        color: '#1c2d6b',
        margin: 20
    }
});

export default SplashView;