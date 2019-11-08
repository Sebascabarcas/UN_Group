import React, {useRef, useState, useEffect} from 'react';
import {Header, SearchBar, Input} from 'react-native-elements';
import {Button} from 'native-base';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {DrawerActions} from 'react-navigation';
import {
  View,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import styles from './styles.js';
import MyText from '../../components/MyText';
import {FontAwesome, Foundation} from '@expo/vector-icons';
import locations from '../../constants/Locations';
import theme from '../../styles/theme.style';
import {
  getRegionForCoordinates,
  convertGeocodingResults,
} from '../../services/LocationHelpers';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {TouchableHighlight} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import mapStyle from '../../styles/mapStyle.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OrderForm from '../../components/OrderForm';
import {useSelector, useDispatch} from 'react-redux';

const TAB_BAR_HEIGHT = 0;
const GOOGLE_MAPS_APIKEY = 'AIzaSyCWPrODz1hIw-3g2gX94dTJTspvq768GOw';
const TASK = 'startRide';
var onTrip = false;
const {width, height} = Dimensions.get ('window');

const HomeScreen = () => {
  const {navigate, goBack, closeDrawer, toggleDrawer} = useNavigation ();
  const dispatch = useDispatch ();
  const {
    origin_location: originLocation,
    origin_predictions: originPredictions,
    destiny_predictions: destinyPredictions,
    destiny_location: destinyLocation,
    origin_search: originSearch,
    destiny_search: destinySearch,
    actual_region: actualRegion,
    actual_locality: actualLocation,
    date,
    time,
    comment,
  } = useSelector (state => state.location);
  const search = {originSearch, destinySearch};
  const predictions = {originPredictions, destinyPredictions};
  const mapRef = useRef (null);
  const _panel = useRef (null);
  const [routeValue, _setRouteValue] = useState ([]);
  const [modeDateTimePicker, _setModeDateTimePicker] = useState ('date');
  const [drawerSize, _setDrawerSize] = useState (null);
  const [marginBottom, _setMarginBottom] = useState (1);
  const [actionType, _setActionType] = useState (null);
  const [showForm, _setShowForm] = useState (true);
  const [isDateTimePickerVisible, _setIsDateTimePickerVisible] = useState (
    false
  );
  const [searchLoading, _setSearchLoading] = useState (false);
  const [formLoading, _setFormLoading] = useState (false);
  const [mapReady, _setMapReady] = useState (false);

  useEffect (() => {
    _getLocationAsync ();
  }, []);

  _getLocationAsync = async () => {
    _setFormLoading (true);
    let currentLocation = await Location.getCurrentPositionAsync ();
    const {coords: {latitude, longitude}} = currentLocation;
    const newCoordinate = {latitude, longitude};
    const resultRegion = getRegionForCoordinates ([{...newCoordinate}]);
    dispatch ({
      type: 'location/SET_STATE',
      payload: {actual_region: resultRegion},
    });
    const response = await fetch (
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890`,
      {
        method: `get`,
      }
    );
    const data = await response.json ();
    let initOrigin = convertGeocodingResults ([data.results[0]])[0];
    dispatch ({
      type: 'location/SET_STATE',
      payload: {
        origin_search: initOrigin.structured_formatting.main_text,
        origin_location: initOrigin,
      },
    });
    //////////////////////////
    const getLocality = geoLocations => {
      for (var i = 0; i < geoLocations.length; i++) {
        for (var j = 0; j < geoLocations[i].address_components.length; i++) {
          if (geoLocations[i].address_components[j].types.indexOf ('locality') !== -1) return geoLocations[i].address_components[j].short_name;
        }
      }
    };
    let locality = getLocality (data.results);
    //////////////////////////////////
    dispatch ({
      type: 'location/SET_STATE',
      payload: {actual_locality: locations[locality], locality},
    });
    // mapRef.current.animateToRegion (resultRegion);
    _setFormLoading (false);
  };

  _openInput = type => {
    // this.searchHeader.show ();
    _setActionType (type);
    const toValue = type === 'comment' ? 110 : hp (60);
    _panel.current.show ({toValue, velocity: 10000});
    // this._panel.show ({toValue: 110});
  };

  _checkFields = () => {
    if (!originLocation.structured_formatting.main_text)
      return _openInput ('origin');
    if (!destinyLocation.structured_formatting.main_text)
      return _openInput ('destiny');
    if (!date) return showDateTimePicker ('date');
    if (!time) return showDateTimePicker ('time');
    navigate ('TripPreview');
  };

  _onMapReady = () => {
    _setMarginBottom (0);
    _setMapReady (true);
  };

  _beginTrip = () => {
    _setDrawerSize (700);
  };

  placePressed = place => {
    _panel.current.hide ();
    Keyboard.dismiss ();
    const {structured_formatting: {main_text}} = place;
    const newLocation = {structured_formatting: {main_text}};
    actionType === 'origin'
      ? dispatch ({
          type: 'location/SET_STATE',
          payload: {
            origin_location: {
              ...originLocation,
              ...{structured_formatting: {main_text}},
            },
          },
        })
      : dispatch ({
          type: 'location/SET_STATE',
          payload: {
            destiny_location: {
              ...destinyLocation,
              ...{structured_formatting: {main_text}},
            },
          },
        });
    _getPlaceLocation (actionType, newLocation, place.place_id);
  };

  _getPlaceLocation = async (type, location_object, place_id) => {
    const response = await fetch (
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890`,
      {
        method: `get`,
      }
    );
    const data = await response.json ();
    const {
      geometry: {location: {lat: latitude, lng: longitude}},
    } = data.results[0];
    location_object.coords = {latitude, longitude};
    if (type === 'origin') {
      dispatch ({
        type: 'location/SET_STATE',
        payload: {
          origin_location: location_object,
          actual_region: {...actualRegion, ...{latitude, longitude}}
        },
      });
    } else {
      dispatch ({
        type: 'location/SET_STATE',
        payload: {
          destiny_location: location_object,
        },
      });
    }
  };

  _fitLatLngDestination = destination => {
    mapRef.current.animateToRegion ({
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
      ...destination,
    });
  };

  updateSearch = async text => {
    if (text) {
      _setSearchLoading (true);
      dispatch ({
        type: 'location/SET_STATE',
        payload: {[`${actionType}_search`]: text},
      });
      let _text = text.replace (/#/g, '');
      const response = await fetch (
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${_text}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890&country=CO&location=${actualLocation.latitude},${actualLocation.longitude}&radius=${actualLocation.radius}`,
        {
          method: `get`,
        }
      );
      const data = await response.json ();
      dispatch ({
        type: 'location/SET_STATE',
        payload: {[`${actionType}_predictions`]: data.predictions},
      });
      _setSearchLoading (false);
    } else {
      _setSearchLoading (false);
      dispatch ({
        type: 'location/SET_STATE',
        payload: {[`${actionType}_search`]: text},
        [`${actionType}Predictions`]: [],
      });
    }
  };

  showDateTimePicker = mode => {
    _setModeDateTimePicker (mode);
    _setIsDateTimePickerVisible (true);
  };

  hideDateTimePicker = () => {
    _setIsDateTimePickerVisible (false);
  };

  handleDatePicked = date => {
    _setIsDateTimePickerVisible (false);
    _setModeDateTimePicker (modeDateTimePicker);
    modeDateTimePicker === 'date'
      ? dispatch ({
          type: 'location/SET_STATE',
          payload: {date: moment (date).format ('YYYY-MM-DD')},
        })
      : dispatch ({
          type: 'location/SET_STATE',
          payload: {time: moment (date).format ('hh:mm A')},
        });
    // hideDateTimePicker ();
    _setIsDateTimePickerVisible (false);
    // console.log(new Date (moment (date).format ('MM-DD-YYYY')))
    // console.log(new Date (date))
  };

  // const {top, bottom} = this.props.draggableRange;

  // const draggedValue = this._draggedValue.interpolate ({
  //   inputRange: [bottom, top],
  //   outputRange: [0, 1],
  //   extrapolate: 'clamp',
  // });
  const foundPlaces = actionType === 'origin' || actionType === 'destiny'
    ? predictions[`${actionType}Predictions`].map (place => (
        <TouchableHighlight
          key={place.place_id}
          underlayColor="transparent"
          onPress={() => placePressed (place)}
        >
          <View style={styles.placeContainer}>
            {actionType === 'destiny'
              ? <FontAwesome
                  style={{...styles.iconContainer, marginRight: 20}}
                  name="dot-circle-o"
                  color={theme.PRIMARY_COLOR}
                  size={theme.ICON_SIZE_SMALL}
                />
              : <FontAwesome
                  style={{...styles.iconContainer, marginRight: 20}}
                  name="street-view"
                  color={theme.SECONDARY_COLOR}
                  size={theme.ICON_SIZE_SMALL}
                />}
            <View>
              <MyText fontStyle="semibold" style={styles.placeMainText}>
                {place.structured_formatting.main_text}
              </MyText>
              <MyText fontStyle="regular" style={styles.placeSecondaryText}>
                {place.structured_formatting.secondary_text}
              </MyText>
            </View>
          </View>
        </TouchableHighlight>
      ))
    : [];
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'transparent'}}
      contentContainerStyle={{backgroundColor: 'transparent'}}
      behavior="padding"
      enabled
    >
      <View style={styles.container}>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          date={new Date (date)}
          minimumDate={new Date ()}
          mode={modeDateTimePicker}
          onCancel={hideDateTimePicker}
        />
        <View style={styles.mapContainer}>
          <MapView
            rotateEnabled={false}
            pitchEnabled={false}
            customMapStyle={mapStyle}
            mapPadding={{top: 0, left: 0, right: 0, bottom: wp (50)}}
            ref={mapRef}
            // onRegionChange={this._moveMarker}
            // onRegionChangeComplete={this._moveMarker}
            style={{
              // alignSelf: 'stretch',
              flex: 1,
              height,
              width,
              marginBottom,
            }}
            region={actualRegion}
            onMapReady={_onMapReady}
            // onRegionChange={this._handleMapRegionChange}
            showsUserLocation
            showsMyLocationButton
          >
            {originLocation.coords.latitude &&
              mapReady &&
              <MapView.Marker
                coordinate={originLocation.coords}
                pinColor={'blue'}
                title="My Marker"
                description="Some description"
              />}
          </MapView>
        </View>
        {/* {showForm &&  */}
        <OrderForm
          origin={
            originLocation && originLocation.structured_formatting.main_text
          }
          destiny={
            destinyLocation && destinyLocation.structured_formatting.main_text
          }
          date={date}
          formLoading={formLoading}
          time={time}
          comment={comment}
          openInput={_openInput}
          showDateTimePicker={showDateTimePicker}
          checkFields={_checkFields}
          containerStyle={styles.formContainer}
        />

        <SlidingUpPanel
          allowDragging={false}
          // showBackdrop={false}
          friction={0.5}
          height={actionType === 'comment' ? 110 : hp (60)}
          ref={_panel}
          containerStyle={styles.slidingPanel}
          draggableRange={{
            bottom: -10,
            top: actionType === 'comment' ? 110 : hp (60),
          }}
          // draggableRange={this.props.draggableRange}
          animatedValue={new Animated.Value (-10)}
        >
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              {actionType !== 'comment'
                ? <SearchBar
                    placeholder={
                      actionType === 'origin' ? 'Origen...' : 'Destino...'
                    }
                    searchIcon={
                      actionType === 'destiny'
                        ? <FontAwesome
                            style={styles.iconContainer}
                            name="dot-circle-o"
                            color={theme.PRIMARY_COLOR}
                            size={theme.ICON_SIZE_SMALL}
                          />
                        : <FontAwesome
                            style={styles.iconContainer}
                            name="street-view"
                            color={theme.SECONDARY_COLOR}
                            size={theme.ICON_SIZE_SMALL}
                          />
                    }
                    lightTheme
                    showLoading={searchLoading}
                    inputContainerStyle={{backgroundColor: 'transparent'}}
                    containerStyle={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      borderTopStartRadius: 20,
                      borderTopEndRadius: 20,
                    }}
                    onChangeText={updateSearch}
                    value={search[`${actionType}Search`]}
                  />
                : <Input
                    placeholderTextColor="#ABABAB"
                    inputStyle={{color: '#ABABAB'}}
                    placeholder="Comentario..."
                    leftIcon={
                      <Foundation
                        style={styles.iconContainer}
                        name="comment"
                        color={theme.PRIMARY_COLOR}
                        size={theme.ICON_SIZE_SMALL}
                      />
                    }
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                      marginLeft: -wp (2),
                    }}
                    value={comment}
                    onChangeText={comment =>
                      dispatch ({
                        type: 'location/SET_STATE',
                        payload: {comment},
                      })}
                  />}
            </View>
            {actionType !== 'comment' &&
              <ScrollView style={styles.panelPlaces}>

                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    _panel.current.hide ();
                    navigate ('ChooseLocationOnMap', {
                      type: actionType,
                      moveRegion: !!search[`${actionType}Search`]
                    });
                  }}
                >
                  <View style={styles.placeContainer}>
                    <FontAwesome
                      style={{...styles.iconContainer, marginRight: 20}}
                      name="map-marker"
                      color={
                        actionType === 'origin'
                          ? theme.SECONDARY_COLOR
                          : theme.PRIMARY_COLOR
                      }
                      size={theme.ICON_SIZE_MEDIUM}
                    />
                    <View style={{alignSelf: 'center'}}>
                      <MyText
                        fontStyle="semibold"
                        style={styles.placeMainText}
                      >
                        Ubicar en el mapa
                      </MyText>
                    </View>
                  </View>
                </TouchableHighlight>
                {foundPlaces}
              </ScrollView>}
            <View style={styles.actionPanelContainer}>
              <Button
                transparent
                onPress={() => {
                  Keyboard.dismiss ();
                  _panel.current.hide ();
                }}
                style={{height: 25, ...styles.actionPanel}}
              >
                <MyText
                  fontStyle="bold"
                  style={{fontSize: theme.FONT_SIZE_LARGE}}
                  color={theme.PRIMARY_COLOR}
                >
                  Listo
                </MyText>
              </Button>
              <Button
                transparent
                onPress={() => {
                  Keyboard.dismiss ();
                  _panel.current.hide ();
                  dispatch ({
                    type: 'location/SET_STATE',
                    payload: {comment: null},
                  });
                }}
                style={{height: 25, ...styles.actionPanel}}
              >
                <MyText
                  fontStyle="bold"
                  style={{fontSize: theme.FONT_SIZE_LARGE}}
                  color={theme.PRIMARY_COLOR}
                >
                  Cerrar
                </MyText>
              </Button>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    </KeyboardAvoidingView>
  );
};
export default HomeScreen;
