import { Text, View, StyleSheet } from "react-native";

import React from "react";
import Btn from "./Btn";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.mainview}>
        <Text style={styles.text}>Welcome to Chilift App</Text>
        <Btn
          btnLabel="Login"
          Press={() => props.navigation.navigate("Login")}
        />
        <Btn
          btnLabel="Signup"
          Press={() => props.navigation.navigate("Signup")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainview: {
    marginHorizontal: 40,
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 64,
    paddingVertical: 100,
  },
});

export default Home;
