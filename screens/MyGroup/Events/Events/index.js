import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {
  View,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {AntDesign} from '@expo/vector-icons';
import {Fab, Content, Container, Button, Icon} from 'native-base';
import NoResults from '../../../../components/NoResults/index.js';
import MyText from '../../../../components/MyText';
import CardEvent from '../../../../components/CardEvent/index.js';
import theme from '../../../../styles/theme.style.js';
import styles from './styles';

const {height: fullHeight} = Dimensions.get ('window');

Events = () => {
  console.log('MyGroup/Events')
  const [offSet, _setOffSet] = useState (0);
  const flatList = useRef (null);
  const dispatch = useDispatch ();
  const {navigate, goBack, setParams} = useNavigation ();
  const [groups, _setGroups] = useState ([]);
  const [page, _setPage] = useState (1);
  const [filtering, _setFiltering] = useState (false);
  const [filter, _setFilter] = useState ('all');
  // const [groups, _setGroups] = useState ([]);
  const {current_group_events: events, current_group: group} = useSelector (state => state.groups);
  const {
    isAdmin,
    more_pages,
    loading,
    refreshing,
  } = useSelector (state => state.session);

  useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_EVENTS',
        payload: {
          id: group.id,
        },
      });
    },
    [dispatch]
  );

  _fetchGroupsOnEnd = async () => {
    // console.log(groups);

    _setLoading (true);
    console.log ('Render on group');
    try {
      const _groups = await getGroup ();
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
    console.log ('Render on refresh');
    dispatch ({
      type: 'groups/GET_GROUP_EVENTS',
      payload: {
        id: group.id,
      },
    });
  };

  _renderEvent = ({item: event, index}) => {
    return (
      <CardEvent
        containerStyles={{marginVertical: 10}}
        {...event}
        group={group}
        onPress={() => _onPressEvent (event, group)}
      />
    );
    // <CardEvent groupName="W-STEM" location={event.location} name={event.eventName} time={moment(event.date).format('hh:mm A')} date={moment(event.date).format('YYYY-MM-DD')} description={event.description} onPress={() => _onPressEvent(event)} />
  };

  _onPressEvent = (event, group) => {
    console.log(event);
    console.log(group);
    dispatch ({
      type: 'events/GET_EVENT',
      payload: {id: event.id},
      callback: () => navigate('ShowEvent')
    });
    // navigate ('ShowEvent', {isGroupEvent: true});
  };

  return (
    <Container
      style={styles.container}
      // source={Images['dashboard_bg_image']}
    >
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
                Eventos
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

      {/* <ScrollView > */}
      {/* <View style={styles.eventsContainer}> */}
      <Content contentContainerStyle={styles.container} padder>
        {events.length > 0
          ? <FlatList
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
          : <NoResults
              lottieProps={{style: {width: 200}}}
              animationName="empty-gabinete"
              primaryText="¡No hay resultados!"
              secondaryText="No hay eventos pendientes para ti, vuelve más tarde"
            />}
      </Content>
      {/* </View>  */}
      {isAdmin &&
        <Fab
          direction="up"
          style={{backgroundColor: theme.PRIMARY_COLOR}}
          position="bottomRight"
          onPress={() => {
            dispatch ({
              type: 'events/SET_STATE',
              payload: {
                new_event: {
                  eventName: 'Nombre del Evento',
                  date: null,
                  time: null,
                },
              },
            });
            navigate ('CreateEvent');
          }}
        >
          <AntDesign name="plus" />
        </Fab>}
    </Container>
  );
};

Events.navigationOptions = ({navigation}) => {
  // const searchHeader = navigation.getParam('search_header', null)
  return {
    header: null,
    //   title: 'W STEM'
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
  };
};
export default Events;
