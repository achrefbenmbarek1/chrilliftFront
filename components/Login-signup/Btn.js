import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Btn({ btnLabel, Press }) {
  return (
    <TouchableOpacity onPress={Press} style={styles.btn}>
      <Text style={styles.text}>{btnLabel}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#607045",
    borderRadius: 100,
    alignItems: "center",
    alignItems: "center",
    width: 150,
    paddingVertical:3,
    marginTop:10,
    marginBottom:5,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
