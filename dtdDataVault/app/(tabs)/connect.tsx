import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connectWallet, getProvier } from '@/utils/getProvider';
import { useSDK } from "@metamask/sdk-react";

const ConnectWallet = () => {
    const [account, setAccount] = React.useState('');

    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            setAccount(accounts?.[0]);
        } catch (err) {
            console.warn("failed to connect..", err);
        }
    }
    // useEffect(() => {
    //     // Check if wallet is already connected
    //     const checkConnection = async () => {
    //         const { signer } = await getProvier();
    //         if (signer) {
    //             const address = await signer.getAddress();
    //             setAccount(address);
    //         }
    //     };
    //     checkConnection();
    // }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={connect}>
                <Text style={styles.buttonText}>Connect MetaMask Wallet</Text>
            </TouchableOpacity>
            {account ? <Text style={styles.accountText}>Connected: {account}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#19232c',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    accountText: {
        marginTop: 10,
        fontSize: 14,
        color: '#333',
    },
});

export default ConnectWallet;
