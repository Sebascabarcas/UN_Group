import React, {useState, useEffect, useRef, Fragment} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import getEnvVars from '../../../environment.js';
import {
  sliderWidth,
  itemWidth,
} from '../../../components/EventSliderEntry/styles.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import CardEvent from '../../../components/CardEvent/index.js';
import Images from '../../../constants/Images.js';
import NoResults from '../../../components/NoResults/index.js';
import { Content } from 'native-base';
import EventSliderEntry from '../../../components/EventSliderEntry/index.js';
import MapView from 'react-native-maps';
import mapStyle from '../../../styles/mapStyle.json';
import Locations from '../../../constants/Locations.js';
import * as Permissions from 'expo-permissions';

const {height: fullHeight} = Dimensions.get ('window');


const SliderCarousel = ({carouselRef, data, renderItem, onSnapToItem}) => {
  return (
          <Carousel
            ref={carouselRef}
            data={data}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            onSnapToItem={(eventIndex) => onSnapToItem(eventIndex)}
            // onLayout={(ev) => handleChangeRegion(ev)}	
            itemWidth={itemWidth}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={1}
            enableMomentum={true}
            activeSlideAlignment={'start'}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            activeAnimationType={'spring'}
            activeAnimationOptions={{
                friction: 4,
                tension: 40
            }}
          />
  );
}

EventsScreen = () => {
  const dispatch = useDispatch()
  const mapRef = useRef (null);
  const carouselRef = useRef (null);
  const {navigate, setParams} = useNavigation ();
  const [offSet, _setOffSet] = useState (0);
  const flatList = useRef (null);
  const {
    events,
    more_pages,
    loading,
    refreshing
  } = useSelector (state => state.events);
  // console.log(events);
  const [mapRegion, _setMapRegion] = useState ({
    latitude: Locations['Barranquilla'].latitude,
    longitude: Locations['Barranquilla'].longitude,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421
  });
  const [eventCoordinates, _setEventCoordinates] = useState (null)
  const [mapReady, _setMapReady] = useState (false);
  const [marginBottom, _setMarginBottom] = useState (1);
  const [eventsReady, _setEventsReady] = useState (false);
  const {isSuperAdmin, current_user: {id: userId}} = useSelector (state => state.session);
  const [filtering, _setFiltering] = useState (false);
  const [filter, _setFilter] = useState ('all');
  // const [events, _setEvents] = useState ([]);
 
  /* 
  useEffect (
    () => {
      const fetchEvents = async () => {
        // _setLoading (true);
        try {
          flatList.current.scrollToOffset ({animated: true, offset: 0});
          const _events = await getEvent ()
          _setEvents (_events);
          _setPage (1);
          _setNoMorePages (false);
        } catch (error) {
          console.log (error.response);
        }
        // _setLoading (false);
      };

      fetchEvents ();
    },
    [filter]
  ); */
 
  getPermissionAsync = async () => {
    const {status} = await Permissions.askAsync (
      Permissions.LOCATION
    );
    if (status !== 'granted') {
      alert ('Sorry, we need camera roll permissions to make this work!');
    }
  };

  useEffect (() => {
    getPermissionAsync ();
  }, []);


  useEffect (() => {
    dispatch({
      type: 'events/GET_EVENTS',
      userId,
      isSuperAdmin
    })
  }, [dispatch]);

  useEffect (() => {
    if (events[0]) {
      let {latitude, longitude} = events[0] 
      latitude = parseFloat(latitude)
      longitude = parseFloat(longitude)
      _setMapRegion({...mapRegion, latitude, longitude})
      _setEventCoordinates({latitude, longitude})
      _setEventsReady(true)
    }
  }, [events]);

  _fetchEventsOnEnd = async () => {
    // console.log(events);
    try {
      dispatch({
        type: 'events/GET_EVENTS',
        userId,
        isSuperAdmin,
        concat: true
      })
    } catch (error) {
      console.log (error);
    }
  };

  _onRefresh = async () => {
    try {
      dispatch({
        type: 'events/GET_EVENTS',
        userId,
        isSuperAdmin
      })
    } catch (error) {
      console.log (error);
    }
  };

  _onPressEvent = (event) => {
    dispatch({
      type: 'events/SET_STATE',
      payload: { current_event: {...event} }
    })
    navigate ('ShowEvent');
  };


  onLayout = ({
    nativeEvent: { layout: { height } },
  }) => {
    const offset = fullHeight - height;
    _setOffSet(offset);
  }

  const _renderItem = ({item: event, index}) => {
    // if (!isSuperAdmin) event = event.event 
    // _setMapRegion({...mapRegion, latitude, longitude})
    return <EventSliderEntry data={{
      title: `${event.eventName}`,
      subtitle: `${event.description}`,
      address: `${event.location}`,
      illustration: event.group.groupPicture ? {uri: event.group.groupPicture.uri} : Images['logo']
    }} even={(index + 1) % 2 === 0} onPress={() => console.log(event)} />;
  };

  _onMapReady = () => {
    _setMarginBottom (0);
    _setMapReady(true)
  };

  handleChangeRegion = (eventIndex) => {
    console.log(events[eventIndex]);
    let {latitude, longitude} = events[eventIndex] 
    console.log(latitude);
    console.log(longitude);
    
    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)
    // mapRef.current.animateToRegion ({
    //   latitudeDelta: 0.00922,
    //   longitudeDelta: 0.00421,
    //   latitude,
    //   longitude
    // });
    _setMapRegion({...mapRegion, latitude, longitude})
    _setEventCoordinates({latitude, longitude})
  }

  return (
    <ImageBackground
        onLayout={onLayout}  
        style={styles.fullImage}
        source={Images['dashboard_bg_image']}
      >
      {events.length > 0 ? 
      <Fragment>
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollviewContainer}
          scrollEventThrottle={200}
          directionalLockEnabled={true}
        >
          <View>
            <SliderCarousel carouselRef={carouselRef} data={events} renderItem={_renderItem} onSnapToItem={(e) => handleChangeRegion(e)}/>
          </View>
        </ScrollView>
        <MapView
          customMapStyle={mapStyle}
          rotateEnabled={false}
          pitchEnabled={false}
          scrollEnabled={false}
          zoomEnabled={true}
          ref={mapRef}
          // onRegionChangeComplete={_setLocationOnRegionChanged}
          style={{
            alignSelf: 'stretch',
            flex: 1,
            marginBottom,
            width: wp(100),
            height: hp(100),
            // borderRadius: 10
          }}
          // region={mapRegion}
          region={mapRegion}
          onMapReady={_onMapReady}
          // onRegionChange={this._handleMapRegionChange}
          // showsUserLocation
        >
          { mapReady && eventCoordinates &&
          <MapView.Marker
            image={Images['logo-small']}
            coordinate={eventCoordinates}
            // pinColor={'blue'}
            // title="Evento"
            // description="Some description"
          />}
        </MapView>
        
      </Fragment>
      :
      <Content contentContainerStyle={styles.container}>
        <NoResults lottieProps={{style: {width: 200}}} animationName="empty-gabinete" primaryText="¡No hay resultados!" secondaryText="No hay eventos pendientes para ti, vuelve más tarde" secondaryTextStyles={{color: 'white'}}/>
      </Content>}
    </ImageBackground>
  );
};

EventsScreen.navigationOptions = ({navigation}) => {
  // const searchHeader = navigation.getParam('search_header', null)
  // return {
    // title: 'W STEM'
    // headerRight: (
    //   <Button iconRight transparent onPress={() => searchHeader.current.show ()}
    //   style={{marginRight: 20}}
    //   >
    //     <Ionicons
    //       name="md-search"
    //       color={theme.HEADER_MENU_TITLE_COLOR}
    //       size={theme.ICON_SIZE_MEDIUM}
    //     />
    //   </Button>
    // ),
  // }
};
export default EventsScreen;
