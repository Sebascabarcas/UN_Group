import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import {Button, Switch, Content, Icon, Grid, Row, Col, Item, Input, Label} from 'native-base';
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

const {apiUrl} = getEnvVars ();
const {height: fullHeight} = Dimensions.get ('window');

const HeaderComponent = ({group, taskName, goBack}) => {
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
            {taskName}
          </MyText>
          <MyText style={{color: theme.GRAY_LIGHT_COLOR}} fontStyle="semibold">
            Tareas
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

const CreateTask = () => {
  const {current_group: group} = useSelector (state => state.groups);
  const {current_event: event, current_event_tasks: tasks, loading, refreshing} = useSelector (state => state.events);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  
  useEffect (
    () => {
      dispatch ({
        type: 'events/GET_EVENT_TASKS',
        payload: {id: event.id},
      });
    },
    [dispatch]
  );

  _fetchTasksOnEnd = async () => {
    dispatch({
      type: 'events/GET_EVENT_TASKS',
      payload: {
        id: event.id,
        concat: true
      }
    })
  };

  _onRefresh = async () => {
    console.log ('Render on refresh');
    dispatch({
      type: 'events/GET_EVENT_TASKS',
      payload: {id: event.id},
    })
  };

  _renderTask = ({item: task, index}) => {
    return (
      <CardTask containerStyles={{marginVertical: 10}} {...task} group={group} onPress={() => _onPressTask(task, group)} />
      // <CardEvent groupName="W-STEM" location={event.location} name={event.eventName} time={moment(event.date).format('hh:mm A')} date={moment(event.date).format('YYYY-MM-DD')} description={event.description} onPress={() => _onPressEvent(event)} />
    );
  };

  _onPressTask = (task, group) => {
    dispatch({
      type: 'events/SET_STATE',
      payload: { current_event_task: {...task, group} }
    })
    navigate ('ShowTask', {isGroupEvent: true});
  };

  return (
    <View style={styles.container}>
      <HeaderComponent group={group} taskName={task.taskName} description={task.description} handleTaskName={handleTaskName} handleDescription={handleDescription} _setLoopSearchAnimation={_setLoopSearchAnimation} searchAnimation={searchAnimation} loopSearchAnimation={loopSearchAnimation} goBack={goBack}/>
        {
          tasks.length > 0 ? 
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
          :
          <View style={styles.bodyContainer}>
            <NoResults lottieProps={{autoSize: true, style:{width: wp(30)}}} animationName="user-scanning" primaryText="¡No se ha encontrado ningún usuario!" primaryTextStyles={{color: 'white'}} secondaryText="Verifique su busqueda o ingrese otro nombre"/>
          </View>
        }
    </View>
  );
};

CreateTask.navigationOptions = ({navigation}) => {
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

export default CreateTask;
