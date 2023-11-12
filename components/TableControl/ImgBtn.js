import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import BleManager from 'react-native-ble-manager';
import {ActivityIndicator} from 'react-native-paper';

const ImgBtn = ({navigation, selectCharacteristicUUID, selectServiceUUID}) => {
  const devices = useRef([]);
  const [device, setDevice] = useState('');
  const targetServicesUUID = useRef(['4fafc201-1fb5-459e-8fcc-c5c9c331914b']);
  const [scanHasStarted, setScanHasStarted] = useState(false);
  const targetCharacteriticsUUID = useRef([
    'beb5483e-36e1-4688-b7f5-ea07361b26a8',
  ]);

  const imageSources = useRef([
    require('../../images/table.jpg'),
    require('../../images/chilift.png'),
  ]);

  async function checkPermissions() {
    try {
      const grantedFineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(
        'ACCESS_FINE_LOCATION',
        grantedFineLocation === PermissionsAndroid.RESULTS.GRANTED,
      );

      const grantedCoarseLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      console.log(
        'ACCESS_COARSE_LOCATION',
        grantedCoarseLocation === PermissionsAndroid.RESULTS.GRANTED,
      );

      const grantedBluetoothScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      );
      console.log(
        'BLUETOOTH_SCAN',
        grantedBluetoothScan === PermissionsAndroid.RESULTS.GRANTED,
      );

      const grantedBluetoothConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      );
      console.log(
        'BLUETOOTH_CONNECT',
        grantedBluetoothConnect === PermissionsAndroid.RESULTS.GRANTED,
      );
    } catch (err) {
      console.warn(err);
    }
  }

  const delay = milliseconds => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  };

  const startScan = async () => {
    setScanHasStarted(true);
    try {
      await BleManager.scan(targetServicesUUID.current, 5, false, {});
      await delay(5000);
      const discoveredDevices = await BleManager.getDiscoveredPeripherals([]);
      // devices.current = discoveredDevices.filter(async discoveredDevice => {
      //   const retrievedServicesForDiscoveredDevice =
      //     await BleManager.retrieveServices(discoveredDevice.id);
      //   return targetServicesUUID.current.some(targetServiceUUID =>
      //     retrievedServicesForDiscoveredDevice.some(
      //       service => service.uuid === targetServiceUUID,
      //     ),
      //   );
      // });
      devices.current = discoveredDevices;
      console.log('discoveredPeripherals:', devices.current);
      await stopScan();
    } catch (error) {
      console.error('Error starting scan:', error);
    } finally {
      setScanHasStarted(false);
    }
  };

  const stopScan = async () => {
    try {
      await BleManager.stopScan();
      console.log('scan stopped');
    } catch (error) {
      console.error('Error stopping scan:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initialScan = async () => {
      await checkPermissions();
      await BleManager.enableBluetooth();
      console.log('Bluetooth is already enabled');
      await BleManager.start({showAlert: true});
      console.log('BleManager started');
      await startScan();
    };
    initialScan();
  }, []);

  const connectToDevice = async () => {
    try {
      if (devices.current.length === 0) {
        console.log('no devices can be connected to');
        return;
      }
      if (device !== '') {
        await BleManager.disconnect(device.id);
        setDevice('');
        console.log('disconnect');
        return;
      }
      console.log(
        `Connecting to device: ${devices.current[0].name} (${devices.current[0].id})`,
      );
      await BleManager.connect(devices.current[0].id);
      setDevice(devices.current[0]);
      console.log(
        `Connected to device: ${devices.current[0].name} (${devices.current[0].id})`,
      );
      const information = await BleManager.retrieveServices(
        devices.current[0].id,
      );
      console.log(information);
      const targetServices = information.services.filter(service =>
        targetServicesUUID.current.includes(service.uuid),
      );
      if (!targetServices) {
        await BleManager.disconnect(devices.current[0].id);
        setDevice('');
      }
      selectServiceUUID(targetServices[0].uuid);
      const targetCharacteristics = information.characteristics.filter(
        characteristic =>
          targetCharacteriticsUUID.current.includes(
            characteristic.characteristic,
          ),
      );
      if (!targetCharacteristics) {
        await BleManager.disconnect(devices.current[0].id);
        setDevice('');
      }
      selectCharacteristicUUID(targetCharacteristics[0].characteristic);
    } catch (error) {
      console.error(
        `Failed to connect to device: ${devices.current[0].name}(${devices.current[0].id})\n`,
        error,
      );
      setDevice('');
    }
  };

  // const handleShowScannerPress = () => {
  //   navigation.navigate('HiddenNavigator', {screen: 'Scanner'});
  //   // setShowBleScanner(!showBleScanner);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../images/chilift.png')}
          style={styles.logo}
        />
        <Pressable
          style={styles.connectButton}
          onPress={connectToDevice}
          disabled={scanHasStarted}>
          <Text style={styles.connectButtonText}>
            {device ? 'Disconnect' : 'Connect'}
          </Text>
          <Feather name="bluetooth" size={17} style={styles.connectIcon} />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        {scanHasStarted ? (
          <ActivityIndicator size="large" color="#5F7045" />
        ) : (
          <>
            <Swiper showsButtons={false} showsPagination={false} loop={true}>
              {imageSources.current.map((source, index) => (
                <View key={index}>
                  <Image source={source} style={styles.image} />
                </View>
              ))}
            </Swiper>
            <Pressable style={styles.showScannerButton} onPress={startScan}>
              <Text style={styles.showScannerButtonText}>Scan for tables</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '90%',
  },
  logo: {
    width: '50%',
    height: '100%',
    resizeMode: 'contain',
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5F7045',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    opacity: 0.8,
    disabled: {
      opacity: 0.5,
    },
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 17,
    marginRight: 10,
    textTransform: 'uppercase',
  },
  connectIcon: {
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 50,
    resizeMode: 'stretch',
    borderColor: '#5F7045',
    borderWidth: 2,
    marginBottom: 20,
  },
  showScannerButton: {
    backgroundColor: '#5F7045',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  showScannerButtonText: {
    color: '#fff',
    fontSize: 17,
    textTransform: 'uppercase',
  },
});

export default ImgBtn;
