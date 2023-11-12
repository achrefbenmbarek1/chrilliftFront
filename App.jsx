import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Login from './components/Login-signup/Login';
import HomeScreen from './components/Home/AppHome';
import Articles from './components/Articles/Articles';
import CustumeDrawer from './components/Home/CustumeDrawer';
import Table from './components/TableControl/Table';
import FeedBack from './components/feedback/Feedback';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import HiddenNavigator from './Navigators/HiddenNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

function App() {
  const height = Dimensions.get('window').height;
  const renderLoginInNavigatorDrawer = () => {
    return (
      <Drawer.Screen
        options={{
          headerStyle: {backgroundColor: 'white'},
          drawerIcon: ({color}) => (
            <Ionicons name="book" size={22} color={color} />
          ),
          drawerItemStyle: {height: height * 0.08},
        }}
        name="login/signup"
        component={Login}
      />
    );
  };
  const renderLogoutInNavigatorDrawer = () => {
    return (
      <Drawer.Screen
        options={{
          headerStyle: {backgroundColor: 'white'},
          drawerIcon: ({color}) => (
            <MaterialIcons name="logout" size={22} color={color} />
          ),
          drawerItemStyle: {height: height * 0.08},
        }}
        name="logout"
        component={FeedBack}
      />
    );
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustumeDrawer {...props} />}
        screenOptions={{
          headerShown: true,
          drawerActiveBackgroundColor: '#5F7045',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: {
            fontSize: 20,
            marginLeft: -18,
          },
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            headerStyle: {backgroundColor: 'white'},
            drawerIcon: ({color}) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
            drawerItemStyle: {height: height * 0.08},
          }}
          component={HomeScreen}
        />
        <Drawer.Screen
          options={{
            headerStyle: {backgroundColor: 'white'},
            drawerIcon: ({color}) => (
              <Ionicons name="book" size={22} color={color} />
            ),
            drawerItemStyle: {height: height * 0.08},
          }}
          name="Articles"
          component={Articles}
        />
        <Drawer.Screen
          options={{
            headerStyle: {backgroundColor: 'white'},
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons name="desk" size={26} color={color} />
            ),
            drawerItemStyle: {height: height * 0.08},
          }}
          name="Table"
          component={Table}
        />
        <Drawer.Screen
          options={{
            headerStyle: {backgroundColor: 'white'},
            drawerIcon: ({color}) => (
              <MaterialIcons name="feedback" size={22} color={color} />
            ),
            drawerItemStyle: {height: height * 0.08},
          }}
          name="FeedBack"
          component={FeedBack}
        />

        {AsyncStorage.getItem('token')
          ? renderLogoutInNavigatorDrawer()
          : renderLoginInNavigatorDrawer()}
        <Drawer.Screen
          name="HiddenNavigator"
          component={HiddenNavigator}
          options={{drawerLabel: () => null}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
