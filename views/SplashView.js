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