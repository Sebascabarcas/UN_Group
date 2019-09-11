import React, {useState, useEffect, useRef} from 'react';
import {SearchBar} from 'react-native-elements';
import {Button} from 'native-base';
import MapView from 'react-native-maps';
import {
  View,
  Dimensions,
  Animated,
  ScrollView,
  Keyboard,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import styles from './styles.js';
import {
  convertGeocodingResults,
  getRegionForCoordinates,
} from '../../services/LocationHelpers';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import MyText from '../../components/MyText';
import theme from '../../styles/theme.style';
import mapStyle from '../../styles/mapStyle.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCWPrODz1hIw-3g2gX94dTJTspvq768GOw';
const ChooseLocationScreen = () => {
  const {navigate} = useNavigation ();
  const dispatch = useDispatch ();
  const _searchAddress = useRef (null);
  const _panel = useRef (null);
  const mapRef = useRef (null);
  const actionType = useNavigationParam ('type');
  const [moveRegion, _setMoveRegion] = useState (useNavigationParam ('moveRegion'));
  const {actual_region: mapRegion, actual_locality: actualLocation} = useSelector(state => state.location)
  const [marginBottom, _setMarginBottom] = useState (1);
  const [searchLoading, _setSearchLoading] = useState (false);
  const [slideSearchLoading, _setSlideSearchLoading] = useState (false);
  const [slideSearch, _setSlideSearch] = useState (null);
  const [search, _setSearch] = useState (null);
  const [location, _setLocation] = useState ({});
  const [resultRegion, _setResultRegion] = useState ({});
  const [predictions, _setPredictions] = useState ([]);
  const {width, height} = Dimensions.get ('window');

  _onMapReady = () => {
    _setMarginBottom (0);
  };

  placePressed = place => {
    _panel.current.hide ();
    Keyboard.dismiss ();
    const {structured_formatting: {main_text}} = place;
    const newLocation = {structured_formatting: {main_text}}
    _setSlideSearch (main_text);
    _setSearch (main_text);
    _getPlaceLocation (place.place_id, newLocation);
  };

  _getPlaceLocation = async (place_id, location_object) => {
    const response = await fetch (
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890`,
      {
        method: `get`,
      }
    );
    const data = await response.json ();
    console.log(data.results[0])
    const {
      geometry: {location: {lat: latitude, lng: longitude}},
    } = data.results[0];
    // console.log(data.results[0]);
    
    location_object.coords = {latitude, longitude}
    _setLocation(location_object)
    const _resultRegion = {...mapRegion, ...{latitude, longitude}};
    // dispatch({type: 'location/SET_STATE', payload: {actual_region: {...mapRegion, ...resultRegion}}})
    
    console.log(_resultRegion);
    _setMoveRegion(true)
    _setResultRegion(_resultRegion)
    mapRef.current.animateToRegion (_resultRegion);
  };

  sendPlace = () => {
    const {latitude, longitude} = resultRegion
    if (actionType === 'origin') dispatch({type: 'location/SET_STATE', payload: {actual_region: {...mapRegion, ...{latitude, longitude}}}})
    dispatch ({type: 'location/SET_STATE', payload: {[`${actionType}_search`]: search, [`${actionType}_location`]: location}});
    navigate ('Home');
  };

  updateSearch = async text => {
    if (text) {
      _setSlideSearchLoading (true);
      _setSlideSearch (text);
      let _text = text.replace (/#/g, '');
      const response = await fetch (
        // `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${_text}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890&country=CO&location=10.966981761315,-74.79788233489182&radius=35`,
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${_text}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890&country=CO&location=${actualLocation.latitude},${actualLocation.longitude}&radius=${actualLocation.radius}`,
        {
          method: `get`,
        }
      );
      const data = await response.json ();
      // return data[1];
      _setSlideSearchLoading (false);
      _setPredictions (data.predictions);
    } else {
      _setSlideSearchLoading (false);
      _setSlideSearch ('');
      _setPredictions ([]);
    }
  };

  _setLocationOnRegionChanged = async region => {
    const {latitude, longitude} = region;
    if (!moveRegion) {
      _setSearchLoading (true);
      const response = await fetch (
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890`,
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}&result_type=street_address&sessiontoken=1234567890`,
        {
          method: `get`,
        }
      );
      const data = await response.json ();
      let newLocations = convertGeocodingResults (data.results);
      console.log (
        'vergggg------------------------------------------------------------------>>>>>>>>>>>>>>>>>>>'
      );
      console.log (data.results);
      console.log (
        'vergggg------------------------------------------------------------------>>>>>>>>>>>>>>>>>>>'
      );
      _setSearch (newLocations[0].structured_formatting.main_text);
      _setLocation ({
        coords: {latitude, longitude},
        structured_formatting: {
          main_text: newLocations[0].structured_formatting.main_text,
        },
      })
      _setSlideSearch (newLocations[0].structured_formatting.main_text);
      _setResultRegion(region)
      _setSearchLoading (false);
    }
    _setMoveRegion(false)
  };

  const foundPlaces = actionType === 'origin' || actionType === 'destiny'
    ? predictions.map (place => (
        <TouchableHighlight
          key={place.place_id}
          underlayColor="transparent"
          onPress={() => placePressed (place)}
        >
          <View style={styles.placeContainer}>
            {actionType === 'destiny'
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
  // console.log(foundPlaces)
  return (
    <View style={styles.container}>
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
          width,
          height,
          // borderRadius: 10
        }}
        initialRegion={mapRegion}
        onMapReady={_onMapReady}
        // onRegionChange={this._handleMapRegionChange}
        showsUserLocation
        showsMyLocationButton
      />
      <SlidingUpPanel
        allowDragging={false}
        // showBackdrop={false}
        friction={0.5}
        height={height - 15}
        ref={_panel}
        containerStyle={styles.slidingPanel}
        draggableRange={{
          bottom: -10,
          top: height - 15,
        }}
        // draggableRange={this.props.draggableRange}
        animatedValue={new Animated.Value (-10)}
      >
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <SearchBar
              ref={_searchAddress}
              placeholder={actionType === 'origin' ? 'Origen...' : 'Destino...'}
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
              showLoading={slideSearchLoading}
              onFocus={_openInput}
              inputContainerStyle={{backgroundColor: 'transparent'}}
              containerStyle={{
                width: '100%',
                backgroundColor: 'transparent',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}
              onChangeText={updateSearch}
              value={slideSearch}
            />
          </View>
          <ScrollView style={styles.panel}>
            {foundPlaces}
          </ScrollView>
          <Button
            transparent
            // primary
            // block
            // small
            style={{...styles.actionPanel}}
            onPress={() => {
              _panel.current.hide ();
              // Keyboard.dismiss ();
            }}
          >
            <MyText color={theme.PRIMARY_COLOR}>Cerrar</MyText>
          </Button>
        </View>
      </SlidingUpPanel>
      <View style={styles.addressForm}>
        <SearchBar
          placeholder={actionType === 'origin' ? 'Origen...' : 'Destino...'}
          searchIcon={
            actionType === 'destiny'
              ? <FontAwesome
                  style={styles.iconContainer}
                  name="street-view"
                  color={theme.SECONDARY_COLOR}
                  size={theme.ICON_SIZE_SMALL}
                />
              : <FontAwesome
                  style={styles.iconContainer}
                  name="dot-circle-o"
                  color={theme.PRIMARY_COLOR}
                  size={theme.ICON_SIZE_SMALL}
                />
          }
          lightTheme
          showLoading={searchLoading}
          onFocus={() => {
            console.log ('tratando de subir esta vaina');
            _panel.current.show ({toValue: height - 15, velocity: 10000000});
            _searchAddress.current.focus ();
          }}
          inputContainerStyle={{backgroundColor: 'transparent'}}
          containerStyle={{
            width: '100%',
            backgroundColor: 'transparent',
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}
          // onChangeText={updateSearch}
          value={search}
        />
        <Button
          block
          rounded 
          primary
          // loading={searchLoading}
          style={{
            width: '90%',
            marginVertical: 10,
            // paddingBottom: 20,
            alignSelf: 'center',
          }}
          onPress={sendPlace}
        >
          <MyText>SELECCIONAR</MyText>
        </Button>
        {/* <Button
          block
          // rounded 
          // primary
          transparent
          // loading={searchLoading}
          style={{
            width: '90%',
            marginVertical: 10,
            // paddingBottom: 20,
            alignSelf: 'center',
          }}
          onPress={() => navigate.goBack()}
        >
          <MyText color={theme.PRIMARY_COLOR}>VOLVER</MyText>
        </Button> */}
      </View>
    </View>
  );
};

ChooseLocationScreen.navigationOptions = ({navigation}) => {
  
  return {
    title: ``,
    // title: `ESCOJA SU ${navigation.getParam('type') === 'origin' ? 'ORIGEN' : 'DESTINO'}`,
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerLeft: (
      <Button
        // block
        style={{marginLeft: 20}}
        iconLeft transparent
        onPress={() => navigation.goBack()}
      >
        <FontAwesome
            name="arrow-left"
            color={theme.HEADER_MENU_TITLE_COLOR}
            size={theme.ICON_SIZE_SMALL}
          />
      </Button>
    )
  }
}

export default ChooseLocationScreen; 