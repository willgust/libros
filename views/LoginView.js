import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { StyleSheet, TouchableHighlight, Text, TextInput, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import LocalStorageManager from '../core/LocalStorageManager';
import UserService from '../core/UserService';

class LoginView extends Component {

    constructor() {
        super();

        this.state = {
            userNameTx: '',
            paswordTx: '',
            currentLoginState: this.loginState().clear,
        }

        this.onPressBtnLogin = this.onPressBtnLogin.bind(this);
        this.onLoginSucces = this.onLoginSucces.bind(this);
        this.onLoginFailure = this.onLoginFailure.bind(this);

        this.navigation =null;
        this.userService = null;
        this.storageManager = null;

        this.userService = new UserService;
        this.storageManager = new LocalStorageManager;
    }

    onPressBtnLogin() {
        let currentLoginState= this.loginState().clear;
        this.setState({currentLoginState });
        this.userService.Login(this.state.userNameTx,this.state.paswordTx,this.onLoginSucces,this.onLoginFailure);
    }

    onLoginSucces(token,userLogged){
        // this._saveTokenInAsync(token);
        // this._saveUserLoggedInAsync(userLogged);
        this.navigation.navigate('App');
    }

    onLoginFailure(){
        let currentLoginState= this.loginState().error;
        console.log("onLoginFailure currentLoginState: " + this.state.currentLoginState);
        this.setState({currentLoginState });
    }

    _saveTokenInAsync = async (token)=>{
        try{
            await AsyncStorage.setItem(this.storageManager.TokenKey(), token);
        } catch (error) {
           console.log("_saveTokenInAsync error");
        }
    }

    _saveUserLoggedInAsync = async (userLogged)=>{
        console.log("_saveUserLoggedInAsync");
        try{
            await AsyncStorage.setItem(this.storageManager.UserLoggedKey(), JSON.stringify(userLogged));           
        } catch (error) {
           console.log("_saveUserLoggedInAsync error:");
           console.log(error);
        }
    }

    loginState(){
        return{
            clear:0,
            loading:1,
            error:2
        }
    }

    render() {
        const {currentLoginState} =this.state;
        this.navigation = this.props.navigation;

        console.log("render currentLoginState: " + this.state.currentLoginState);

        return (

            <View style={styles.container}>
                <Text>Login</Text>

                <Text style={currentLoginState==this.loginState().clear ? styles.label  : styles.labelError}>UserName</Text>
                <TextInput style={styles.input} onChangeText={(tx) => { this.state.userNameTx = tx }}></TextInput>

                <Text  style={currentLoginState==this.loginState().clear ? styles.label  : styles.labelError}>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} onChangeText={(tx) => { this.state.paswordTx = tx }} ></TextInput>

                <TouchableHighlight style={currentLoginState==this.loginState().clear ? styles.buton  : styles.butonError} onPress={this.onPressBtnLogin}>
                    <Text > GO!</Text>
                </TouchableHighlight >
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
    },
    labelError: {
        position: 'relative',
        right: 0,
        color: '#e8383b',
        margin: 20
    },
    input: {
        width: 300,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    buton: {
        borderRadius: 25,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        margin: 20
    },
    butonError: {
        borderRadius: 25,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#e8383b',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        margin: 20
    },
});

export default withNavigation(LoginView);