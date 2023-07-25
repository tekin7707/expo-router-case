import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Home = () => {
    return (
        <View style={styles.container}>
                <Text>Menü içermez.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        margin: 10,
    },
    buttonText: {
        color: 'white',
        backgroundColor: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
