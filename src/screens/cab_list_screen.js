import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { fetchCabs } from '../firebase/read';

function CabsListScreen({ navigation }) {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCabs = async () => {
      try {
        const cabsList = await fetchCabs();
        setCabs(cabsList);
      } catch (error) {
        console.error('Error fetching cabs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCabs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (cabs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No cabs to show</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log('Navigating to CabDetail with cab:', item); 
              navigation.navigate('CabDetail', { cab: item });
            }}
          >
            <Card style={styles.card}>
              <Card.Content>
                <Title>{item.companyName}</Title>
                <Paragraph>Model: {item.model}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginVertical: 10,
  },
});

export default CabsListScreen;
