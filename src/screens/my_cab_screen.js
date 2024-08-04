import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button} from 'react-native';
import { useCabContext } from '../context/cab_context';
import { fetchBookedCabsDetails, handleCancelBooking } from '../firebase/read';

function MyCabScreen() {
  const { state } = useCabContext();
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

  const handleCancel = (cabId) => {
    const userId = 'uBTPY6pceCiwFF1KfsTo'; 
    handleCancelBooking(userId, cabId, setCabs);
  };

  return (
    <View>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Company: {item.companyName}</Text>
            <Text>Model: {item.model}</Text>
            <Button title="Cancel Booking" onPress={() => handleCancel(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

export default MyCabScreen;
