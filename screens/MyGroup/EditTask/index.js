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
import MyText from '../../../components/MyText';
import Images from '../../../constants/Images';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import NoResults from '../../../components/NoResults/index.js';
import CardUser from '../../../components/CardUser/index.js';
import FloatingUser from '../../../components/FloatingUser/index.js';
import animations from '../../../constants/Animations.js';
import FloatingUserSelect from '../../../components/FloatingUserSelect/index.js';
import { AntDesign } from '@expo/vector-icons';

const HeaderComponent = ({group, taskName, handleTaskName, handleDescription, description, goBack}) => {
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
            Edición de Tarea
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
    <View style={styles.userTextInputContainer}>
      <TextInput
          style={{textAlign: 'center', fontFamily: theme.FONT_FAMILY_BOLD, fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE}}
          placeholder="Nombre de la Tarea"
          onChangeText={(taskName) => handleTaskName(taskName)}
          value={taskName}
          //  autoFocus
      />
    </View>
    <View style={styles.inputContainer}>
        <Item stackedLabel>
            <Label>Descripción de la tarea</Label>
            <Input value={description} onChangeText={(description) => handleDescription(description)} />
        </Item>
    </View>
  </View>
  );
};

const EditTask = () => {
  const [membersSelected, _setMembersSelected] = useState([])
  const {isAdmin, current_user: {id: memberId}} = useSelector (state => state.session);
  const {current_group: group} = useSelector (state => state.groups);
  const {editing_task: task, current_event: event, current_event_atendees: atendees} = useSelector (state => state.events);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  const [group_members0, _setGroupMembers0] = useState([])
  const [group_members1, _setGroupMembers1] = useState([])
  
  useEffect (
    () => {
      dispatch ({
        type: 'events/GET_EVENT_ATENDEES',
        payload: {id: event.id},
      });
    },
    [dispatch]
  );

  useEffect (
    () => {
      let atendeeIdList = task.responsibles.map((responsible) => responsible.atendeeId);
      let _atendees = atendees.map((atendee) => {
        atendee.isSelected = atendeeIdList.indexOf(atendee.id) !== -1
        return atendee
      });
      _setGroupMembers0(_atendees.slice(0, Math.ceil(_atendees.length / 2)))
      _setGroupMembers1(_atendees.slice(Math.ceil(_atendees.length / 2), _atendees.length))
      _setMembersSelected(atendeeIdList)
    },
    []
  );

  const handleOnPressUser = (group, member, i, atendeeId) => {
    let _membersSelected = membersSelected
    let isSelected = membersSelected.indexOf(atendeeId) !== -1
    if (isSelected) {
      _membersSelected = membersSelected.filter((id) => id !== atendeeId)  
    } else {
      _membersSelected.push(atendeeId)
    }
    _setMembersSelected(_membersSelected)  
    let _group_members 
    switch (group) {
      case 0:
        _group_members = group_members0
        _group_members[i].isSelected = !isSelected
        _setGroupMembers0([..._group_members])
        // _setGroupMembers0([_group_members])
        break;
        case 1:
          _group_members = group_members1
          _group_members[i].isSelected = !isSelected
          _setGroupMembers1([..._group_members])
        break;
    
      default:
        break;
    }
  }

  const handleEditTask = () => {
    console.log(task);
    
    dispatch({
      type: 'events/EDIT_TASK',
      payload: {
        goBack,
        navigate,
        task: {id: task.id, taskName: task.taskName, description: task.description, atendeeIdList: membersSelected}        
      }
    })
  }
  
  const handleTaskName = (taskName) => {
    dispatch({type: 'events/SET_STATE', payload: { editing_task: {...task, taskName}}})
  }

  const handleDescription = (description) => {
    dispatch({type: 'events/SET_STATE', payload: { editing_task: {...task, description}}})
  }

  const FloatingUsers = () => {
    return <Row style={styles.userRow}>
      <Col>
        {group_members0.map(({user: member, id: atendeeId, isSelected}, i) => 
          <FloatingUserSelect onPress={() => handleOnPressUser(0, isSelected, i, atendeeId)} selected={isSelected} key={member.id} {...member}/>
        )}
      </Col>
      <Col>
        {group_members1.map(({user: member, id: atendeeId, isSelected}, i) => 
          <FloatingUserSelect onPress={() => handleOnPressUser(1, isSelected, i, atendeeId)} selected={isSelected} key={member.id} {...member}/>
        )}
      </Col>
    </Row>
  }

  return (
    <View style={styles.container}>
      <HeaderComponent group={group} taskName={task.taskName} description={task.description} handleTaskName={handleTaskName} handleDescription={handleDescription}  goBack={goBack}/>
        {
          atendees.length > 0 ? 
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
        <Button warning iconRight block superRounded style={styles.assignButton} onPress={handleEditTask}>
          <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} fontStyle="bold">Guardar</MyText>
          <AntDesign
            name="rightcircle"
            color="white"
            size={theme.ICON_SIZE_SMALL}
          />
        </Button>
    </View>
  );
};

export default EditTask;
