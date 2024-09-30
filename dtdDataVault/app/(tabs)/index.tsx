import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initVault } from './grant';
import { useSDK } from '@metamask/sdk-react';
import VaultData from '@/utils';

export default function HomeScreen() {

  const [contract, setContract] = useState<VaultData>();
  const [notificationText, setNotificationText] = React.useState("")
  const { provider } = useSDK();

  const [activeTab, setActiveTab] = useState('userInfo');
  const [userInfo, setUserInfo] = useState({
    name: 'test name',
    email: 'test@gmail.com',
    id: '1231231231',
    phone: '090000000',
    address: 'test address',
  });
  const [passportInfo, setPassportInfo] = useState({
    passportNumber: '',
    nationality: '',
    expiryDate: '',
  });

  const loadContract = async () => {
    const vaultContract = await initVault(provider);
    if (vaultContract) {
      setContract(vaultContract);
    }

  };

  React.useEffect(() => {
    loadContract()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const handlePassportChange = (field: string, value: string) => {
    setPassportInfo({ ...passportInfo, [field]: value });
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    if (activeTab === "userInfo") {
      console.log(userInfo)
      await contract?.storeData("0x7b226e616d65223a2274657374206e616d65222c22656d61696c223a227465737440676d61696c2e636f6d222c226964223a2231323331323331323331222c2270686f6e65223a22303930303030303030222c2261646472657373223a22746573742061646472657373227d")
    }

  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('userInfo')} style={[styles.tab, activeTab === 'userInfo' && styles.activeTab]}>
          <Text style={activeTab === 'userInfo' ? styles.activeTabText : styles.tabText}>User Information</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('passportInfo')} style={[styles.tab, activeTab === 'passportInfo' && styles.activeTab]}>
          <Text style={activeTab === 'passportInfo' ? styles.activeTabText : styles.tabText}>Passport Information</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'userInfo' && (
        <View style={styles.container}>
          <Text style={styles.title}>User Information</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person" size={24} color="#19232c" />
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor="#A9A9A9"
              value={userInfo.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={24} color="#19232c" />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={userInfo.email}
              placeholderTextColor="#A9A9A9"
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="id-card" size={24} color="#19232c" />
            <TextInput
              style={styles.input}
              placeholder="Enter ID"
              value={userInfo.id}
              placeholderTextColor="#A9A9A9"
              onChangeText={(value) => handleInputChange('id', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="call" size={24} color="#19232c" />
            <TextInput
              style={styles.input}
              placeholder="Enter Phone"
              value={userInfo.phone}
              placeholderTextColor="#A9A9A9"
              onChangeText={(value) => handleInputChange('phone', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="home" size={24} color="#19232c" />
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              value={userInfo.address}
              placeholderTextColor="#A9A9A9"
              onChangeText={(value) => handleInputChange('address', value)}
            />
          </View>
        </View>
      )}

      {activeTab === 'passportInfo' && (
        <View style={styles.container}>
          <Text style={styles.title}>Passport Information</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="document" size={24} color="#19232c" />
            <TextInput
              style={styles.input}
              placeholder="Enter Passport Number"
              placeholderTextColor="#A9A9A9"
              onChangeText={(value) => handlePassportChange('passportNumber', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="flag" size={24} color="#19232c" />
            <TextInput
              style={styles.input}
              placeholder="Enter Nationality"
              placeholderTextColor="#A9A9A9"
              onChangeText={(value) => handlePassportChange('nationality', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="calendar" size={24} color="#19232c" />
            <TextInput
              style={styles.input}
              placeholder="Enter Expiry Date"
              placeholderTextColor="#A9A9A9"
              onChangeText={(value) => handlePassportChange('expiryDate', value)}
            />
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Ionicons name="checkmark" size={24} color="#fff" />
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f4f8',
    elevation: 3,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#19232c',
  },
  tabText: {
    color: '#19232c',
    fontWeight: '600',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
    width: 520,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#19232c',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#19232c',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
