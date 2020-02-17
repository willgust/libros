import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';


const TopBarButtonLeft = ({onActionLeft}) => {

    const onButtonDown = () => {
        console.log("onButtonDown");
        onActionLeft();
    }

    return(  
        <TouchableHighlight
        underlayColor='#efefef'
        style={styles.button}
        onPress={onButtonDown}>
            <Text style={styles.submit}>
                P
            </Text>
        </TouchableHighlight>    
    )
}

const styles = StyleSheet.create({
    button: {
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#ffffff',
        width: 80,
        marginLeft: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.1)',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
});

export default TopBarButtonLeft;
