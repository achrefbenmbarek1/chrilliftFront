import { StyleSheet, TextInput } from "react-native";
import React from "react";

export default function Field(props) {
  return (
    <TextInput
      {...props}
      style={styles.textinput}
      placeholderTextColor='#798C5B'
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderRadius: 13,
    fontSize:15,
    color: '#5F7045',
    paddingHorizontal: 15,
    width:300,
    backgroundColor: "rgb(220,220,220)",
    height: 45,
    marginVertical: 8,
    opacity:0.5
  },
});
