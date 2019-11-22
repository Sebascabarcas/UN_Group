import React, {useEffect, useState} from 'react';
import {View, Dimensions, Image} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import {
  Input,
  Button,
  List,
  ListItem,
  Form,
  Item,
  Badge,
  Container,
  Content,
  Grid,
  Row,
  Col,
} from 'native-base';
import {AntDesign, Ionicons, FontAwesome} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import CardGroupInfo from '../../../components/CardGroupInfo';
import { NavigationActions, StackActions } from 'react-navigation';
import getEnvVars from '../../../environment.js';
import theme from '../../../styles/theme.style.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EditGroupButton from '../../../components/EditGroupButton/index.js';

const {height: fullHeight} = Dimensions.get ('window');
const {apiUrl} = getEnvVars ();

const GroupMenuButton = ({route, navigate, icon, title}) => (
  <TouchableOpacity onPress={() => navigate(route)} style={[styles.iconButtonContainer]}>
    <Ionicons name={icon} color="#B3C2CA" size={theme.ICON_SIZE_MEDIUM} />
    <MyText style={[styles.iconButtonTitle]} fontStyle="bold">
      {title}
    </MyText>
  </TouchableOpacity>
);

const GroupProfile = () => {
  const {current_group} = useSelector (state => state.groups);
  const {isAdmin, isSuperAdmin, more_pages, loading, refreshing} = useSelector (
    state => state.session
  );
  const dispatch = useDispatch ();
  const {navigate, dispatch: dispatchNavigation, getParam} = useNavigation ();

  useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP',
        payload: {id: current_group.id},
      });
    },
    [dispatch]
  );

  const resetNavigationStack = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });
  
  handleEditButton = () => {
    dispatch ({
      type: 'groups/SET_STATE',
      payload: {editing_group: current_group},
    });
    navigate ('EditGroup');
  };

  return (
    <Container>
      <View style={[styles.groupInfoContainer]}>
        <MyText
          style={[styles.centerText, styles.groupNameText]}
          fontStyle="bold"
        >
          {current_group.groupName}
        </MyText>
        <Image
          resizeMode="cover"
          style={styles.imageCar}
          source={
            current_group.groupPicture
              ? {uri: `${current_group.groupPicture.uri}`}
              : images['logo']
          }
        />
        <MyText
          style={[styles.centerText, styles.groupDescriptionText]}
          fontStyle="semibold"
        >
          {current_group.description}
        </MyText>
      </View>
      <Content padder scrollEnabled contentContainerStyle={styles.content}>
        <Grid>
          <Row>
            <Col>
              <GroupMenuButton navigate={navigate} route="MyMembers" icon="ios-people" title="Miembros" />
              <GroupMenuButton navigate={navigate} route="RoleModels" icon="ios-man" title="Role Models" />
              <GroupMenuButton navigate={navigate} route="MyTasks" icon="ios-clipboard" title="Mis tareas" />
            </Col>
            <Col>
              <GroupMenuButton navigate={navigate} route="MyEvents" icon="ios-calendar" title="Eventos" />
              <GroupMenuButton navigate={navigate} route="MySolicitudes" icon="ios-archive" title="Solicitudes" />
              <GroupMenuButton navigate={navigate} route="GroupMentoring" icon="ios-people" title="Mentores" />
            </Col>
          </Row>
        </Grid>
      </Content>
      {/* <Button style={styles.actionBottomButton} primary iconRight block superRounded onPress={() => dispatch({
              type: `groups/${isSuperAdmin ? 'DELETE' : 'LEAVE'}_GROUP`,
              payload: {id: current_group.id, navigate, resetNavigationStack, dispatchNavigation}
            })}>
            <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} fontStyle="bold">{isSuperAdmin ? 'Eliminar' : 'Abandonar'} Grupo</MyText>
            <Ionicons
              name="ios-close-circle"
              color="white"
              size={theme.ICON_SIZE_SMALL}
            />
      </Button> */}
    </Container>
  );
};

GroupProfile.navigationOptions = ({navigation}) => {
  return {
    title: '',
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerLeft: (
      <Button
        // block
        style={{marginLeft: 20}}
        iconLeft
        transparent
        onPress={() => navigation.goBack ()}
      >
        <Ionicons
          name="ios-arrow-back"
          color="white"
          size={theme.ICON_SIZE_SMALL}
        />
      </Button>
    ),
    headerRight: <EditGroupButton color="white"/>,
    headerTitleStyle: {
      fontFamily: theme.FONT_FAMILY_SEMIBOLD,
      fontSize: theme.FONT_SIZE_MEDIUM,
      color: theme.DARK_COLOR,
    },
  };
};

export default GroupProfile;
