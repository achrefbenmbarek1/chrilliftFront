import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import config from '../../config';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Articles = ({navigation}) => {
  const [articles, setArticles] = useState([]);
  const url =
    'https://chilift.co/module/xipblog/single?id=9&rewrite=&page_type=0';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('is it gone hopefully',token);
        const response = await fetch(`${config.API_BASE_URL}/articles/all`);

        if (!response.ok) {
          throw new Error('problem when fetching');
        }
        const data = await response.json();
        setArticles(data);
        console.log(articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleArticlePress = url => {
    console.log("let's navigate", url);
    navigation.navigate('HiddenNavigator', {screen: 'Article', params: {url}});
    console.log('did it happen');
  };

  return (
    <ScrollView>
      {articles?.map((article, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            handleArticlePress(
              'https://chilift.co/module/xipblog/single?id=9&rewrite=&page_type=0',
            )
          }>
          <View style={styles.container}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{article.title}</Text>
            </View>
            <View style={styles.mini}>
              <Image
                source={{
                  uri:
                    config.API_BASE_URL + '/imagesArticle/' + article.imageName,
                }}
                style={styles.image}
              />
              <Text style={styles.desc}>{article.content}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Articles;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginHorizontal: 20,
    padding: 0,
    borderWidth: 0,
    borderRadius: 25,
    backgroundColor: '#9db67a',
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
  },
  mini: {
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  titleBox: {
    borderWidth: 0,
    padding: 0,
    borderRadius: 20,
    borderColor: '#5F7045',
    margin: 5,
    width: '45%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    marginHorizontal: 20,
    color: 'white',
    borderRadius: 1,
    borderColor: 'black',
    fontWeight: 'bold',
  },
  desc: {
    margin: 20,
    fontSize: 18,
  },
  like: {
    color: 'white',
    width: 30,
    borderRadius: 15,
  },
});
