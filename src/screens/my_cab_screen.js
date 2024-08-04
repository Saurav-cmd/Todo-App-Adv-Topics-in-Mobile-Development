import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useCabContext } from '../context/cab_context';
import { fetchBookedCabsDetails, handleCancelBooking } from '../firebase/read';

function MyCabScreen() {
  const { state, dispatch } = useCabContext();
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const loadBookedCabs = async () => {
      try {
        const userId = 'uBTPY6pceCiwFF1KfsTo'; 
        const cabsData = await fetchBookedCabsDetails(userId);
        setCabs(cabsData);
      } catch (error) {
        console.error('Error loading booked cabs:', error);
      }
    };

    loadBookedCabs();
  }, [state.bookedCabs]);

  const handleCancel = async (cabId) => {
    try {
      const userId = 'uBTPY6pceCiwFF1KfsTo'; 
      await handleCancelBooking(userId, cabId);
      
      // Update the context state
      dispatch({ type: 'CANCEL_BOOKING', payload: cabId });

      // Reload booked cabs
      const updatedCabs = await fetchBookedCabsDetails(userId);
      setCabs(updatedCabs);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <View style={styles.container}>
      {cabs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No bookings to show</Text>
        </View>
      ) : (
        <FlatList
          data={cabs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>Company: {item.companyName}</Text>
              <Text>Model: {item.model}</Text>
              <Button title="Cancel Booking" onPress={() => handleCancel(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default MyCabScreen;
