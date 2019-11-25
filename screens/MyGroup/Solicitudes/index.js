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
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import {Divider} from 'react-native-elements';
import {Badge, Picker, Button, Fab, Container, Icon, Content} from 'native-base';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import theme from '../../../styles/theme.style';
import {useSelector, useDispatch} from 'react-redux';
import Images from '../../../constants/Images.js';
import CardGroupRequest from '../../../components/CardGroupRequest/index.js';
import NoResults from '../../../components/NoResults/index.js';

const {height: fullHeight} = Dimensions.get ('window');

Solicitudes = () => {
  const dispatch = useDispatch ();
  const {isSuperAdmin} = useSelector (state => state.session);
  const {
    current_group_requests: requests,
    current_group: group,
    more_pages,
    loading,
    refreshing,
  } = useSelector (state => state.groups);
  const flatList = useRef (null);
  const {navigate, goBack, setParams} = useNavigation ();
  // const [GroupsFiltered, _setGroupsFiltered] = useState ([]);
  // const [filtering, _setFiltering] = useState (false);
  const [filter, _setFilter] = useState ('all');
  // const [Groups, _setGroups] = useState ([]);

  useEffect (
    () => {
      // flatList.current.scrollToOffset ({animated: true, offset: 0});
      dispatch ({
        type: 'groups/GET_GROUP_CANDIDATES',
        payload: {id: group.id},
      });
    },
    [dispatch]
  );

  _fetchGroupsOnEnd = async () => {
    try {
      dispatch ({
        type: 'groups/GET_GROUP_CANDIDATES',
        payload: {id: group.id},
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
        type: 'groups/GET_GROUP_CANDIDATES',
        payload: {id: group.id},
      });
    } catch (error) {
      console.log (error);
    }
  };

  _onPressGroup = ({id}) => {
    navigate ('ShowGroup', {
      id,
    });
  };

  _acceptRequest = (request, index) => {
    dispatch ({
      type: 'groups/ACCEPT_GROUP_REQUEST',
      payload: {id: request.groupId, relationId: request.id, index, userID: request.user.id},
    });
  };

  _rejectRequest = (request, index) => {
    dispatch ({
      type: 'groups/REJECT_GROUP_REQUEST',
      payload: {id: request.groupId, relationId: request.id, index, userID: request.user.id},
    });
  };

  _renderRequest = ({item: request, index}) => {
    return (
      <CardGroupRequest
        name={`${request.user.firstName} ${request.user.firstLastName}`}
        image={request.user.picture}
        username={request.user.username}
        onAccept={() => _acceptRequest (request, index)}
        onReject={() => _rejectRequest (request, index)}
        //  onReject={}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <View style={styles.groupInfoContainer}>
            <Image
              resizeMode="cover"
              style={styles.imageGroup}
              source={
                group.groupPicture
                  ? {uri: `${group.groupPicture.uri}`}
                  : images['logo']
              }
            />
            <View>
              <MyText style={{color: 'white'}} fontStyle="bold">
                {group.groupName}
              </MyText>
              <MyText style={{color: 'white'}} fontStyle="semibold">
                Solicitudes
              </MyText>
            </View>
          </View>
          <View>
            <Button onPress={() => goBack ()} light rounded>
              <Icon
                type="AntDesign"
                name="arrowup"
                color="#000"
                size={theme.ICON_SIZE_SMALL}
              />
            </Button>
          </View>
        </View>
      </View>
      <Content contentContainerStyle={styles.container} padder>
        {/* <ScrollView > */}
          { requests.length > 0 ?
            <FlatList
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
            /> 
            :
            <NoResults
              lottieProps={{style: {width: 200}}}
              animationName="empty-gabinete"
              primaryText="¡No hay resultados!"
              secondaryText="No hay solicitudes pendientes para el grupo, vuelve más tarde"
            />
          }
      </Content>
    </Container>
  );
};

Solicitudes.navigationOptions = ({navigation}) => {
  const searchHeader = navigation.getParam ('search_header', null);
  return {
    header: null
  };
};
export default Solicitudes;
