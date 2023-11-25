import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';

import Field from './Field';
import Btn from './Btn';
import {SafeAreaView} from 'react-native-safe-area-context';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({login, navigation}) {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const [errormsg, setErrormsg] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    if (buttonClicked) {
      const timer = setTimeout(() => {
        setButtonClicked(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [buttonClicked]);
  const Sendtobackend = async () => {
    if (userCredentials.email === '' || userCredentials.password === '') {
      setErrormsg('All fields are required');
      return;
    }

    try {
      // const token = await AsyncStorage.getItem("token");
      // if (token !== null || token !== undefined || token !== "") {
      //   console.log("Token is empty or not found");
      //   throw new Error("you are already logged in from this device");
      // }
      const response = await fetch(`${config.API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.status === 422) {
        console.log('this is a check');
        setErrormsg('check your credentials');
        setButtonClicked(true);
        return;
      }
      if (!response.ok) {
        console.log('check your internet connection');
        setErrormsg('check your internet connection');
        setButtonClicked(true);
        return;
      }
      const data = await response.json();
      console.log('you were a good fighter', data?.token);
      await AsyncStorage.setItem('token', data.token);
      login(data.token);
      alert('Logged in successfully');
      navigation.navigate('Home');

      // if (data.error) {
      //   console.log(data.error);
      //   setErrormsg('check your credentials or your internet connection');
      // } else {
      //   await AsyncStorage.setItem('token', data.token);
      //   alert('Logged in successfully');
      //   props.navigation.navigate('Home');
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 2, alignItems: 'center'}}>
        <Image source={require('./img/grey.png')} style={{marginTop: 60}} />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={{
          flex: 4,
          alignItems: 'center',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          backgroundColor: 'white',
        }}>
        <Text style={styles.textwelcomeback}>Welcome Back</Text>
        <Text style={styles.textloginaccount}>Login to your Account</Text>
        <View style={{paddingTop: 5}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
              alignSelf: 'flex-start',
              paddingLeft: 10,
              paddingVertical: 5,
            }}>
            Email :
          </Text>

          <Field
            placeholder="Email"
            KeyboardType={'email-adress'}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text =>
              setUserCredentials({...userCredentials, email: text})
            }></Field>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
              alignSelf: 'flex-start',
              paddingLeft: 10,
              paddingVertical: 5,
            }}>
            Password :
          </Text>

          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text =>
              setUserCredentials({...userCredentials, password: text})
            }
            onPressIn={() => setErrormsg(null)}></Field>

          <Text style={styles.textforgotpassword}>Forgot your Password ?</Text>
        </View>
      </Animatable.View>
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <Btn
          btnLabel="Login"
          style={styles.button}
          Press={() => {
            Sendtobackend();
          }}
        />
        {buttonClicked ? <Text>{errormsg}</Text> : null}
        <View style={{flexDirection: 'row', paddingTop: 10}}>
          <Text style={{fontSize: 18}}>Don't Have Account ?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HiddenNavigator', {
                // screen: "AnotherHiddenScreen",
                screen: 'Signup',
              })
            }>
            <Text style={{color: '#5F7045', fontWeight: 'bold', fontSize: 18}}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textwelcomeback: {
    fontSize: 40,
    color: '#5F7045',
    fontWeight: 'bold',
    marginTop: 40,
  },
  textloginaccount: {
    color: 'grey',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forgotpasswordview: {
    alignItems: 'flex-end',
    width: '78%',
    paddingRight: 30,
    marginBottom: 100,
  },
  textforgotpassword: {
    color: '#5F7045',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
  lastview: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  donthaveaccounttext: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttontext: {
    color: '#006A42',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
