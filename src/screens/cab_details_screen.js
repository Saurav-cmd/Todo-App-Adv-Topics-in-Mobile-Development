import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useCabContext } from '../context/cab_context';
import { bookCab } from '../firebase/write'; 

function CabDetailScreen({ route }) {
  const { cab } = route.params;
  const { state, dispatch } = useCabContext();

  console.log('Received cab in CabDetailScreen:', cab);  // Log the received cab

  const handleBooking = async () => {
    if (state.bookedCabs.length >= 2) {
      Alert.alert('Booking Limit Exceeded', 'You cannot book more than 2 cabs at a time.');
    } else {
      try {
        const userId = 'uBTPY6pceCiwFF1KfsTo'; 

        await bookCab(userId, cab.id);

        // Dispatch action to update local state
        dispatch({ type: 'BOOK_CAB', payload: cab.id });

        Alert.alert('Success', 'Cab booked successfully!');
      } catch (error) {
        Alert.alert('Error', 'Error booking cab. Please try again.');
      }
    }
  };

  if (!cab) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Company: {cab.companyName}</Text>
      <Text>Model: {cab.model}</Text>
      <Text>Passengers: {cab.passengers}</Text>
      <Text>Rating: {cab.rating}</Text>
      <Text>Cost/Hour: {cab.cost}</Text>
      <Button title="Book Cab" onPress={handleBooking} />
    </View>
  );
}

export default CabDetailScreen;
