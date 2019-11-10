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

const AddMember = () => {
  const searchAnimation = useRef(null)
  const [userSelected, _setUserSelected] = useState(null)
  const [loopSearchAnimation, _setLoopSearchAnimation] = useState(true)
  const {current_group: group} = useSelector (state => state.session);
  const {more_pages, loading, refreshing, current_members_search} = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  console.log(userSelected)

  /*   useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_MEMBERS',
        payload: {id: current_group.id},
      });
    },
    [dispatch]
  ); */
  const handleAddMember = () => {
    dispatch({
      type: 'groups/ADD_GROUP_MEMBER',
      payload: {id: group.id, userID: userSelected.id, goBack}
    })
  }
  const HeaderComponent = () => {
    return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
        <View style={styles.groupInfoContainer}>
          <Image
            resizeMode="cover"
            style={styles.imageGroup}
            source={
              group.groupPicture
                ? {uri: `${apiUrl}${group.groupPicture.uri}`}
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
              console.log(searchAnimation.current.props)
              // searchAnimation.current.reset()
              _setLoopSearchAnimation(false)
            }}
            //  onChangeText={(eventName) => dispatch({type: 'events/SET_STATE', payload: { new_event: {...event, eventName}}})}
            //  value={event.eventName}
            //  autoFocus
        />
        <LottieView ref={searchAnimation} style={styles.searchAnimation} loop={loopSearchAnimation} source={animations['searching-around']} />
      </View>
    </View>
    );
  };

  const props = {
    id: 12,
    picture: {
      uri: '/static/images/d6832dcbd2195f5f9003b070926f42e21572528218791.png'
    },
    firstLastname: 'Cabarcas',
    firstName: 'Sebastian',
    onPress: () => _setUserSelected({
      id: 12,
      picture: {
        uri: '/static/images/d6832dcbd2195f5f9003b070926f42e21572528218791.png'
      },
      firstLastname: 'Cabarcas',
      firstName: 'Sebastian'
    })
  }
  
  return (
    <View style={styles.container}>
      <HeaderComponent/>
      <ScrollView style={styles.bodyContainer}>
        {
          current_members_search.length > 0 ? 
          <NoResults lottieProps={{autoSize: true, style:{width: wp(30)}}} animationName="user-scanning" primaryText="¡No se ha encontrado ningún usuario!" primaryTextStyles={{color: 'white'}} secondaryText="Verifique su busqueda o ingrese otro nombre"/>
          :
          <Grid style={styles.usersContainer}>
            <Row style={styles.userRow}>
              <Col>
                <FloatingUser {...props}/>
              </Col>
              <Col>
                <FloatingUser {...props}/>
              </Col>
            </Row>
            <Row style={styles.userRow}>
              <Col>
                <FloatingUser {...props}/>
              </Col>
              <Col>
                <FloatingUser {...props}/>
              </Col>
            </Row>
            <Row style={styles.userRow}>
              <Col>
                <FloatingUser {...props}/>
              </Col>
              <Col>
                <FloatingUser {...props}/>
              </Col>
            </Row>
            <Row style={styles.userRow}>
              <Col>
                <FloatingUser {...props}/>
              </Col>
              <Col>
                <FloatingUser {...props}/>
              </Col>
            </Row>
          </Grid> 
        }
      </ScrollView>
      {userSelected && <View style={styles.userSelectedContainer}>
          <View style={styles.userSelectedImageContainer}>
            <Image resizeMode="cover" style={styles.userSelectedImage} source={userSelected.picture ? {uri: `${apiUrl}${userSelected.picture.uri}`} : Images['no-profile-photo']}/>
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
