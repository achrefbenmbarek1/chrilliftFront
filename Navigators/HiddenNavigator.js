
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../components/Login-signup/Signup";
import Login from "../components/Login-signup/Login";

const Stack = createNativeStackNavigator();

function HiddenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default HiddenNavigator;

