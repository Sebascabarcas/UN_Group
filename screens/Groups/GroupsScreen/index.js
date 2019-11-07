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
import {Badge, Picker, Button, Fab} from 'native-base';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import Spinner from 'react-native-loading-spinner-overlay';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import theme from '../../../styles/theme.style';
import {getGroups} from '../../../services/Groups';
import CardGroup from '../../../components/CardGroup/index.js';
import {useSelector, useDispatch} from 'react-redux';
import Images from '../../../constants/Images.js';

const {height: fullHeight} = Dimensions.get ('window');

GroupsScreen = () => {
  const dispatch = useDispatch()
  const {
    isSuperAdmin
  } = useSelector (state => state.session);
  const {
    groups,
    more_pages,
    loading,
    refreshing
  } = useSelector (state => state.groups);
  const [offSet, _setOffSet] = useState (0);
  const flatList = useRef (null); 
  const {navigate, setParams} = useNavigation ();
  // const [GroupsFiltered, _setGroupsFiltered] = useState ([]);
  // const [filtering, _setFiltering] = useState (false);
  const [filter, _setFilter] = useState ('all');
  // const [Groups, _setGroups] = useState ([]);

  useEffect (
    () => {
      flatList.current.scrollToOffset ({animated: true, offset: 0});
      dispatch({
        type: 'groups/GET_GROUPS'
      })
    },
    [dispatch]
  );

  _fetchGroupsOnEnd = async () => {
    // console.log(groups);
    try {
      dispatch({
        type: 'groups/GET_GROUPS',
        concat: true
      })
      /* ({
        index_tag: filter !== 'all' ? 'status' : 'all',
        page: page + 1,
        flag: filter !== 'all' ? filter : null,
      }); */
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
    try {
      dispatch({
        type: 'groups/GET_GROUPS'
      })
      /* ({
        index_tag: filter !== 'all' ? 'status' : 'all',
        page: 1,
        flag: filter !== 'all' ? filter : null,
      }); 
      _setPage (1); */
    } catch (error) {
      console.log (error);
    }
  };

  _renderGroup = ({item: group, index}) => {
    return (
      <CardGroup {...group} onPress={() => _onPressGroup(group)} />
    );
  };
  
  _onPressGroup = ({id}) => {
    navigate ('ShowGroup', {
      id
    });
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
        { <FlatList
          // style={styles.scroller}
          data={groups}
          // data={filtering ? GroupsFiltered : Groups}
          keyExtractor={group => group.id.toString ()}
          renderItem={_renderGroup}
          showsVerticalScrollIndicator={false}
          ref={flatList}
          refreshing={refreshing}
          onRefresh={_onRefresh}
          // onRefresh={!filtering && _onRefresh}
          // onEndReached={!noMorePages && _fetchGroupsOnEnd}
          // onEndReached={!noMorePages && !filtering && _fetchGroupsOnEnd}
          // onEndReachedThreshold={0.2}
        /> }
        { isSuperAdmin &&
          <Fab
              direction="up"
              style={{ backgroundColor: theme.PRIMARY_COLOR }}
              position="bottomRight"
              onPress={() => navigate("CreateGroup")}>
              <AntDesign name="plus" />
          </Fab>
        }
        
      </View>
    </View>
    </ImageBackground>
  );
};

GroupsScreen.navigationOptions = ({navigation}) => {
  // const searchHeader = navigation.getParam('search_header', null)
  // return {
  //   headerRight: (
  //     <Button iconRight transparent onPress={() => searchHeader.current.show ()}
  //     style={{marginRight: 20}}
  //     >
  //       <Ionicons
  //         name="md-search"
  //         color={theme.HEADER_MENU_TITLE_COLOR}
  //         size={theme.ICON_SIZE_MEDIUM}
  //       />
  //     </Button>
  //   ),
  // }
};
export default GroupsScreen;
