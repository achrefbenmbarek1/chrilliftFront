import "react-native-gesture-handler";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import Items from "./Items";


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <Items navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
