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
import getEnvVars from '../../../environment.js';
import theme from '../../../styles/theme.style.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  const {navigate, getParam} = useNavigation ();

  useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP',
        payload: {id: current_group.id},
      });
    },
    [dispatch]
  );

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
      <Content padder contentContainerStyle={styles.container}>
        {/* <View>
          <MyText style={[styles.groupSubtitle]} fontStyle="bold">
            Grupo
          </MyText>
        </View> */}
        <Grid>
          <Row>
            <Col>
              {/* B3C2CA */}
              <GroupMenuButton navigate={navigate} route="MyMembers" icon="ios-people" title="Miembros" />
              <GroupMenuButton navigate={navigate} route="RoleModels" icon="ios-man" title="Role Models" />
            </Col>
            <Col>
              <GroupMenuButton navigate={navigate} route="MyEvents" icon="ios-calendar" title="Eventos" />
              <GroupMenuButton navigate={navigate} route="MySolicitudes" icon="ios-archive" title="Solicitudes" />
              {/* B3C2CA */}
            </Col>
          </Row>
        </Grid>
        {/* {isAdmin || isSuperAdmin && <Button primary iconRight block superRounded onPress={handleEditButton}>
              <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} fontStyle="bold">Editar</MyText>
              <AntDesign
                name="form"
                color="white"
                size={theme.ICON_SIZE_SMALL}
              />
        </Button>} */}
      </Content>
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
          color={theme.PRIMARY_COLOR}
          size={theme.ICON_SIZE_SMALL}
        />
      </Button>
    ),
    headerTitleStyle: {
      fontFamily: theme.FONT_FAMILY_SEMIBOLD,
      fontSize: theme.FONT_SIZE_MEDIUM,
      color: theme.DARK_COLOR,
    },
  };
};

export default GroupProfile;
