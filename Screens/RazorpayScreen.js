import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const initiatePayment = async () => {
    try {
      const options = {
        description: 'Payment for transfer to user',
        image: 'https://your_logo.png', 
        currency: 'INR',
        key: '', // Replace with your Razorpay key
        amount: parseInt(amount) * 100, 
        name: 'Your App Name',
        prefill: {
          email: 'user@email.com', 
          contact: mobileNumber, 
          name: 'User Name', 
        },
        theme: { color: '#F37254' }, 
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          
          console.log('Payment success:', data);
          Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);
          
        })
        .catch((error) => {
     
          console.log('Payment error:', error);
          Alert.alert('Payment Error', 'Payment was unsuccessful or cancelled.');
        });
    } catch (error) {
      console.error('Error initiating payment:', error);
      Alert.alert('Error', 'Something went wrong while initiating the payment.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Enter mobile number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
      />
      <Button title="Pay" onPress={initiatePayment} />
    </View>
  );
};

export default PaymentScreen;
