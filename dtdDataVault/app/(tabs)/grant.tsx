import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons'; // Importing Expo vector icons
import VaultData from '@/utils';
import { getProvier } from '@/utils/getProvider';
import { useSDK } from '@metamask/sdk-react';
// import DataVaultContract from './DataVaultABI.json'; // Contract ABI




export const initVault = async (provider: any) => {
    const { signer } = await getProvier(provider)
    if (!signer) {
        return null
    }

    const vault = new VaultData(signer); // Pass the provider as an argument
    return vault;
}


export default function DataVaultApp() {
    const [app, setApp] = useState('');
    const [contract, setContract] = useState<VaultData>();
    const [notificationText, setNotificationText] = React.useState("")
    const {  provider } = useSDK();

    // Load the contract
    const loadContract = async () => {
        const vaultContract = await initVault(provider);
        if (vaultContract) {
            setContract(vaultContract);
        }

    };

    React.useEffect(() => {
        console.log("running")
        loadContract()
    }, [])
    // // Store data
    const storeData = async () => {
        const isStored = await contract?.storeData({})

    };

    // Grant access
    const grantAccess = async () => {
        console.log("app", app)
        const isGranted = await contract?.grantAccess(app);
        if (isGranted) {
            return setNotificationText("Grant access success")
        }
        return setNotificationText('Grant access error')
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPoLpNuUPNp0l3rFCNbM8ZNCfCpKZTtr4lZg&s' }} // Add a background image
                style={styles.backgroundImage}
            />
            <Text style={styles.title}>DataVault</Text>

            <View style={{ width: 520 }}>
                <View style={styles.inputContainer}>
                    <Ionicons name="key" size={24} color="#19232c" /> {/* Updated color */}
                    <TextInput
                        style={styles.input}
                        placeholder="App Address"
                        placeholderTextColor="#A9A9A9"
                        onChangeText={setApp}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={grantAccess}>
                    <Text style={styles.buttonText}>Grant Access</Text>
                </TouchableOpacity>
                <Text style={styles.notificationText}>{notificationText}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#F5F5F5', alignItems: "center" },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
    },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        paddingLeft: 10
    },
    button: {
        backgroundColor: '#19232c', // Updated primary color
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    notificationText: {
        color: '#ff0000', // Example color for notification text
        fontSize: 14,
        marginTop: 10,
    },
});
