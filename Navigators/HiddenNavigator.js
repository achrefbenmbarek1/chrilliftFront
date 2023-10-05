
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../components/Login-signup/Signup";

const Stack = createNativeStackNavigator();

function HiddenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default HiddenNavigator;

