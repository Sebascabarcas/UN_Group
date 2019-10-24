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
import {Badge, Picker, Button, Fab} from 'native-base';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import Spinner from 'react-native-loading-spinner-overlay';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import SearchHeader from 'react-native-search-header';
import theme from '../../../styles/theme.style';
import {getGroups} from '../../../services/Groups';
import CardGroup from '../../../components/CardGroup/index.js';
import {useSelector, useDispatch} from 'react-redux';
import Images from '../../../constants/Images.js';

const {height: fullHeight} = Dimensions.get ('window');

GroupsScreen = () => {
  const {
    isSuperAdmin
  } = useSelector (state => state.session);
  const [offSet, _setOffSet] = useState (0);
  const searchHeader = useRef (null);
  const flatList = useRef (null);
  const {navigate, setParams} = navigationHooks.useNavigation ();
  const [Groups, _setGroups] = useState ([]);
  // const [GroupsFiltered, _setGroupsFiltered] = useState ([]);
  const [page, _setPage] = useState (1);
  const [noMorePages, _setNoMorePages] = useState (false);
  // const [filtering, _setFiltering] = useState (false);
  const [loading, _setLoading] = useState (false);
  const [refreshing, _setRefreshing] = useState (false);
  const [filter, _setFilter] = useState ('all');
  // const [Groups, _setGroups] = useState ([]);

  useEffect (
    () => {
      const fetchGroups = async () => {
        // _setLoading (true);
        try {
          flatList.current.scrollToOffset ({animated: true, offset: 0});
          const _groups = await getGroups ()
          /* ({
            index_tag: filter !== 'all' ? 'status' : 'all',
            flag: filter !== 'all' ? filter : null,
          }); */
          _setGroups (_groups);
          _setPage (1);
          _setNoMorePages (false);
        } catch (error) {
          console.log (error);
          console.log (error.response);
        }
        // _setLoading (false);
      };

      fetchGroups ();
    },
    []
  );

  _fetchGroupsOnEnd = async () => {
    // console.log(groups);

    _setLoading (true);
    console.log ('Render on group');
    try {
      const _groups = await getGroups ()
      /* ({
        index_tag: filter !== 'all' ? 'status' : 'all',
        page: page + 1,
        flag: filter !== 'all' ? filter : null,
      }); */
      _setGroups (groups.concat (_groups));
      /* if (_groups.length !== 0) {
        _setGroups (groups.concat (_groups));
        _setPage (page + 1);
      } else {
        _setNoMorePages (true);
      } */
    } catch (error) {
      console.log (error);
    }
    _setLoading (false);
  };

  _onRefresh = async () => {
    _setRefreshing (true);
    console.log ('Render on refresh');
    try {
      const _groups = await getGroups ();
      /* ({
        index_tag: filter !== 'all' ? 'status' : 'all',
        page: 1,
        flag: filter !== 'all' ? filter : null,
      }); 
      _setPage (1); */
      _setGroups (_groups);
    } catch (error) {
      console.log (error);
    }
    _setRefreshing (false);
  };

  _onPressTrip = group => {
    navigate ('ShowOrder', {
      group,
    });
  };

  _renderOrder = ({item: group, index}) => {
    return (
      <CardGroup name={group.groupName} />
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
        source={Images['dashboard_bg_image']}
      >
    <View style={styles.container}>
      <Divider style={{marginBottom: 5}} />
      {/* <ScrollView > */}
      <View style={styles.groupsContainer}>
        <FlatList
          // style={styles.scroller}
          data={Groups}
          // data={filtering ? GroupsFiltered : Groups}
          keyExtractor={group => group.id.toString ()}
          renderItem={_renderOrder}
          showsVerticalScrollIndicator={false}
          ref={flatList}
          refreshing={refreshing}
          onRefresh={_onRefresh}
          // onRefresh={!filtering && _onRefresh}
          // onEndReached={!noMorePages && _fetchGroupsOnEnd}
          // onEndReached={!noMorePages && !filtering && _fetchGroupsOnEnd}
          // onEndReachedThreshold={0.2}
        />
        { isSuperAdmin &&
          <Fab
              direction="up"
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => navigate("CreateGroup")}>
              <AntDesign name="plus" />
          </Fab>
        }
        {/* <CardGroup groupName="W-STEM"/> */}
      </View>
    </View>
    </ImageBackground>
  );
};

GroupsScreen.navigationOptions = ({navigation}) => {
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
export default GroupsScreen;
