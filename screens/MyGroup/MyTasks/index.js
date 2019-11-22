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
import MyText from '../../../components/MyText';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import NoResults from '../../../components/NoResults/index.js';
import { AntDesign } from '@expo/vector-icons';
import CardTask from '../../../components/CardTask/index.js';

const HeaderComponent = ({group, goBack}) => {
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
            {group.groupName}
          </MyText>
          <MyText style={{color: theme.GRAY_LIGHT_COLOR}} fontStyle="semibold">
            Mis Tareas
          </MyText>
        </View>
      </View>
      <View>
        <Button onPress={() => goBack ()} light rounded>
          <Icon
            type="AntDesign"
            name="arrowup"
            style={{fontSize: theme.ICON_SIZE_SMALL, color: '#000'}}
          />
        </Button>
      </View>
    </View>
  </View>
  );
};

const MyTasks = () => {
  const flatList = useRef (null);
  const {current_user: user, isAdmin} = useSelector (state => state.session);
  const {current_group: group, current_user_tasks: tasks, refreshing} = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  
  useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_USER_TASKS',
        payload: {userId: user.id, groupId: group.id},
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

  _renderTask = ({item: task, index}) => {
    return (
      <CardTask containerStyles={{marginVertical: 10}} {...task} completed={task.responsibles.length > 0 ? task.responsibles[0].taskCompleted : false} group={group} onPress={() => _onPressTask(task, group)} />
      // <CardEvent groupName="W-STEM" location={event.location} name={event.eventName} time={moment(event.date).format('hh:mm A')} date={moment(event.date).format('YYYY-MM-DD')} description={event.description} onPress={() => _onPressEvent(event)} />
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
      <HeaderComponent group={group} goBack={goBack}/>
        {
          tasks.length > 0 ? 
          <Content contentContainerStyle={styles.bodyContainer} padder>
            <FlatList
                  // style={styles.scroller}
                  data={tasks}
                  keyExtractor={task => task.id.toString ()}
                  renderItem={_renderTask}
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
            <NoResults lottieProps={{autoSize: true, style:{width: wp(30)}}} animationName="minnion-looking" primaryText="¡No se ha encontrado ningúna tarea!" primaryTextStyles={{color: 'white'}} secondaryText={`Vuelva más tarde`}/>
          </View>
      }
    </View>
  );
};

export default MyTasks;
