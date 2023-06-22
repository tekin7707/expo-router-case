import { View, Text, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Home = () => {
    return (
        <View style={styles.container}>
            {Platform.OS === 'web' ? (
                <Text>Menü içermez.</Text>
            ) : (
                <>
                    <Link href="/kvkk" style={styles.link}>
                        <Text style={styles.buttonText}>Kvkk</Text>
                    </Link>
                    <Link href="/faulty-product" style={styles.link}>
                        <Text style={styles.buttonText}>Faulty Product</Text>
                    </Link>
                </>
            )}
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
