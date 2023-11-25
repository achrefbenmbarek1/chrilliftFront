import {React, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CustomRatingBar} from './CustomRatingBar';
import {RoundedButton} from './RoundedButton';
import axios from 'axios';
import {useToggle} from './hooks/useToggle';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Input from './Input';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FeedBack({route, navigation, logout, isLoggingOut}) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const maxRating = useRef([1, 2, 3, 4, 5]);
  const [rating, setRating] = useState(2);
  const [anythingToAdd, setAnythingToAdd] = useState('');
  const [dialogueMessage, setDialogueMessage] = useState(
    'thanks for your feedback',
  );
  const [dialogueColor, setDialogueColor] = useState('green');
  const scrollViewRef = useRef(null);
  const [responseToQuestion1, setResponseToQuestion1] = useState('');
  const [responseToQuestion2, setResponseToQuestion2] = useState('');
  const [responseToQuestion3, setResponseToQuestion3] = useState('');

  const handleContentSizeChange = event => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  const sendData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const questions = {
        question1: responseToQuestion1,
        question2: responseToQuestion2,
        question3: responseToQuestion3,
      };
      const feedbackData = {
        anythingToAdd,
        rating,
        questions,
      };
      console.log(token);
      if (token === '') {
        setDialogueMessage(
          "Please make sure that you have an internet connection and that you're logged in",
        );
        setDialogueColor('red');
        setButtonClicked(true);
      }
      const response = await axios.post(
        `${config.API_BASE_URL}/feedbacks/`,
        feedbackData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDialogueMessage(response.data);
      setButtonClicked(true);
      // const isLoggingOut = route.params;
      // const setToken = route.params;
      if (!isLoggingOut) {
        return;
      }
      await AsyncStorage.removeItem('token');
      logout();
      const supposedlyEmptyToken = await AsyncStorage.getItem('token');
      console.log('just in case', supposedlyEmptyToken);
      // setToken(null);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      setDialogueMessage(
        "Please make sure that you have an internet connection and that you're logged in",
      );
      setDialogueColor('red');
      setButtonClicked(true);
    }
  };

  useToggle(buttonClicked, setButtonClicked);
  const question = ['Question 1?', 'Question 2?', 'Question 3?'];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#5F7045'}}>
      <View style={styles.firstView}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
            paddingTop: 24,
          }}>
          Feedback
        </Text>

        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          How satisfied are you with the app
        </Text>
      </View>

      <View style={styles.ratingView}>
        <CustomRatingBar
          maxRating={maxRating.current}
          rating={rating}
          setRate={rating => setRating(rating)}
        />
      </View>
      <View style={styles.formView}>
        <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled">
          <Input
            qst={question[0]}
            respondToQuestion={responseToQuestion1 =>
              setResponseToQuestion1(responseToQuestion1)
            }
          />
          <Input
            qst={question[1]}
            respondToQuestion={responseToQuestion2 =>
              setResponseToQuestion2(responseToQuestion2)
            }
          />
          <Input
            qst={question[2]}
            respondToQuestion={responseToQuestion3 =>
              setResponseToQuestion3(responseToQuestion3)
            }
          />
          <Text style={styles.text}>Other</Text>
          <TextInput
            placeholderTextColor="#798C5B"
            placeholder="Ecrire votre Feedback"
            style={styles.otherFormInput}
            value={anythingToAdd}
            onChangeText={anythingToAdd => {
              setAnythingToAdd(anythingToAdd);
            }}
            multiline
            onContentSizeChange={handleContentSizeChange}
          />
        </ScrollView>
      </View>
      <View style={styles.buttonView}>
        <RoundedButton title={'Envoyer'} onClicked={() => sendData()} />
        {buttonClicked && (
          <Text style={{color: dialogueColor}}>{dialogueMessage}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  firstView: {
    alignItems: 'center',
    flex: 3,
    // backgroundColor: "#607045"
  },
  ratingView: {
    flex: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  buttonView: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formView: {
    flex: 7,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  text: {
    paddingLeft: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5F7045',
  },
  otherFormInput: {
    borderRadius: 13,
    fontSize: 15,
    color: '#5F7045',
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: 'rgb(220,220,220)',
    height: 100,
    marginVertical: 8,
    opacity: 0.5,
  },
});
