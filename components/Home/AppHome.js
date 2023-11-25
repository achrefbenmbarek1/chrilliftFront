import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './Header';
import Items from './Items';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDrawerStatus} from '@react-navigation/drawer';

export default function HomeScreen({navigation, route}) {
  const [token, setTokenForHome] = useState(null);
  const getTokenFromStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      console.log('home', storedToken);
      setTokenForHome(storedToken);
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getTokenFromStorage();
  }, [route]);
  const drawerStatus = useDrawerStatus();
  console.log('we are strong', drawerStatus);
  React.useEffect(() => {
    console.log('heyyy');
  }, [drawerStatus]);

  return (
    <View style={styles.container}>
      <Header />
      <Items navigation={navigation} token={token} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
