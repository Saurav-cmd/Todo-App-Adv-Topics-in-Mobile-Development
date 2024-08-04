import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useCabContext } from '../context/cab_context';
import { bookCab } from '../firebase/write';

function CabDetailScreen({ route }) {
  const { cab } = route.params;
  const { state, dispatch } = useCabContext();

  const handleBooking = async () => {
    if (state.bookedCabs.length >= 2) {
      Alert.alert('Booking Limit Exceeded', 'You cannot book more than 2 cabs at a time.');
    } else {
      try {
        const userId = 'uBTPY6pceCiwFF1KfsTo';
        await bookCab(userId, cab.id);

        dispatch({ type: 'BOOK_CAB', payload: cab.id });

        Alert.alert('Success', 'Cab booked successfully!');
      } catch (error) {
        Alert.alert('Error', 'Error booking cab. Please try again.');
      }
    }
  };

  if (!cab) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>{cab.companyName}</Title>
          <Paragraph>Model: {cab.model}</Paragraph>
          <Paragraph>Passengers: {cab.passengers}</Paragraph>
          <Paragraph>Rating: {cab.rating}</Paragraph>
          <Paragraph>Cost/Hour: {cab.cost}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleBooking} style={styles.button}>
            Book Cab
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  button: {
    margin: 10,
  },
});

export default CabDetailScreen;
