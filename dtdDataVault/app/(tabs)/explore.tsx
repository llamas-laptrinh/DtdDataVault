import VaultData from '@/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSDK } from '@metamask/sdk-react';
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { initVault } from './grant';

interface DataItem {
  id: string;
  info: string;
  accessUsers: string[]; // Changed to a list of blockchain wallet addresses
}

const data: DataItem[] = [
  { id: '1', info: 'Data 1', accessUsers: ['0x1234567890abcdef1234567890abcdef12345678'] },
  { id: '2', info: 'Data 2', accessUsers: ['0xabcdef1234567890abcdef1234567890abcdef12'] },
  { id: '3', info: 'Data 3', accessUsers: ['0x7890abcdef1234567890abcdef1234567890abcd'] },
  { id: '4', info: 'Data 3', accessUsers: ['0x7890abcdef1234567890abcdef1234567890abcd'] },
  { id: '5', info: 'Data 3', accessUsers: ['0x7890abcdef1234567890abcdef1234567890abcd'] },
];

export default function TabTwoScreen() {

  const [contract, setContract] = useState<VaultData>();
  const [notificationText, setNotificationText] = React.useState("")
  const { provider, account } = useSDK();

  const loadContract = async () => {
    const vaultContract = await initVault(provider);
    if (vaultContract) {
      setContract(vaultContract);
    }

  };

  React.useEffect(() => {
    loadContract()
  }, [])


  const onGetAccessData = async () => {
    console.log("account", account)
    const data = await contract?.retrieveData(account || "0x2f134C0F0b85B8E048025745b02d452Aa29E9CCA")
    console.log(data)
  }

  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.titleText}>
        <Ionicons name="information-circle" size={20} color="#19232c" /> {item.info}
      </Text>
      <Text style={styles.contentText}>Stored Information: {item.info}</Text>
      <Text style={styles.accessUserHeaderText}>Access Users:</Text>
      {item.accessUsers.map((user, index) => (
        <View key={index} style={styles.accessUserRow}>

          <Text style={styles.accessUserText}>{user}</Text>
          <Ionicons name="copy" size={16} color="#19232c" />
        </View>
      ))}
      <Text style={styles.accessUserHeaderText}>Users with access to this information:</Text>
      {item.accessUsers.map((user, index) => (
        <View key={`access-${index}`} style={styles.accessUserRow}>

          <Text style={styles.accessUserText}>{user}</Text>
          <Ionicons name="copy" size={16} color="#19232c" />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ width: 520 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={onGetAccessData}>
        <Text style={styles.buttonText}>Get Accessed Data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e9f5fb',
    justifyContent: "center",
    alignItems: "center"
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
  itemContainer: {
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#19232c', // Updated primary color
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#19232c', // Updated primary color
  },
  contentText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#19232c', // Updated primary color
    marginVertical: 5,
  },
  accessUserHeaderText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#19232c', // Updated primary color
    marginVertical: 5,
  },
  accessUserText: {
    fontSize: 14,
    color: '#19232c', // Updated primary color
    marginVertical: 2,
  },
  accessUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    gap: 4
  },
});
