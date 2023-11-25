import React from 'react';
import {StyleSheet, View} from 'react-native';
import Item from './Item';

const Items = ({navigation, token}) => {
  const renderLoginInHomePage = () => {
    console.log('are we setting it', token);
    return (
      <Item
        onPress={() => navigation.navigate('login/signup')}
        txt="login/singup"
        img={require('../../images/a.jpg')}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Item
          onPress={() => navigation.navigate('Table')}
          txt="Table"
          img={require('../../images/a.jpg')}
        />
        <Item
          onPress={() => navigation.navigate('FeedBack')}
          txt="FeedBack"
          img={require('../../images/a.jpg')}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Item
          onPress={() => navigation.navigate('Articles')}
          txt="Articles"
          img={require('../../images/a.jpg')}
        />
        {!token && renderLoginInHomePage()}
      </View>
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 0,
    top: 190,
  },
});
