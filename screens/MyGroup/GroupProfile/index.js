import React, {useEffect, useState} from 'react';
import {View, Dimensions, Image, PixelRatio} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import {
  Button,
  Container,
  Content,
  Grid,
  Row,
  Col,
  Icon,
} from 'native-base';
import {AntDesign, Ionicons, FontAwesome} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationActions, StackActions} from 'react-navigation';
import theme from '../../../styles/theme.style.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EditGroupButton from '../../../components/EditGroupButton/index.js';

const GroupMenuButton = ({route, navigate, icon, title}) => (
  <TouchableOpacity
    onPress={() => navigate (route)}
    style={[styles.iconButtonContainer]}
  >
    <Ionicons name={icon} color="#B3C2CA" size={theme.ICON_SIZE_MEDIUM} />
    <MyText style={[styles.iconButtonTitle]} fontStyle="bold">
      {title}
    </MyText>
  </TouchableOpacity>
);

const GroupProfile = () => {
  console.log(PixelRatio.get())
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

  const resetNavigationStack = StackActions.reset ({
    index: 0,
    actions: [NavigationActions.navigate ({routeName: 'Home'})],
  });

  handleEditButton = () => {
    dispatch ({
      type: 'groups/SET_STATE',
      payload: {editing_group: current_group},
    });
    navigate ('EditGroup');
  };

  handleDeleteOrLeaveGroup = () => {
    dispatch ({
      type: `groups/${isSuperAdmin ? 'DELETE' : 'LEAVE'}_GROUP`,
      payload: {
        id: current_group.id,
        navigate,
        resetNavigationStack,
        dispatchNavigation,
      },
    });
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
              <GroupMenuButton
                navigate={navigate}
                route="MyMembers"
                icon="ios-people"
                title="Miembros"
              />
              <GroupMenuButton
                navigate={navigate}
                route="RoleModels"
                icon="ios-man"
                title="Role Models"
              />
              <GroupMenuButton
                navigate={navigate}
                route="MyTasks"
                icon="ios-clipboard"
                title="Mis tareas"
              />
            </Col>
            <Col>
              <GroupMenuButton
                navigate={navigate}
                route="MyEvents"
                icon="ios-calendar"
                title="Eventos"
              />
              <GroupMenuButton
                navigate={navigate}
                route="MySolicitudes"
                icon="ios-archive"
                title="Solicitudes"
              />
              <GroupMenuButton
                navigate={navigate}
                route="GroupMentoring"
                icon="ios-people"
                title="Mentores"
              />
            </Col>
          </Row>
        </Grid>
      </Content>

      <Button
        style={styles.actionBottomButton}
        danger
        iconRight
        block
        onPress={() =>
          dispatch ({
            type: `modals/SET_STATE`,
            payload: {
              confirmModalVisible: true,
              handleOnConfirm: handleDeleteOrLeaveGroup,
            },
          })}
      >
        <MyText style={{fontSize: theme.FONT_SIZE_LARGE}} fontStyle="bold">
          {isSuperAdmin ? 'ELIMINAR' : 'ABANDONAR'} GRUPO
        </MyText>
      </Button>
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
        style={{marginLeft: 5}}
        transparent
        onPress={() => navigation.goBack ()}
      >
        <Icon
          type="Ionicons"
          name="ios-arrow-back"
          style={{fontSize: theme.ICON_SIZE_SMALL, color: 'white'}}
        />
      </Button>
    ),
    headerRight: <EditGroupButton color="white" />,
    headerTitleStyle: {
      fontFamily: theme.FONT_FAMILY_SEMIBOLD,
      fontSize: theme.FONT_SIZE_MEDIUM,
      color: theme.DARK_COLOR,
    },
  };
};

export default GroupProfile;
