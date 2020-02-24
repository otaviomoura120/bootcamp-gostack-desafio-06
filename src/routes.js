import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import StarRepository from './pages/StarRepository';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#7159c1' },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: 'Main' }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({ title: route.params.user.name })}
        />
        <Stack.Screen
          name="StarRepository"
          component={StarRepository}
          options={({ route }) => ({ title: route.params.repository.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
