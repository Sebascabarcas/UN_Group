import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  Modal,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../styles/theme.style';
import styles from './styles';
import {Button, Input, Item, Label, Icon, Content} from 'native-base';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import BigListItem from '../../components/BigListItem';
import MyText from '../../components/MyText';
import animations from '../../constants/Animations';
import NoResults from '../../components/NoResults';


const {height: fullHeight} = Dimensions.get ('window');

const Invitations = () => {
  const {navigate, goBack} = useNavigation ();
  // const {new_group: group} = useSelector (state => state.groups);
  const {myInvitations: invitations, current_user: user} = useSelector (state => state.session);
  const dispatch = useDispatch ();

  useEffect (
    () => {
      // flatList.current.scrollToOffset ({animated: true, offset: 0});
      dispatch({
        type: 'session/GET_USER_INVITATIONS',
        payload: {id: user.id}
      })
    },
    [dispatch]
  );

  _onPressInvitation = (invitationId, event, index) => {
    dispatch({
      type: 'events/SET_STATE',
      payload: {
        current_event: event
      }
    })
    navigate('ShowEvent', {invitationId, index})
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <View style={styles.groupInfoContainer}>
            <Image
              resizeMode="cover"
              style={styles.imageGroup}
              source={
                user.picture ? {uri: `${user.picture.uri}`} : images['no-profile-photo']
              }
            />
            <View>
              <MyText style={{color: 'white'}} fontStyle="bold">{user.firstName} {user.firstLastName}</MyText>
              <MyText style={{color: 'white'}} fontStyle="semibold">Mis Invitaciones</MyText>
            </View>
          </View>
          <View>
            <Button onPress={() => goBack ()} light rounded>
                <Icon
                  type="AntDesign"
                  name="arrowup"
                  color="#000"
                  fontSize={theme.ICON_SIZE_SMALL}
                />
            </Button>
          </View>
        </View>
      </View>
      <Content padder>
        { invitations.length > 0 ?
          invitations.map(({id, event, event: { group: {groupName, groupPicture}, eventName}}, i) => (
            <BigListItem 
              key={id}
              onPress={() => _onPressInvitation(id, event, i)}
              touchContainerStyles={{marginVertical: 5}}
              listContainerStyles={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#EFEFF4',
                elevation: 1,
              }}
              leftItem={
                  <Image
                    resizeMode="cover"
                    style={styles.imageGroup}
                    source={
                      groupPicture ? {uri: `${groupPicture.uri}`} : images['logo']
                    }
                  />
              }
              primaryText={eventName}
              primaryTextStyles={{paddingTop: 5, paddingBottom: 2}}
              secondaryText={groupName}
              rightItem={
                <Button large style={{ backgroundColor: '#7DC623', borderRadius: 50, padding: 20}}>
                  <AntDesign
                    color="white"
                    size={theme.ICON_SIZE_MEDIUM}
                    active
                    name="eye"
                  />
                </Button>
              }
            />
          )
        )
        :
        <NoResults lottieProps={{autoSize: true}} animationName="error-tv" primaryText="¡No hay resultados!" secondaryText="No hay invitaciones pendientes para ti, vuelve más tarde"/>
        }
        {/* <Button primary iconRight block superRounded>
          <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} onPress={() => {}} fontStyle="bold">¡Actualizar!</MyText>
          <Icon
            type="AntDesign"
            name="rightcircle"
            style={{color: "white", fontSize: theme.ICON_SIZE_SMALL}}
          />
        </Button> */}
      </Content>
    </View>
  );
};

Invitations.navigationOptions = ({navigation}) => {
  return {
    // title: '',
    headerLeft: (
      <Button
        style={{marginLeft: 5}}
        transparent
        onPress={() => navigation.goBack ()}
      >
        <Icon
          type="Ionicons"
          name="ios-arrow-back"
          style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.HEADER_MENU_TITLE_COLOR}}
        />
      </Button>
    ),
  };
};

export default Invitations;
