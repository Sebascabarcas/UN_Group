import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  Keyboard,
} from 'react-native';
import {Button, Switch, Content, Icon, Grid, Row, Col} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
// import {NavigationAction} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import MyText from '../../components/MyText';
import images from '../../constants/Images';
import styles from './styles';
import theme from '../../styles/theme.style.js';
import NoResults from '../../components/NoResults/index.js';
import CardUser from '../../components/CardUser/index.js';
import FloatingUser from '../../components/FloatingUser/index.js';
import animations from '../../constants/Animations.js';

const {height: fullHeight} = Dimensions.get ('window');

const HeaderComponent = ({
  user: {firstName, picture, firstLastName},
  username,
  handleUserSearch,
  _setLoopSearchAnimation,
  searchAnimation,
  loopSearchAnimation,
  goBack,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
        <View style={styles.groupInfoContainer}>
          <Image
            resizeMode="cover"
            style={styles.imageGroup}
            source={
              picture ? {uri: `${picture.uri}`} : images['no-profile-photo']
            }
          />
          <View>
            <MyText style={{color: theme.DARK_COLOR}} fontStyle="bold">
              {firstName} {firstLastName}
            </MyText>
            <MyText
              style={{color: theme.GRAY_LIGHT_COLOR}}
              fontStyle="semibold"
            >
              Mis Usuarios
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
          style={{
            textAlign: 'center',
            fontFamily: theme.FONT_FAMILY_BOLD,
            fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE,
          }}
          placeholder="Nombre del Usuario"
          onFocus={() => {
            searchAnimation.current.play ();
          }}
          onBlur={() => {
            _setLoopSearchAnimation (false);
          }}
          onChangeText={username => handleUserSearch (username)}
          value={username}
          //  autoFocus
        />
        <LottieView
          ref={searchAnimation}
          style={styles.searchAnimation}
          loop={loopSearchAnimation}
          source={animations['searching-around']}
        />
      </View>
    </View>
  );
};

const MyUsers = () => {
  const searchAnimation = useRef (null);
  const [userSelected, _setUserSelected] = useState (null);
  const [username, _setUsername] = useState (null);
  const [loopSearchAnimation, _setLoopSearchAnimation] = useState (true);
  const {current_user: user} = useSelector (state => state.session);
  const {users_searched, loading, refreshing} = useSelector (
    state => state.session
  );
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  let _users_searched0 = users_searched.slice (
    0,
    Math.ceil (users_searched.length / 2)
  );
  let _users_searched1 = users_searched.slice (
    Math.ceil (users_searched.length / 2),
    users_searched.length
  );
  /*   useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_MEMBERS',
        payload: {id: current_group.id},
      });
    },
    [dispatch]
  ); */
  const handleOnPressUser = member => {
    Keyboard.dismiss ();
    _setUserSelected (member);
  };

  const handleUserSearch = username => {
    _setUsername (username);
    dispatch ({type: 'session/SEARCH_USERS', payload: {querySearch: username}});
  };

  const handleDeleteUser = () => {
    dispatch ({
      type: 'session/DELETE_USER',
      payload: {userId: userSelected.id, goBack},
    });
    _setUsername(null)
    _setUserSelected(null)
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        user={user}
        username={username}
        handleUserSearch={handleUserSearch}
        _setLoopSearchAnimation={_setLoopSearchAnimation}
        searchAnimation={searchAnimation}
        loopSearchAnimation={loopSearchAnimation}
        goBack={goBack}
      />
      {users_searched.length > 0
        ? <ScrollView
            style={styles.bodyContainer}
            keyboardShouldPersistTaps="always"
          >
            <Grid style={styles.usersContainer}>
              <Row style={styles.userRow}>
                <Col>
                  {_users_searched0.map (member => (
                    <FloatingUser
                      onPress={() => handleOnPressUser (member)}
                      key={member.id}
                      {...member}
                    />
                  ))}
                </Col>
                <Col>
                  {_users_searched1.map (member => (
                    <FloatingUser
                      onPress={() => handleOnPressUser (member)}
                      key={member.id}
                      {...member}
                    />
                  ))}
                </Col>
              </Row>
            </Grid>
          </ScrollView>
        : <View style={styles.bodyContainer}>
            <NoResults
              lottieProps={{autoSize: true, style: {width: wp (30)}}}
              animationName="user-scanning"
              primaryText="¡No se ha encontrado ningún usuario!"
              primaryTextStyles={{color: 'white'}}
              secondaryText="Verifique su busqueda o ingrese otro nombre"
            />
          </View>}
      {userSelected &&
        <View style={styles.userSelectedContainer}>
          <View style={styles.userSelectedImageContainer}>
            <Image
              resizeMode="cover"
              style={styles.userSelectedImage}
              source={
                userSelected.picture
                  ? {uri: `${userSelected.picture.uri}`}
                  : images['no-profile-photo']
              }
            />
          </View>
          <View style={styles.userSelectedNameContainer}>
            <MyText style={styles.userSelectedName} fontStyle="semibold">
              {userSelected.firstName} {userSelected.firstLastName}
            </MyText>
          </View>
          <View style={styles.userSelectedActions}>
            <Button
              onPress={() => {
                dispatch({
                  type: 'modals/SET_STATE',
                  payload: {
                    confirmModalVisible: true,
                    handleOnConfirm: handleDeleteUser
                  }
                })
              }}
              danger
              iconRight
              block
              superRounded
            >
              {/* <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} fontStyle="bold">Añadir al grupo</MyText> */}
              <Icon
                type="AntDesign"
                name="delete"
                style={{color: 'white', fontSize: theme.ICON_SIZE_SMALL}}
              />
            </Button>
            <Button
              onPress={() => _setUserSelected (null)}
              style={styles.cancelButton}
              danger
              block
              superRounded
            >
              <Icon
                type="AntDesign"
                name="close"
                style={{color: 'white', fontSize: theme.ICON_SIZE_SMALL}}
              />
            </Button>
          </View>
        </View>}
    </View>
  );
};

export default MyUsers;
