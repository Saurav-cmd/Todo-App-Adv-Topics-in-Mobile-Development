import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchCabs } from '../firebase/read';

function CabsListScreen({ navigation }) {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const loadCabs = async () => {
      try {
        const cabsList = await fetchCabs();
        setCabs(cabsList);
      } catch (error) {
        console.error('Error fetching cabs:', error);
      }
    };

    loadCabs();
  }, []);

  return (
    <View>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log('Navigating to CabDetail with cab:', item);  // Log the cab being passed
              navigation.navigate('CabDetail', { cab: item });
            }}
          >
            <Text>{item.companyName} - {item.model}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default CabsListScreen;