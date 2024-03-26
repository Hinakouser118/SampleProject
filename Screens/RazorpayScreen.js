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
        image: 'https://your_logo.png', // Add your app logo URL here
        currency: 'INR',
        key: 'rzp_test_swBKBFGYCKIRit', // Replace with your Razorpay key
        amount: parseInt(amount) * 100, // Amount should be in paisa
        name: 'Your App Name',
        prefill: {
          email: 'user@email.com', // Pre-fill with user's email (optional)
          contact: mobileNumber, // Pre-fill with user's mobile number
          name: 'User Name', // Pre-fill with user's name (optional)
        },
        theme: { color: '#F37254' }, // Customize the theme color (optional)
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          // Handle successful payment
          console.log('Payment success:', data);
          Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);
          // Logic to update transaction status, send notification to recipient, etc.
        })
        .catch((error) => {
          // Handle payment failure or cancellation
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
