import React, {useState, useEffect, useRef} from 'react';
import {Divider} from 'react-native-elements';
import MapView from 'react-native-maps';
import {View, Animated, Dimensions} from 'react-native';
import styles from './styles.js';
import MyText from '../../components/MyText';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import theme from '../../styles/theme.style';
import Entypo from '@expo/vector-icons/Entypo';
import {useNavigationParam, useNavigation} from 'react-navigation-hooks';
import moment from 'moment';
import Foundation from '@expo/vector-icons/Foundation';
import mapStyle from '../../styles/mapStyle.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCWPrODz1hIw-3g2gX94dTJTspvq768GOw';
const { width, height } = Dimensions.get("window");

const ShowOrderScreen = () => {
  // const {navigate} = useNavigation ();
  const order = useNavigationParam ('order', {code: '', origin: '', destiny: '', comment: '', date_and_time: ''});
  const mapRef = useRef (null);
  const [mapReady, _setMapReady] = useState (false);
  const [mapRegion, _setMapRegion] = useState ({
    latitude: 10.9995259,
    longitude: -74.8030171,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [originLocation, _setOriginLocation] = useState ({coords: {latitude: parseFloat(order.origin_lat), longitude: parseFloat(order.origin_lon)}});
  const [destinyLocation, _setDestinyLocation] = useState ({coords: {longitude: parseFloat(order.target_lon), latitude: parseFloat(order.target_lat)}});

  // const [originLocation, _setOriginLocation] = useState (null);
  // const [destinyLocation, _setDestinyLocation] = useState (null);
  
  _fitLatLngDestinations = async () => {
    console.log(order);
    console.log(originLat, originLon, targetLat, targetLon);
    const originResponse = await fetch (
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${origin.place_id}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890`,
      {
        method: `get`,
      }
    );
    const originData = await originResponse.json ();
    const destinyResponse = await fetch (
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${destiny.place_id}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890`,
      {
        method: `get`,
      }
    );
    const destinyData = await destinyResponse.json ();
    const {
      geometry: {location: {lat: originLat, lng: originLng}},
    } = originData.results[0];
    const {
      geometry: {location: {lat: destinyLat, lng: destinyLng}},
    } = destinyData.results[0];
    _setOriginLocation ({coords: {latitude: originLat, longitude: originLng}});
    _setDestinyLocation ({
      coords: {latitude: destinyLat, longitude: destinyLng},
    });
    // Object {
    //   "latitude": 11.0131945,
    //   "longitude": -74.8276636,
    // } Object {
    //   "latitude": 10.9649135,
    //   "longitude": -74.79880170000001,
    // }
    // this.mapRef.fitToCoordinates([{latitude: 11.0131945, longitude: -74.8276636}, {latitude: 10.9649135, longitude: -74.79880170000001}], {
    mapRef.current.fitToCoordinates (
      [
        originLocation.coords,
        destinyLocation.coords,
      ],
      {
        edgePadding: {top: 80, right: 50, bottom: 20, left: 50},
        animated: true,
      }
    );
  };

  _onMapReady = () => {
    // let markers = ;
    // mapRef.current.fitToSuppliedMarkers (
    //   ['1', '2'],
    //   {edgePadding: {top: 70, right: 50, bottom: 50, left: 50}, animated: true} // not animated
    // );
    console.log(originLocation);
    console.log(destinyLocation);
    
    _setMapReady (true);
    setTimeout (() => {
      mapRef.current.fitToCoordinates (
        [originLocation.coords, destinyLocation.coords],
        {
          edgePadding: {top: 80, right: 50, bottom: 20, left: 50},
          animated: true,
        }
      );
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        
          <MapView
            customMapStyle={mapStyle}
            region={mapRegion}
            // zoomEnabled={false}
            // scrollEnabled={false}
            // mapPadding={{top: 0, left: 0, right: 0, bottom: wp (50)}}
            ref={mapRef}
            // onRegionChange={() => this.setState({showForm: false})}
            // onRegionChangeComplete={() => this.setState({showForm: true})}
            style={{
              alignSelf: 'stretch',
              flex: 1,
              height, 
              width
              // borderRadius: 10
            }}
            onMapReady={_onMapReady}
            // onMapReady={_fitLatLngDestinations}
            // onRegionChange={_handleMapRegionChange}
            // showsUserLocation
          >
            {mapReady && originLocation && <MapView.Marker
              coordinate={originLocation.coords}
              key={1}
              identifier="1"
              pinColor={'red'}
              title="Origin"
              description="Origen"
            />}

            {mapReady && destinyLocation && <MapView.Marker
              coordinate={destinyLocation.coords}
              key={2}
              identifier="2"
              pinColor={'blue'}
              title="Destiny"
              description="Destino"
            />}
          </MapView>
        {/* <Button title='Show panel' onPress={() => _panel.show()} />
          <Button title='Hide panel' onPress={() => _panel.hide()} /> */}
      </View>
      <View style={styles.detailsContainer}>
        <MyText fontStyle="bold" style={styles.detailsTitle}>
          Detalle de la Solicitud
        </MyText>
        <Divider style={{margin: wp (1)}} />
        <View style={styles.detailContainer}>
          <FontAwesome
            style={styles.iconContainer}
            name="street-view"
            color={theme.SECONDARY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
          <MyText fontStyle="semibold" style={styles.detailText}>
            {order.origin ? order.origin : 'Origen'}
          </MyText>
        </View>
        <View style={styles.detailContainer}>
          <Entypo
            style={{...styles.iconContainer, marginLeft: 2}}
            name="dots-three-vertical"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_EXTRA_SMALL}
          />
        </View>
        <View style={styles.detailContainer}>
          <FontAwesome
            style={styles.iconContainer}
            name="dot-circle-o"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
          <MyText fontStyle="semibold" style={styles.detailText}>
            {order.destiny ? order.destiny : 'Destino'}
          </MyText>
        </View>
        <View style={{...styles.detailContainer, marginTop: 8}}>
          <FontAwesome
            style={styles.iconContainer}
            name="calendar"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
          <MyText fontStyle="semibold" style={styles.detailText}>
            {order.date_and_time
              ? moment (order.date_and_time).format ('DD-MM-YYYY')
              : 'Fecha'}
          </MyText>
        </View>
        <View style={{...styles.detailContainer, marginTop: 8}}>
          <FontAwesome
            style={styles.iconContainer}
            name="clock-o"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
          <MyText fontStyle="semibold" style={styles.detailText}>
            {order.date_and_time ? moment (order.date_and_time).format ('hh:mm a') : 'Hora'}
          </MyText>
        </View>
        <View style={{...styles.detailContainer, marginTop: 8}}>
          <Foundation
            style={styles.iconContainer}
            name="comment"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
          <MyText fontStyle="semibold" style={styles.detailText}>
            {order.comment ? order.comment : 'Sin Comentarios'}
          </MyText>
        </View>
      </View>
    </View>
  );
};

ShowOrderScreen.navigationOptions = ({navigation}) => {
  const order = navigation.getParam('order', {})
  return {
    title: order.code
  }
};

export default ShowOrderScreen;
