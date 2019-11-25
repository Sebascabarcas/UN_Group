import React, {useEffect, useState} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import {
  Button,
  Container,
  Content,
  Col,
  Row,
  Grid,
  Icon,
} from 'native-base';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../../../styles/theme.style.js';

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

const ShowGroupScreen = () => {
  const {current_group, more_pages, loading, refreshing} = useSelector (
    state => state.groups
  );
  const {isSuperAdmin} = useSelector (state => state.session);
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

  sendGroupRequest = () => {
    const {id} = current_group;
    dispatch ({
      type: 'groups/SEND_GROUP_REQUEST',
      payload: {id},
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
              <GroupMenuButton
                navigate={navigate}
                route="GroupMembers"
                icon="ios-people"
                title="Miembros"
              />
            </Col>
          </Row>
        </Grid>
        {!isSuperAdmin &&
          <Button
            primary
            iconRight
            block
            onPress={sendGroupRequest}
          >
            <MyText style={{fontSize: theme.FONT_SIZE_LARGE}} fontStyle="bold">
              Quiero Unirme
            </MyText>
            <Ionicons
              name="ios-play-circle"
              color="white"
              size={theme.ICON_SIZE_SMALL}
            />
          </Button>}
      </Content>
    </Container>
  );
};

ShowGroupScreen.navigationOptions = ({navigation}) => {
  return {
    title: '',
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerLeft: (
      <Button
        // block
        style={{marginLeft: 5}}
        // iconLeft
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
    // headerRight: <EditGroupButton color="white"/>,
    headerTitleStyle: {
      fontFamily: theme.FONT_FAMILY_SEMIBOLD,
      fontSize: theme.FONT_SIZE_MEDIUM,
      color: theme.DARK_COLOR,
    },
  };
};

export default ShowGroupScreen;
