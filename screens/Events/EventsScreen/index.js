import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {
  View,
  Dimensions,
  Animated,
  ScrollView,
  ImageBackground,
  // Picker,
  FlatList,
} from 'react-native';
import * as Location from 'expo-location';
import { Divider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import getEnvVars from '../../../environment.js';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import CardEvent from '../../../components/CardEvent/index.js';
import Images from '../../../constants/Images.js';
import moment from 'moment';

const {apiUrl} = getEnvVars ();
const {height: fullHeight} = Dimensions.get ('window');

EventsScreen = () => {
  const dispatch = useDispatch()
  const {navigate, setParams} = useNavigation ();
  const [offSet, _setOffSet] = useState (0);
  const flatList = useRef (null);
  const {
    events,
    more_pages,
    loading,
    refreshing
  } = useSelector (state => state.events);
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
 
  useEffect (() => {
    dispatch({
      type: 'events/GET_EVENTS',
      userId,
      isSuperAdmin
    })
  }, [dispatch]);

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
    _setLoading (false);
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

  _renderEvent = ({item: event, index}) => {
    console.log(event)
    if (!isSuperAdmin) event = event.event 
    return (
      <CardEvent {...event} onPress={() => _onPressEvent(event)} />
      // <CardEvent groupName="W-STEM" location={event.location} name={event.eventName} time={moment(event.date).format('hh:mm A')} date={moment(event.date).format('YYYY-MM-DD')} description={event.description} onPress={() => _onPressEvent(event)} />
    );
  };

  _onPressEvent = (event) => {
    dispatch({
      type: 'events/SET_STATE',
      payload: { current_event: event }
    })
    navigate ('ShowEvent');
  };


  onLayout = ({
    nativeEvent: { layout: { height } },
  }) => {
    const offset = fullHeight - height;
    _setOffSet(offset);
  }

  return (
    <ImageBackground
        onLayout={onLayout}  
        style={styles.fullImage}
        source={Images['dashboard_bg_image']}
      >
    <View style={styles.container}>
      <Divider style={{marginBottom: 5}} />
      {/* <ScrollView > */}
      <View style={styles.eventsContainer}>
        <FlatList
          // style={styles.scroller}
          data={events}
          keyExtractor={event => event.id.toString ()}
          renderItem={_renderEvent}
          showsVerticalScrollIndicator={false}
          ref={flatList}
          refreshing={refreshing}
          onRefresh={_onRefresh}
          // onEndReached={!noMorePages && _fetchEventsOnEnd}
          // onEndReachedThreshold={0.2}
        />
      </View>
    </View>
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
