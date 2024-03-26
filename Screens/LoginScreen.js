import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    if (email === 'example@example.com' && password === 'password') {
      navigation.navigate('Home');
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Invalid Credentials', 'Please enter correct email and password.');
    }
  };

  const handleForgetPassword = () => {
    setModalVisible(true);
  };

  const handleDone = () => {
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    setModalVisible(false);
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleGoogleLogin = async () => {
    const googleUrl = 'https://accounts.google.com'; // Replace this with your Google login URL
    try {
      await WebBrowser.openBrowserAsync(googleUrl);
    } catch (error) {
      console.error('Error opening web browser:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.heading}>Login Form</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={handleForgetPassword}>
          <Text style={styles.forgotPassword}>Forget Password?</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="#841584" />
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Not a member?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
              <TouchableOpacity onPress={handleGoogleLogin}>
                <Text style={styles.googleLogin}>Login with Google</Text>
              </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
           <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Forgot Password</Text>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              <Button title="Done" onPress={handleDone} />
           
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#F8F9FA',
  },
  box: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom:35
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
    bottom:10
  },
  inputBox: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  forgotPassword: {
    fontSize: 16,
   
    color:'#6A5ACD',
    textAlign: 'right',
    marginBottom: 20,
    bottom:15
  },
  buttonContainer: {
    marginBottom: 20,
    bottom:15
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 16,
    color: 'black',
    marginRight: 5,
    bottom:20
  },
  registerLink: {
    fontSize: 16,
    
    color: '#6A5ACD',
    fontWeight: 'bold',
    bottom:20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
   bottom:10
  },
  googleLogin: {
    color: '#841584',
    textAlign: 'center',
    fontSize:18,
    fontWeight: 'bold',
    bottom:10
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;

