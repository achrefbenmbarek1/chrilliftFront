import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../components/Login-signup/Signup';
import Login from '../components/Login-signup/Login';
import BleScanner from '../components/TableControl/Connect/BleConnect';
import Table from '../components/TableControl/Table';
import Article from '../components/Articles/Articles';

const Stack = createNativeStackNavigator();

function HiddenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Scanner" component={BleScanner} />
      <Stack.Screen name="TableControl" component={Table} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
}

export default HiddenNavigator;
