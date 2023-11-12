import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Btn from './Btn';
import Field from './Field';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import config from '../../config';

export default function Signup(props) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: '',
    phoneNumber: '',
    gender: '',
    job: '',
    height: '',
    health: '',
  });
  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = async () => {
    if (
      userData.firstName == '' ||
      userData.lastName == '' ||
      userData.password == '' ||
      userData.cpassword == '' ||
      userData.email == '' ||
      userData.gender == '' ||
      userData.phoneNumber == '' ||
      userData.job == '' ||
      userData.height == '' ||
      userData.health == ''
    ) {
      setErrormsg('All fields are required');
      return;
    }

    if (userData.password != userData.cpassword) {
      setErrormsg('Password and Confirm Password must be the same');
      return;
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.log('fiwisit response not ok');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      console.log('bjeh rabi le');
      console.log(data);
      if (data.error === 'Invalid Credentials') {
        setErrormsg('Invalid Credentials');
        console.log('ikhdim');
      }
      alert(data.message);
      props.navigation.navigate('Login');
    } catch (error) {
      console.log('errreur');
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
          flex: 5,
          alignItems: 'center',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            paddingVertical: 15,
            fontSize: 25,
            fontWeight: 'bold',
            color: '#5F7045',
          }}>
          Create a new Account
        </Text>
        <ScrollView>
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            First Name :
          </Text>
          <Field
            placeholder="First Name"
            KeyboardType={'default'}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, firstName: text})}
          />
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            Last Name :
          </Text>
          <Field
            placeholder="Last Name"
            KeyboardType={'default'}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, lastName: text})}
          />
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            Email :
          </Text>
          <Field
            placeholder="Email"
            KeyboardType={'email-adress'}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, email: text})}
          />
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            Phone Number :
          </Text>
          <Field
            placeholder="Phone Number"
            KeyboardType={'default'}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, phoneNumber: text})}
          />
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            Job :
          </Text>
          <Field
            placeholder="job"
            KeyboardType={'default'}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, job: text})}
          />
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            Gender :
          </Text>
          <Field
            placeholder="gender"
            KeyboardType={'default'}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, gender: text})}
          />
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            Height :
          </Text>
          <Field
            placeholder="height"
            KeyboardType={'default'}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, height: text})}
          />
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            Health :
          </Text>
          <Field
            placeholder="health"
            KeyboardType={'default'}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, health: text})}
          />
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            Password :
          </Text>
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, password: text})}
          />
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#5F7045',
            }}>
            Confirm Password :
          </Text>
          <Field
            placeholder="Confirm Your Password"
            secureTextEntry={true}
            onPressIn={() => setErrormsg(null)}
            onChangeText={text => setUserData({...userData, cpassword: text})}
          />
        </ScrollView>
        {errormsg ? <Text>{errormsg}</Text> : null}
      </Animatable.View>
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <Btn
          btnLabel="Signup"
          Press={() => {
            Sendtobackend();
          }}
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: 18}}>Already Have Account ?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{color: '#5F7045', fontWeight: 'bold', fontSize: 18}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
