import './fixtimerbug'; // <<<<<<<<<<<<<<<<<<

import React, {useState} from 'react';
import { AppLoading} from 'expo';
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './redux/reducers'
import sagas from './redux/sagas'
import * as firebase from 'firebase';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {composeWithDevTools} from 'redux-devtools-extension'
import AppNavigator from './navigation/AppNavigator';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import { StyleProvider } from 'native-base';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()
const middlewares = [ sagaMiddleware]
const store = createStore(reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(sagas)
// setupInterceptors(store);
// var config = {
//   apiKey: "AIzaSyDmMC-f756i3GCUU45Fqal2rBXBUcHjwHE",
//   authDomain: "aventun-41aeb.firebaseapp.com",
//   databaseURL: "https://aventun-41aeb.firebaseio.com",
//   projectId: "aventun-41aeb",
//   storageBucket: "aventun-41aeb.appspot.com",
//   messagingSenderId: "941015886594"
// };
// firebase.initializeApp(config);



export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(platform)}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </StyleProvider>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'SFUIText': require('./assets/fonts/SFUIText-Regular.ttf'),
      'SFUIText_light': require('./assets/fonts/SFUIText-Light.ttf'),
      'SFUIText_bold': require('./assets/fonts/SFUIText-Bold.ttf'),
      'SFUIText_semibold': require('./assets/fonts/SFUIText-Semibold.ttf'),
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

