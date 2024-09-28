import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import Web3 from 'web3';
import { Ionicons } from '@expo/vector-icons'; // Importing Expo vector icons
// import DataVaultContract from './DataVaultABI.json'; // Contract ABI

const web3 = new Web3("https://your-blockchain-provider-url");

export default function DataVaultApp() {
    const [data, setData] = useState('');
    const [app, setApp] = useState('');
    const [additionalField, setAdditionalField] = useState(''); // New field for additional data
    const [contract, setContract] = useState(null);

    // Load the contract
    const loadContract = async () => {
        const contractAddress = "0xYourContractAddress";
        // const vaultContract = new web3.eth.Contract(DataVaultContract, contractAddress);
        // setContract(vaultContract);
    };

    // Store data
    const storeData = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.storeData(web3.utils.asciiToHex(data + additionalField)) // Store both data fields
            .send({ from: accounts[0] });
    };

    // Grant access
    const grantAccess = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.grantAccess(app, 3600) // Grant access for 1 hour
            .send({ from: accounts[0] });
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

                {/* <TouchableOpacity style={styles.button} onPress={loadContract}>
                    <Text style={styles.buttonText}>Load Contract</Text>
                </TouchableOpacity> */}
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
});
