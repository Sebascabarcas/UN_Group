import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
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
import getEnvVars from '../../../environment.js';
import MyText from '../../../components/MyText';
import Images from '../../../constants/Images';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import NoResults from '../../../components/NoResults/index.js';
import CardUser from '../../../components/CardUser/index.js';
import FloatingUser from '../../../components/FloatingUser/index.js';
import animations from '../../../constants/Animations.js';

const {apiUrl} = getEnvVars ();
const {height: fullHeight} = Dimensions.get ('window');

const HeaderComponent = ({group, username, handleUserSearch, _setLoopSearchAnimation, searchAnimation, loopSearchAnimation, goBack}) => {
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
            Nuevo Miembro
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
    <View style={styles.userTextInputContainer}>
      <TextInput
          style={{textAlign: 'center', fontFamily: theme.FONT_FAMILY_BOLD, fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE}}
          placeholder="Nombre del Usuario"
          onFocus={() => {
            searchAnimation.current.play()
          }}
          onBlur={() => { 
            _setLoopSearchAnimation(false)
          }}
           onChangeText={(username) => handleUserSearch(username)}
           value={username}
          //  autoFocus
      />
      <LottieView ref={searchAnimation} style={styles.searchAnimation} loop={loopSearchAnimation} source={animations['searching-around']} />
    </View>
  </View>
  );
};

const AddMember = () => {
  const searchAnimation = useRef(null)
  const [userSelected, _setUserSelected] = useState(null)
  const [username, _setUsername] = useState(null)
  const [loopSearchAnimation, _setLoopSearchAnimation] = useState(true)
  const {current_group: group, users_searched} = useSelector (state => state.session);
  const {more_pages, loading, refreshing} = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  let _users_searched0 = users_searched.slice(0, Math.ceil(users_searched.length / 2)) 
  let _users_searched1 = users_searched.slice(Math.ceil(users_searched.length / 2), users_searched.length)
  console.log('userSelected: ', userSelected);
  
  /*   useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_MEMBERS',
        payload: {id: current_group.id},
      });
    },
    [dispatch]
  ); */
  const handleOnPressUser = (member) => {
    console.log(member);
    
    _setUserSelected(member)  
  }

  const handleUserSearch = (username) => {
    _setUsername(username)
    dispatch({type: 'session/SEARCH_USERS', payload: { querySearch: username}})
  }

  const handleAddMember = () => {
    dispatch({
      type: 'groups/ADD_GROUP_MEMBER',
      payload: {id: group.id, userID: userSelected.id, goBack}
    })
  }

  return (
    <View style={styles.container}>
      <HeaderComponent group={group} username={username} handleUserSearch={handleUserSearch} _setLoopSearchAnimation={_setLoopSearchAnimation} searchAnimation={searchAnimation} loopSearchAnimation={loopSearchAnimation} goBack={goBack}/>
        {
          users_searched.length > 0 ? 
            <ScrollView 
              style={styles.bodyContainer}
              keyboardShouldPersistTaps="always"
            >
              <Grid style={styles.usersContainer}>
                <Row style={styles.userRow}>
                  <Col>
                    {_users_searched0.map((member) => 
                      <FloatingUser onPress={() => handleOnPressUser(member)} key={member.id} {...member}/>
                    )}
                  </Col>
                  <Col>
                    {_users_searched1.map((member) => 
                      <FloatingUser onPress={() => handleOnPressUser(member)} key={member.id} {...member}/>
                    )}
                  </Col>
                </Row>
              </Grid> 
          </ScrollView>
          :
          <View style={styles.bodyContainer}>
            <NoResults lottieProps={{autoSize: true, style:{width: wp(30)}}} animationName="user-scanning" primaryText="¡No se ha encontrado ningún usuario!" primaryTextStyles={{color: 'white'}} secondaryText="Verifique su busqueda o ingrese otro nombre"/>
          </View>
        }
      {userSelected && <View style={styles.userSelectedContainer}>
          <View style={styles.userSelectedImageContainer}>
            <Image resizeMode="cover" style={styles.userSelectedImage} source={userSelected.picture ? {uri: `${userSelected.picture.uri}`} : Images['no-profile-photo']}/>
          </View>
          <View style={styles.userSelectedNameContainer}>
            <MyText
              style={styles.userSelectedName}
              fontStyle="semibold"
            >
              {userSelected.firstName} {userSelected.firstLastname}
            </MyText>
          </View>
          <View style={styles.userSelectedActions}>
            <Button onPress={handleAddMember} primary iconRight block superRounded>
              {/* <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} fontStyle="bold">Añadir al grupo</MyText> */}
              <Icon
                type="AntDesign"
                name="adduser"
                style={{color: "white", fontSize: theme.ICON_SIZE_SMALL}}
              />
            </Button>
            <Button onPress={() => _setUserSelected(null)} style={styles.cancelButton} danger block superRounded>
              <Icon
                type="AntDesign"
                name="close"
                style={{color: "white", fontSize: theme.ICON_SIZE_SMALL}}
              />
            </Button>
          </View>
      </View>}
    </View>
  );
};

AddMember.navigationOptions = ({navigation}) => {
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

export default AddMember;
