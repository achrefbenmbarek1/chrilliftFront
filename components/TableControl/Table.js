import React, {useEffect, useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {useState} from 'react';
import Sbtn from './Sbtn.js';
import ImgBtn from './ImgBtn.js';
import EncDec from './IncDec.js';
import {Buffer} from 'buffer';
import BleManager from 'react-native-ble-manager';
import config from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Table = ({navigation}) => {
  const [heights, setHeights] = useState([]);
  const [height, setHeight] = useState(70);
  const [
    haveWeJustReachedTheMaximumNumberOfHeights,
    setHaveWeJustReachedTheMaximumNumberOfHeights,
  ] = useState(false);
  const didWeReachTheMaximumNumberOfHeights = useRef(false);
  const [serviceUUIDOfTheConnectedDevice, setServiceUUIDOfTheConnectedDevice] =
    useState('');
  const [
    characteristicUUIDOfTheConnectedDevice,
    setCharacteristicUUIDOfTheConnectedDevice,
  ] = useState('');
  const [connectedDeviceId, setConnectedDeviceId] = useState('');
  const tablename = useRef('newTable');
  const differenceBetweenCurrentPositionAndSavedPositionThatIsGonnaBeApplied =
    useRef(0);
  const selectServiceUUID = service => {
    setServiceUUIDOfTheConnectedDevice(service);
  };
  const selectCharacteristicUUID = characteristic => {
    setCharacteristicUUIDOfTheConnectedDevice(characteristic);
  };
  const selectDeviceId = deviceId => {
    setConnectedDeviceId(deviceId);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHaveWeJustReachedTheMaximumNumberOfHeights(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [haveWeJustReachedTheMaximumNumberOfHeights]);

  useEffect(() => {
    const loadPreviouslySavedHeights = previouslySavedHeights => {
      const arr = previouslySavedHeights.map(element => ({
        text: element,
        key: Math.random().toString(),
      }));

      setHeights(arr);
    };
    const fetchSavedHeightsOfThisTable = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const response = await fetch(
          `${config.API_BASE_URL}/tableHeights/all?tableName=${tablename.current}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('problem when fetching');
        }
        const previouslySavedHeights = await response.json();
        console.log(previouslySavedHeights);
        loadPreviouslySavedHeights(previouslySavedHeights);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSavedHeightsOfThisTable();
  }, []);

  // const writeValue = value => {
  //   const buffer = Buffer.from(value, 'utf-8');
  //   console.log(buffer);
  //   BleManager.write(
  //     connectedDeviceId,
  //     serviceUUIDOfTheConnectedDevice,
  //     characteristicUUIDOfTheConnectedDevice,
  //     buffer.toJSON().data,
  //   )
  //     .then(() => {
  //       console.log('Write: ' + value);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
  const writeValue = async value => {
    try {
      const buffer = Buffer.from(value, 'utf-8');
      console.log(buffer);

      await BleManager.write(
        connectedDeviceId,
        serviceUUIDOfTheConnectedDevice,
        characteristicUUIDOfTheConnectedDevice,
        buffer.toJSON().data,
      );

      console.log('Write: ' + value);
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseNumber = () => {
    if (height > 70) {
      setHeight(heightNumber => heightNumber - 1);
      writeValue('0');
    }
  };
  const increaseNumber = () => {
    if (height < 120) {
      setHeight(heightNumber => heightNumber + 1);
      writeValue('1');
    }
  };
  const addHeight = async () => {
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
    const arrayOfHeights = ar.map(element => element.text);
    console.log('even bigger heyy', arrayOfHeights);
    console.log('heyy', tablename.current);
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${config.API_BASE_URL}/tableHeights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        selectedTableHeights: arrayOfHeights,
        tableName: tablename.current,
      }),
    });
    console.log(response.ok);
  };
  const deleteItem = async index => {
    const arr = [...heights];
    arr.splice(index, 1);
    setHeights(arr);
    if (arr.length === 8) {
      setHaveWeJustReachedTheMaximumNumberOfHeights(false);
    }
    const arrayOfHeights = arr.map(element => element.text);
    const token = await AsyncStorage.getItem('token');
    console.log('hey', tablename.current);
    const response = await fetch(`${config.API_BASE_URL}/tableHeights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        selectedTableHeights: arrayOfHeights,
        tableName: tablename.current,
      }),
    });
    console.log(response);
  };
  const applySavedHeight = async index => {
    differenceBetweenCurrentPositionAndSavedPositionThatIsGonnaBeApplied.current =
      height - heights[index].text;
    if (
      differenceBetweenCurrentPositionAndSavedPositionThatIsGonnaBeApplied.current <
      0
    ) {
      for (
        let i = 0;
        i <
        -differenceBetweenCurrentPositionAndSavedPositionThatIsGonnaBeApplied.current;
        i++
      ) {
        await writeValue('1');
      }
    } else if (
      differenceBetweenCurrentPositionAndSavedPositionThatIsGonnaBeApplied.current >
      0
    ) {
      for (
        let i = 0;
        i <
        -differenceBetweenCurrentPositionAndSavedPositionThatIsGonnaBeApplied.current;
        i++
      ) {
        await writeValue('0');
      }
    }
    setHeight(heights[index].text);
  };

  return (
    <View style={styles.appContainer}>
      {haveWeJustReachedTheMaximumNumberOfHeights && (
        <Text style={styles.errorMessage}>
          "you've reached the maximum number of saved heights for this table"
        </Text>
      )}
      <View style={styles.upContainer}>
        <Sbtn
          heightList={heights}
          deleteItem={deleteItem}
          applySavedHeight={applySavedHeight}
        />
        <ImgBtn
          navigation={navigation}
          selectCharacteristicUUID={selectCharacteristicUUID}
          selectServiceUUID={selectServiceUUID}
          selectDeviceId={selectDeviceId}
        />
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
