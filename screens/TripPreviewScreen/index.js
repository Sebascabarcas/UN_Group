import React, {useState, useEffect, useRef} from 'react';
import {useNavigationParam, useNavigation} from 'react-navigation-hooks';
// import {Divider, Button} from 'react-native-elements';
import {Button} from 'native-base';
import MapView from 'react-native-maps';
import {View, Dimensions} from 'react-native';
import styles from './styles.js';
import MyText from '../../components/MyText';
import {getRegionForCoordinates} from '../../services/LocationHelpers';
import {FontAwesome, Entypo, Foundation} from '@expo/vector-icons';
import theme from '../../styles/theme.style';
import mapStyle from '../../styles/mapStyle.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createOrder} from '../../services/Order';
import {useSelector, useDispatch} from 'react-redux';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCWPrODz1hIw-3g2gX94dTJTspvq768GOw';
const {width, height} = Dimensions.get ('window');

export default TripPreviewScreen = () => {
  const {navigate, replace} = useNavigation ();
  const mapRef = useRef (null);
  const dispatch = useDispatch();
  const {origin_location: originLocation, destiny_location: destinyLocation, actual_region: actualRegion, actual_locality: actualLocation, date, time, comment} = useSelector(state => state.location)
  // const originMarker = {lat: originLocation.coords.latitude, lng: originLocation.coords.longitude}
  // const destinyMarker = {lat: destinyLocation.coords.latitude, lng: destinyLocation.coords.longitude}
  const [mapReady, _setMapReady] = useState (false)
  const [loading, _setLoading] = useState (false)
  const [mapRegion, _setMapRegion] = useState ({
    latitude: 10.966981761315,
    longitude: -74.79788233489182,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025
  });

  _fitLatLngDestinations = async () => {
    _setMapReady(true)
    const resultRegion = getRegionForCoordinates([
      {latitude: originLocation.coords.latitude, longitude: originLocation.coords.longitude},
      {latitude: destinyLocation.coords.latitude, longitude: destinyLocation.coords.longitude},
    ])
    
    setTimeout (() => {
      mapRef.current.animateToRegion (
        resultRegion
      );
    }, 500);
  };

  _onMapReady = () => {
    mapRef.current.fitToSuppliedMarkers (
      ['1', '2'],
      {edgePadding: {top: 70, right: 50, bottom: 50, left: 50}} // not animated
    );
  };

  _createOrder = () => {
    const order = {
      start_time: `${date} ${time}`,
      origin: originLocation.structured_formatting.main_text,
      origin_lat: originLocation.coords.latitude,
      origin_lon: originLocation.coords.longitude,
      target: destinyLocation.structured_formatting.main_text,
      target_lat: destinyLocation.coords.latitude,
      target_lon: destinyLocation.coords.longitude,
    }
    dispatch({type: 'trip/CREATE_TRIP', payload: {order, navigate: replace}})
  };

    return (
      <View style={styles.container}>
        <View style={styles.previewContainer}>
          <View style={styles.mapContainer}>
            <MapView
              customMapStyle={mapStyle}
              // zoomEnabled={false}
              // scrollEnabled={false}
              ref={mapRef}
              // onRegionChange={() => this.setState({showForm: false})}
              // onRegionChangeComplete={() => this.setState({showForm: true})}
              style={{
                alignSelf: 'stretch',
                flex: 1,
                width: width - 2 * wp(5),
                height,
              }}
              region={mapRegion}
              // onMapReady={this._onMapReady}
              onMapReady={_fitLatLngDestinations}
              // showsUserLocation
            >
              {originLocation.coords &&
                mapReady &&
                <MapView.Marker
                  coordinate={originLocation.coords}
                  key={1}
                  identifier="1"
                  pinColor={'red'}
                  title="My Marker"
                  description="Some description"
                />}

              {destinyLocation.coords &&
                mapReady &&
                <MapView.Marker
                  coordinate={destinyLocation.coords}
                  key={2}
                  identifier="2"
                  pinColor={'blue'}
                  title="My Marker"
                  description="Some description"
                />}
            </MapView>
          </View>
          <View style={styles.detailsContainer}>
            <MyText fontStyle="bold" style={styles.detailsTitle}>
              Detalle de la Solicitud
            </MyText>
            {/* <Divider style={{margin: wp (1)}} /> */}
            <View style={styles.detailContainer}>
              <FontAwesome
                style={styles.iconContainer}
                name="street-view"
                color={theme.SECONDARY_COLOR}
                size={theme.ICON_SIZE_SMALL}
              />
              <MyText fontStyle="semibold" style={styles.detailText}>
                {originLocation ? originLocation.structured_formatting.main_text : 'Origen'}
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
                {destinyLocation ? destinyLocation.structured_formatting.main_text : 'Destino'}
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
                {date ? date : 'Fecha'}
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
                {time ? time : 'Hora'}
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
                {comment ? comment : 'Sin Comentarios'}
              </MyText>
            </View>
            <Button
              primary
              rounded
              block
              onPress={_createOrder}
              style={{
                width: '40%',
                marginTop: 10,
                alignSelf: 'center',
              }}
            >
              <MyText >CONFIRMAR</MyText>
            </Button>
            <Button
              rounded
              block
              transparent
              onPress={() => navigate("Home")}
              style={{
                width: '40%',
                marginTop: 10,
                alignSelf: 'center',
              }}
            >
              <MyText color={theme.PRIMARY_COLOR}>EDITAR</MyText>
            </Button>
            {/* </Button> */}
          </View>
        </View>
      </View>
    );
}
