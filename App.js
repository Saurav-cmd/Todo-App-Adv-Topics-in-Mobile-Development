import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import CabsListScreen from './src/screens/cab_list_screen';
import CabDetailScreen from './src/screens/cab_details_screen';
import MyCabScreen from './src/screens/my_cab_screen';
import { CabProvider } from './src/context/cab_context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CabsList" component={CabsListScreen} />
      <Stack.Screen name="CabDetail" component={CabDetailScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <CabProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="MyCab"
            component={MyCabScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="car" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CabProvider>
  );
}

export default App;
