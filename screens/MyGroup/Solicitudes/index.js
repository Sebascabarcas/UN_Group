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
import {AntDesign, Ionicons} from '@expo/vector-icons';
import theme from '../../../styles/theme.style';
import {useSelector, useDispatch} from 'react-redux';
import Images from '../../../constants/Images.js';
import CardGroupRequest from '../../../components/CardGroupRequest/index.js';

const {height: fullHeight} = Dimensions.get ('window');

Solicitudes = () => {
  const dispatch = useDispatch()
  const {
    isSuperAdmin,
    current_group
  } = useSelector (state => state.session);
  const {
    current_group_requests: requests,
    more_pages,
    loading,
    refreshing
  } = useSelector (state => state.groups);
  const flatList = useRef (null); 
  const {navigate, setParams} = useNavigation ();
  // const [GroupsFiltered, _setGroupsFiltered] = useState ([]);
  // const [filtering, _setFiltering] = useState (false);
  const [filter, _setFilter] = useState ('all');
  // const [Groups, _setGroups] = useState ([]);

  useEffect (
    () => {
      // flatList.current.scrollToOffset ({animated: true, offset: 0});
      dispatch({
        type: 'groups/GET_GROUP_CANDIDATES',
        payload: {id: current_group.id}
      })
    },
    [dispatch]
  );

  _fetchGroupsOnEnd = async () => {
    try {
      dispatch({
        type: 'groups/GET_GROUP_CANDIDATES',
        payload: {id: current_group.id},
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
        type: 'groups/GET_GROUP_CANDIDATES',
        payload: {id: current_group.id}
      })
    } catch (error) {
      console.log (error);
    }
  };

  _onPressGroup = ({id}) => {
    navigate ('ShowGroup', {
      id
    });
  };

  _acceptRequest = (request, index) => {
    dispatch({
      type: 'groups/ACCEPT_GROUP_REQUEST',
      payload: {id: request.groupId, index, userID: request.user.id}
    })
  }

  _rejectRequest = (request, index) => {
    dispatch({
      type: 'groups/REJECT_GROUP_REQUEST',
      payload: {id: request.groupId, index, userID: request.user.id}
    })
  }

  _renderRequest = ({item: request, index}) => {
    return (
      <CardGroupRequest name={`${request.user.firstName} ${request.user.firstLastName}`} image={request.user.picture} username={request.user.username} 
      onAccept={() => _acceptRequest(request, index)} onReject={() => _rejectRequest(request, index)}
      //  onReject={}  
       />
    );
  };

  return (
    <ImageBackground
        style={styles.fullImage}
        source={Images['dashboard_bg_image']}
      >
    <View style={styles.container}>
      <Divider style={{marginBottom: 5}} />
      {/* <ScrollView > */}
      <View style={styles.groupsContainer}>
        { <FlatList
          // style={styles.scroller}
          data={requests}
          // data={filtering ? GroupsFiltered : Groups}
          keyExtractor={request => request.id.toString ()}
          renderItem={_renderRequest}
          showsVerticalScrollIndicator={false}
          ref={flatList}
          refreshing={refreshing}
          onRefresh={_onRefresh}
          // onRefresh={!filtering && _onRefresh}
          // onEndReached={!noMorePages && _fetchGroupsOnEnd}
          // onEndReached={!noMorePages && !filtering && _fetchGroupsOnEnd}
          // onEndReachedThreshold={0.2}
        /> }
      </View>
    </View>
    </ImageBackground>
  );
};

Solicitudes.navigationOptions = ({navigation}) => {
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
export default Solicitudes;
