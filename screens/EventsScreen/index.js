import React, {useState, useEffect, useRef} from 'react';
import * as navigationHooks from 'react-navigation-hooks';
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
import {Badge, Picker, Button} from 'native-base';
import styles from './styles.js';
import MyText from '../../components/MyText';
import Spinner from 'react-native-loading-spinner-overlay';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import SearchHeader from 'react-native-search-header';
import theme from '../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getOrders} from '../../services/Order';
import TripBox from '../../components/TripBox';
import CardEvent from '../../components/CardEvent/index.js';

const {height: fullHeight} = Dimensions.get ('window');

EventsScreen = () => {
  const [isReady, _setReady] = useState (false);
  const [offSet, _setOffSet] = useState (0);
  const searchHeader = useRef (null);
  const flatList = useRef (null);
  const {navigate, setParams} = navigationHooks.useNavigation ();
  const [orders, _setOrders] = useState ([]);
  const [ordersFiltered, _setOrdersFiltered] = useState ([]);
  const [page, _setPage] = useState (1);
  const [noMorePages, _setNoMorePages] = useState (false);
  const [actualPosition, _setActualPosition] = useState ('');
  const [filtering, _setFiltering] = useState (false);
  const [loading, _setLoading] = useState (false);
  const [refreshing, _setRefreshing] = useState (false);
  const [filter, _setFilter] = useState ('all');
  // const [orders, _setOrders] = useState ([]);

  // useEffect (() => {
  //   const fetchActualLocation = async () => {
  //     let location = await Location.getCurrentPositionAsync ({});
  //     const {coords: {latitude, longitude}} = location;
  //     const response = await fetch (
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890`,
  //       {
  //         method: `get`,
  //       }
  //     );
  //     const data = await response.json ();
  //     const place = data.results[0].formatted_address.split (/,(.+)/)[0];
  //     _setActualPosition (place);
  //   };

  //   fetchActualLocation ();
  // }, []);

  useEffect (
    () => {
      const fetchOrders = async () => {
        // _setLoading (true);
        try {
          flatList.current.scrollToOffset ({animated: true, offset: 0});
          const _orders = await getOrders ({
            index_tag: filter !== 'all' ? 'status' : 'all',
            flag: filter !== 'all' ? filter : null,
          });
          // console.log(_orders);
          _setOrders (_orders);
          _setPage (1);
          _setNoMorePages (false);
        } catch (error) {
          console.log (error.response);
        }
        // _setLoading (false);
      };

      fetchOrders ();
    },
    [filter]
  );

  _fetchOrdersOnEnd = async () => {
    // console.log(orders);

    _setLoading (true);
    console.log ('Render on order');
    try {
      const _orders = await getOrders ({
        index_tag: filter !== 'all' ? 'status' : 'all',
        page: page + 1,
        flag: filter !== 'all' ? filter : null,
      });
      if (_orders.length !== 0) {
        _setOrders (orders.concat (_orders));
        _setPage (page + 1);
      } else {
        _setNoMorePages (true);
      }
    } catch (error) {
      console.log (error);
    }
    _setLoading (false);
  };

  _onRefresh = async () => {
    _setRefreshing (true);
    console.log ('Render on refresh');
    try {
      const _orders = await getOrders ({
        index_tag: filter !== 'all' ? 'status' : 'all',
        page: 1,
        flag: filter !== 'all' ? filter : null,
      });
      _setPage (1);
      _setOrders (_orders);
    } catch (error) {
      console.log (error);
    }
    _setRefreshing (false);
  };

  _showNotifications = () => {
    navigate ('Notifications');
  };

  _onPressTrip = order => {
    navigate ('ShowOrder', {
      order,
    });
  };

  _renderOrder = ({item: order, index}) => {
    return (
      <TripBox
        // key={order.id}
        style={styles.tripBox}
        onPress={() =>
          _onPressTrip ({
            code: order.code,
            origin: order.origin,
            origin_lat: order.origin_lat,
            origin_lon: order.origin_lon,
            // latitude: 10.980999,
            // longitude: -74.810593,
            date_and_time: order.start_time,
            destiny: order.target,
            target_lat: order.target_lat,
            target_lon: order.target_lon,
            // latitude: 10.987004,
            // longitude: -74.808966,
            comment: order.comment,
          })}
        code={order.code}
        origin={order.origin}
        destiny={order.target}
        date_and_time={order.start_time}
        status={order.status}
        comment={order.comment}
      />
    );
  };

  onLayout = ({
    nativeEvent: { layout: { height } },
  }) => {
    const offset = fullHeight - height;
    _setOffSet(offset);
    console.log(`Offset: ${offset}`);
    
  }

  return (
    <ImageBackground
        onLayout={onLayout}  
        style={styles.fullImage}
        source={require ('../../assets/images/dashboard_image.png')}
      >
    <View style={styles.container}>
      <Divider style={{marginBottom: 5}} />
      {/* <ScrollView > */}
      <View style={styles.groupsContainer}>
        {/* <FlatList
          // style={styles.scroller}
          data={filtering ? ordersFiltered : orders}
          keyExtractor={order => order.id.toString ()}
          renderItem={_renderOrder}
          showsVerticalScrollIndicator={false}
          ref={flatList}
          refreshing={refreshing}
          onRefresh={!filtering && _onRefresh}
          onEndReached={!noMorePages && !filtering && _fetchOrdersOnEnd}
          onEndReachedThreshold={0.2}
        /> */}
        <CardEvent name="Evento 1" time="04:20 PM" date="04/02/19" groupName="W-STEM" source="Soledad" description="Breve descripción" />
      </View>
    </View>
    </ImageBackground>
  );
};

EventsScreen.navigationOptions = ({navigation}) => {
  const searchHeader = navigation.getParam('search_header', null)
  return {
    headerRight: (
      <Button iconRight transparent onPress={() => searchHeader.current.show ()}
      style={{marginRight: 20}}
      >
        <Ionicons
          name="md-search"
          color={theme.HEADER_MENU_TITLE_COLOR}
          size={theme.ICON_SIZE_MEDIUM}
        />
      </Button>
    ),
  }
};
export default EventsScreen;
