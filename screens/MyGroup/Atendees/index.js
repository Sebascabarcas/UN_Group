import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import {Button, Switch, Content, Icon, Grid, Row, Col, Item, Input, Label, Fab} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import getEnvVars from '../../../environment.js';
import MyText from '../../../components/MyText';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import NoResults from '../../../components/NoResults/index.js';
import { AntDesign } from '@expo/vector-icons';
import CardTask from '../../../components/CardTask/index.js';
import CardAtendee from '../../../components/CardAtendee/index.js';

const {apiUrl} = getEnvVars ();
const {height: fullHeight} = Dimensions.get ('window');

const HeaderComponent = ({group, event, goBack}) => {
  return (
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
          <MyText style={{color: theme.DARK_COLOR}} fontStyle="bold">
            {event.eventName}
          </MyText>
          <MyText style={{color: theme.GRAY_LIGHT_COLOR}} fontStyle="semibold">
            Asistentes
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
  );
};

const Atendees = () => {
  const flatList = useRef (null);
  const {current_user: user, isAdmin} = useSelector (state => state.session);
  const {current_event: event, current_event_atendees: atendees, refreshing} = useSelector (state => state.events);
  const {current_group: group} = useSelector (state => state.groups);
  console.log(atendees);
  
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  
  useEffect (
    () => {
      dispatch ({
        type: 'events/GET_EVENT_ATENDEES',
        payload: {id: event.id},
      });
    },
    [dispatch]
  );

  _fetchTasksOnEnd = async () => {
    dispatch ({
      type: 'groups/GET_USER_TASKS',
      payload: {
        userId: user.id, groupId: group.id
      },
      concat: true
    });
  };

  _onRefresh = async () => {
    dispatch ({
      type: 'groups/GET_USER_TASKS',
      payload: {userId: user.id, groupId: group.id},
    });
  };

  _renderAtendee = ({item: atendee, index}) => {
    return (
      <CardAtendee containerStyles={{marginVertical: 10}} {...atendee.user} />
    );
  };

  _onPressTask = (task, group) => {
    console.log('group: ', group);
    console.log('Task: ', task);
    dispatch({
      type: 'events/SET_STATE',
      payload: { current_event_task: {...task, group} }
    })
    navigate ('MyTask');
  };

  return (
    <View style={styles.container}>
      <HeaderComponent group={group} event={event} goBack={goBack}/>
        {
          atendees.length > 0 ? 
          <Content contentContainerStyle={styles.bodyContainer} padder>
            <FlatList
                  // style={styles.scroller}
                  data={atendees}
                  keyExtractor={task => task.id.toString ()}
                  renderItem={_renderAtendee}
                  showsVerticalScrollIndicator={false}
                  ref={flatList}
                  refreshing={refreshing}
                  onRefresh={_onRefresh}
                  // onEndReached={!noMorePages && _fetchEventsOnEnd}
                  // onEndReachedThreshold={0.2}
                />
          </Content>
          :
          <View style={styles.bodyContainer}>
            <NoResults lottieProps={{autoSize: true, style:{width: wp(30)}}} animationName="minnion-looking" primaryText="¡No se ha encontrado ningún asistente al evento!" primaryTextStyles={{color: 'white'}} secondaryText={`Vuelva más tarde`}/>
          </View>
      }
    </View>
  );
};

Atendees.navigationOptions = ({navigation}) => {
  return {
    // title: '',
    // header: null,
    // headerLeft: (
    //   <Button
    //     // block
    //     style={{marginLeft: 20}}
    //     iconLeft
    //     transparent
    //     onPress={() => navigation.goBack ()}
    //   >
    //     <FontAwesome
    //       name="arrow-left"
    //       color={theme.HEADER_MENU_TITLE_COLOR}
    //       size={theme.ICON_SIZE_SMALL}
    //     />
    //   </Button>
    // ),
  };
};

export default Atendees;
