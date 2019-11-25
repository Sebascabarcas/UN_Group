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
import {Divider} from 'react-native-elements';
import {Badge, Picker, Button, Fab, Icon} from 'native-base';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import Spinner from 'react-native-loading-spinner-overlay';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import theme from '../../../styles/theme.style';
import {getGroups} from '../../../services/Groups';
import CardGroup from '../../../components/CardGroup/index.js';
import {useSelector, useDispatch} from 'react-redux';
import Images from '../../../constants/Images.js';
import NoResults from '../../../components/NoResults/index.js';

const {height: fullHeight} = Dimensions.get ('window');

GroupsScreen = () => {
  const dispatch = useDispatch ();
  const {isSuperAdmin} = useSelector (state => state.session);
  const {groups, more_pages, loading, refreshing} = useSelector (
    state => state.groups
  );
  const [offSet, _setOffSet] = useState (0);
  const flatList = useRef (null);
  const {navigate, setParams} = useNavigation ();

  useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUPS',
      });
    },
    [dispatch]
  );

  _fetchGroupsOnEnd = async () => {
    // console.log(groups);
    try {
      dispatch ({
        type: 'groups/GET_GROUPS',
        concat: true,
      });
    } catch (error) {
      console.log (error);
    }
    _setLoading (false);
  };

  _onRefresh = async () => {
    try {
      dispatch ({
        type: 'groups/GET_GROUPS',
      });
    } catch (error) {
      console.log (error);
    }
  };

  _renderGroup = ({item: group, index}) => {
    return <CardGroup containerStyles={{marginVertical: 10}} {...group} onPress={() => _onPressGroup (group)} />;
  };

  _onPressGroup = group => {
    dispatch ({
      type: 'groups/SET_STATE',
      payload: {
        current_group: group,
      },
    });
    navigate ('ShowGroup');
  };

  onLayout = ({nativeEvent: {layout: {height}}}) => {
    const offset = fullHeight - height;
    _setOffSet (offset);
  };

  return (
    <ImageBackground
      onLayout={onLayout}
      style={styles.fullImage}
      source={Images['dashboard_bg_image']}
    >
      <View style={styles.container}>
        {/* <ScrollView > */}
        <View style={styles.groupsContainer}>
          {
            groups.length > 0 ?
            <FlatList
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
            /> 
            :
            <NoResults lottieProps={{style: {width: 200}}} animationName="minnion-looking" primaryText="¡No hay resultados!" secondaryText="No hay grupos, vuelve más tarde" secondaryTextStyles={{color: 'white'}}/>
          }
          {isSuperAdmin &&
            <Fab
              direction="up"
              style={{backgroundColor: theme.PRIMARY_COLOR}}
              position="bottomRight"
              onPress={() => {
                dispatch ({
                  type: 'groups/SET_STATE',
                  payload: {new_group: {}},
                });
                navigate ('CreateGroup');
              }}
            >
              <AntDesign name="plus" />
            </Fab>}

        </View>
      </View>
    </ImageBackground>
  );
};

GroupsScreen.navigationOptions = ({navigation}) => {
  return {
    title: '',
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
    },
  };
};

export default GroupsScreen;
