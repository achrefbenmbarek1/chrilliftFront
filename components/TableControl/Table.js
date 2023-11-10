import React, {useEffect, useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {useState} from 'react';
import Sbtn from './Sbtn.js';
import ImgBtn from './ImgBtn.js';
import EncDec from './IncDec.js';

const Table = ({navigation}) => {
  const [heights, setHeights] = useState([]);
  const [height, setHeight] = useState(80);
  const [
    haveWeJustReachedTheMaximumNumberOfHeights,
    setHaveWeJustReachedTheMaximumNumberOfHeights,
  ] = useState(false);
  const didWeReachTheMaximumNumberOfHeights = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHaveWeJustReachedTheMaximumNumberOfHeights(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [haveWeJustReachedTheMaximumNumberOfHeights]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${config.API_BASE_URL}/savedHeights/all`);
  //
  //       if (!response.ok) {
  //         throw new Error("problem when fetching");
  //       }
  //       const data = await response.json();
  //       setArticles(data);
  //       console.log(articles);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  const decreaseNumber = () => {
    if (height > 70) {
      setHeight(heightNumber => heightNumber - 1);
    }
  };
  const increaseNumber = () => {
    if (height < 120) {
      setHeight(heightNumber => heightNumber + 1);
    }
  };
  const addHeight = () => {
    if (heights.length >= 10) {
      didWeReachTheMaximumNumberOfHeights.current = true;
      setHaveWeJustReachedTheMaximumNumberOfHeights(true);
      console.log('maximum number of heights');
      return;
    }
    const isHeightPresent = heights.some(item => item.text === height);
    if (isHeightPresent) {
      console.log('height is already present');
      return;
    }
    const ar = [...heights];
    ar.unshift({text: height, key: Math.random().toString()});
    setHeights(ar);
  };
  const deleteItem = index => {
    const arr = [...heights];
    arr.splice(index, 1);
    setHeights(arr);
    if (arr.length === 8) {
      setHaveWeJustReachedTheMaximumNumberOfHeights(false);
    }
  };

  return (
    <View style={styles.appContainer}>
      {haveWeJustReachedTheMaximumNumberOfHeights && (
        <Text style={styles.errorMessage}>
          "you've reached the maximum number of saved heights for this table"
        </Text>
      )}
      <View style={styles.upContainer}>
        <Sbtn heightList={heights} deleteItem={deleteItem} />
        <ImgBtn navigation={navigation} />
      </View>
      <View style={styles.midContainer}>
        <EncDec
          increaseNumber={increaseNumber}
          decreaseNumber={decreaseNumber}
          heightNumber={height}
        />
      </View>
      <View style={styles.btmContainer}>
        <Pressable style={styles.saveContainer} onPress={addHeight}>
          <Text style={styles.saveText}>save</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Table;
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  upContainer: {
    flex: 9,
    flexDirection: 'row',
    width: '100%',
    height: '90%',
  },
  midContainer: {
    flex: 2,
    flexDirection: 'row',
    width: '100%',
  },
  btmContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveContainer: {
    marginTop: 5,
    height: 60,
    backgroundColor: '#5F7045',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  saveText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});
