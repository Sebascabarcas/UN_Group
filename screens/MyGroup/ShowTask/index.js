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
import LottieView from 'lottie-react-native';
// import {NavigationAction} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import getEnvVars from '../../../environment.js';
import MyText from '../../../components/MyText';
import Images from '../../../constants/Images';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import NoResults from '../../../components/NoResults/index.js';
import { FloatingAction } from "react-native-floating-action";
import FloatingUserSelect from '../../../components/FloatingUserSelect/index.js';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const {apiUrl} = getEnvVars ();
const {height: fullHeight} = Dimensions.get ('window');

const HeaderComponent = ({group, taskName, description, goBack}) => {
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
            Tarea
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
    <MyText
          style={{textAlign: 'center', fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE}}
          //  autoFocus
          fontStyle="bold"
    >
      {taskName}
    </MyText>
    <MyText
      style={[styles.centerText, styles.groupDescriptionText]}
      fontStyle="semibold"
    >
      {description}
    </MyText>
  </View>
  );
};

const ShowTask = () => {
  const [membersSelected, _setMembersSelected] = useState([])
  const {isAdmin} = useSelector (state => state.session);
  const {current_group: group} = useSelector (state => state.groups);
  const {current_event_task: task} = useSelector (state => state.events);
  // const {current_event: event} = useSelector (state => state.events);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  const [group_members0, _setGroupMembers0] = useState([])
  const [group_members1, _setGroupMembers1] = useState([])
  console.log(task);
  
  useEffect (
    () => {
      if (task.responsibles) {
        _setGroupMembers0(task.responsibles.slice(0, Math.ceil(task.responsibles.length / 2)))
        _setGroupMembers1(task.responsibles.slice(Math.ceil(task.responsibles.length / 2), task.responsibles.length))
      }
    },
    [task] 
  );

  useEffect (
    () => {
      dispatch ({
        type: 'events/GET_EVENT_TASK',
        payload: {id: task.id},
      });
    },
    [dispatch]
  );

  const handleOnPressEdit = () => {
    dispatch({
      type: 'events/SET_STATE',
      payload: {editing_task: task}
    })
    navigate('EditTask')
  }

  const handleOnPressDelete = () => {
    dispatch({
      type: 'events/DELETE_TASK',
      payload: {taskId: task.id, navigate}
    })
  }

  const actions = [
    {
      name: 'Delete button',
      render: () => 
      <Button key="deleting" transparent onPress={handleOnPressDelete}>
        <MaterialCommunityIcons name="delete-circle" color={theme.DANGER_COLOR} size={theme.ICON_SIZE_MEDIUM} />
      </Button>
    },
    {
      name: 'Edit button',
      render: () => 
      <Button key="edit" transparent onPress={handleOnPressEdit}>
        <MaterialCommunityIcons name="circle-edit-outline" color={theme.WARNING_COLOR} size={theme.ICON_SIZE_MEDIUM} />  
      </Button>
    },
    {
      name: 'Accept button',
      render: () => 
      <Button key="accepting" transparent onPress={() => console.log('editinggggggggggg')}>
        <MaterialCommunityIcons name="checkbox-marked-circle-outline" color={theme.SUCCESS_COLOR} size={theme.ICON_SIZE_MEDIUM} />
      </Button>
    },
  ];

  const FloatingUsers = () => {
    return <Row style={styles.userRow}>
      <Col>
        {group_members0.map(({taskCompleted, atendee: {user: member}}, i) =>{
          console.log(taskCompleted);
         return <FloatingUserSelect selected={taskCompleted} key={member.id} {...member}/>
        }
        )}
      </Col>
      <Col>
        {group_members1.map(({taskCompleted, atendee: {user: member}}, i) => 
          <FloatingUserSelect selected={taskCompleted} key={member.id} {...member}/>
        )}
      </Col>
    </Row>
  }

  return (
    <View style={styles.container}>
      <HeaderComponent group={group} taskName={task.taskName} description={task.description}  goBack={goBack}/>
        {
          task.responsibles.length > 0 ? 
            <ScrollView 
              style={styles.bodyContainer}
              keyboardShouldPersistTaps="always"
            >
              <Grid style={styles.usersContainer}>
                <FloatingUsers/>
              </Grid> 
          </ScrollView>
          :
          <View style={styles.bodyContainer}>
            <NoResults lottieProps={{autoSize: true, style:{width: wp(30)}}} animationName="user-scanning" primaryText="¡No se ha encontrado ningún usuario!" primaryTextStyles={{color: 'white'}} secondaryText="Verifique su busqueda o ingrese otro nombre"/>
          </View>
        }
        {isAdmin && <FloatingAction
          actions={actions}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        />}
    </View>
  );
};

ShowTask.navigationOptions = ({navigation}) => {
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

export default ShowTask;
