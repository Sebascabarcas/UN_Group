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
import styles from './styles.js';
import MyText from '../../../components/MyText';
import CardEvent from '../../../components/CardEvent/index.js';
import Images from '../../../constants/Images.js';

const {height: fullHeight} = Dimensions.get ('window');

EventsScreen = () => {
  const [offSet, _setOffSet] = useState (0);
  // const flatList = useRef (null);
  const {navigate, setParams} = navigationHooks.useNavigation ();
  const [groups, _setGroups] = useState ([]);
  const [page, _setPage] = useState (1);
  const [noMorePages, _setNoMorePages] = useState (false);
  const [filtering, _setFiltering] = useState (false);
  const [loading, _setLoading] = useState (false);
  const [refreshing, _setRefreshing] = useState (false);
  const [filter, _setFilter] = useState ('all');
  // const [groups, _setGroups] = useState ([]);

  useEffect (
    () => {
      const fetchGroups = async () => {
        // _setLoading (true);
        try {
          flatList.current.scrollToOffset ({animated: true, offset: 0});
          const _groups = await getGroup ()
          // ({
          //   index_tag: filter !== 'all' ? 'status' : 'all',
          //   flag: filter !== 'all' ? filter : null,
          // });
          // console.log(_groups);
          _setGroups (_groups);
          _setPage (1);
          _setNoMorePages (false);
        } catch (error) {
          console.log (error.response);
        }
        // _setLoading (false);
      };

      fetchGroups ();
    },
    [filter]
  );

  _fetchGroupsOnEnd = async () => {
    // console.log(groups);

    _setLoading (true);
    console.log ('Render on group');
    try {
      const _groups = await getGroup ()
      // ({
      //   index_tag: filter !== 'all' ? 'status' : 'all',
      //   page: page + 1,
      //   flag: filter !== 'all' ? filter : null,
      // });
      if (_groups.length !== 0) {
        _setGroups (groups.concat (_groups));
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
      const _groups = await getGroup ()
      // ({
      //   index_tag: filter !== 'all' ? 'status' : 'all',
      //   page: 1,
      //   flag: filter !== 'all' ? filter : null,
      // });
      _setPage (1);
      _setGroups (_groups);
    } catch (error) {
      console.log (error);
    }
    _setRefreshing (false);
  };

  _showNotifications = () => {
    navigate ('Notifications');
  };

  _onPressTrip = group => {
    navigate ('ShowOrder', {
      group,
    });
  };

  _renderOrder = ({item: group, index}) => {
    return (
      <CardEvent name="Evento 1" time="04:20 PM" date="04/02/19" groupName="W-STEM" source="Soledad" description="Breve descripción" />
    );
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
      <View style={styles.groupsContainer}>
        {/* <FlatList
          // style={styles.scroller}
          data={filtering ? groupsFiltered : groups}
          keyExtractor={group => group.id.toString ()}
          renderItem={_renderOrder}
          showsVerticalScrollIndicator={false}
          ref={flatList}import { as wp} from 'react-native-responsive-screen';
          refreshing={refreshing}
          onRefresh={!filtering && _onRefresh}
          onEndReached={!noMorePages && !filtering && _fetchGroupsOnEnd}
          onEndReachedThreshold={0.2}
        /> */}
        <CardEvent name="Evento 1" time="04:20 PM" date="04/02/19" groupName="W-STEM" source="Soledad" description="Breve descripción" />
      </View>
    </View>
    </ImageBackground>
  );
};

EventsScreen.navigationOptions = ({navigation}) => {
  // const searchHeader = navigation.getParam('search_header', null)
  return {
    title: 'W STEM'
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
  }
};
export default EventsScreen;
