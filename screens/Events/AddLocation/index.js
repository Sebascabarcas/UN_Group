import React, {useEffect, useState, useRef} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import MapView from 'react-native-maps';
import {
  Button,
  Container,
  Icon,
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import theme from '../../../styles/theme.style';
import mapStyle from '../../../styles/mapStyle.json';
import MyText from '../../../components/MyText';
import styles from './styles';

const {height: fullHeight} = Dimensions.get ('window');

const AddLocation = () => {
  const mapRef = useRef (null);
  const {navigate, setParams, getParam} = useNavigation ();
  const {current_group: group} = useSelector (state => state.session);
  const current_event = getParam('current_event', 'new_event')
  const {[current_event]: event} = useSelector (state => state.events);
  var mapRegion = {
    latitude: event.latitude,
    longitude: event.longitude,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421
  }
  const [marginBottom, _setMarginBottom] = useState (1);
  const dispatch = useDispatch ();
  
  useEffect (() => {
    setParams({'address': event.location})
  }, []);

  _onMapReady = () => {
    _setMarginBottom (0);
  };

  _setLocationOnRegionChanged = async region => {
    const {latitude, longitude} = region;
    dispatch({
      type: 'events/SET_STATE',
      payload: {
        [current_event]: {...event, latitude, longitude}
      }
    })
  };


  return (
    
    <Container style={styles.container}>
      <FontAwesome
        name="map-marker"
        style={{
          zIndex: 3,
          position: 'absolute',
          marginTop: -87.5,
          marginLeft: -11.5,
          left: '50%',
          top: '50%',
        }}
        size={40}
        color="#f00"
      />
      <MapView
        customMapStyle={mapStyle}
        rotateEnabled={false}
        pitchEnabled={false}
        zoomControlEnabled={true}
        // zoomEnabled={false}
        ref={mapRef}
        // onRegionChangeComplete={_setLocationOnRegionChanged}
        onRegionChangeComplete={_setLocationOnRegionChanged}
        style={{
          alignSelf: 'stretch',
          flex: 1,
          marginBottom,
          width: wp(100),
          height: hp(100),
          // borderRadius: 10
        }}
        // region={mapRegion}
        initialRegion={mapRegion}
        onMapReady={_onMapReady}
        // onRegionChange={this._handleMapRegionChange}
        // showsUserLocation
        // showsMyLocationButton
      />
      <Button
        primary
        full
        onPress={() => {
          current_event === 'new_event' ?
          dispatch({
            type:  `events/CREATE_EVENT`, 
            payload: {groupId: group.id, event, navigate}
          })
          :
          navigate ('EditEvent');
        }}
        // onPress={() => navigate('EditProfile')}
        style={styles.actionBottomButton}
      >
        <MyText
          style={{fontSize: theme.FONT_SIZE_LARGE}}
          fontStyle="bold"
          color="white"
        >
          CONFIRMAR UBICACIÓN
        </MyText>
      </Button>
    </Container>
  );
};

AddLocation.navigationOptions = ({navigation}) => {
  return {
    // title: '',
    title: navigation.getParam('address'),
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerTitleStyle: {
      fontFamily: theme.FONT_FAMILY_SEMIBOLD,
      fontSize: theme.FONT_SIZE_MEDIUM,
      color: theme.DARK_COLOR
    },
    headerLeft: (
      <Button
        style={{marginLeft: 5}}
        transparent
        onPress={() => navigation.goBack ()}
      >
        <Icon
          type="Ionicons"
          name="ios-arrow-back"
          style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.PRIMARY_COLOR}}
        />
      </Button>
    ),
  };
};

export default AddLocation;
