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
import CardUser from '../../../components/CardUser/index.js';
import FloatingUser from '../../../components/FloatingUser/index.js';
import animations from '../../../constants/Animations.js';
import FloatingUserSelect from '../../../components/FloatingUserSelect/index.js';
import { AntDesign } from '@expo/vector-icons';

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
  const {current_group: group} = useSelector (state => state.groups);
  const {current_event_task: task} = useSelector (state => state.events);
  let _group_members = group_members.map((member) => member.user)
  const {new_task: task, current_event: event} = useSelector (state => state.events);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  
  console.log(task);
  
  /* useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_MEMBERS',
        payload: {id: group.id},
      });
    },
    [dispatch]
  ); */

  const FloatingUsers = () => {
    return <Row style={styles.userRow}>
      <Col>
        {group_members0.map((member, i) => 
          <FloatingUserSelect onPress={() => handleOnPressUser(0, member, i)} selected={member.isSelected} key={member.id} {...member}/>
        )}
      </Col>
      <Col>
        {group_members1.map((member, i) => 
          <FloatingUserSelect onPress={() => handleOnPressUser(1, member, i)} selected={member.isSelected} key={member.id} {...member}/>
        )}
      </Col>
    </Row>
  }

  return (
    <View style={styles.container}>
      <HeaderComponent group={group} taskName={task.taskName} description={task.description}  goBack={goBack}/>
        {
          task.group_members.length > 0 ? 
            <ScrollView 
              style={styles.bodyContainer}
              keyboardShouldPersistTaps="always"
            >
              <Grid style={styles.usersContainer}>
                <FloatingUsers/>
              </Grid> 
              {
                membersSelected.length > 0 &&
                <Button warning iconRight block superRounded style={styles.assignButton} onPress={handleShowTask}>
                  <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} fontStyle="bold">Asignar</MyText>
                  <AntDesign
                    name="rightcircle"
                    color="white"
                    size={theme.ICON_SIZE_SMALL}
                  />
                </Button>
              }
          </ScrollView>
          :
          <View style={styles.bodyContainer}>
            <NoResults lottieProps={{autoSize: true, style:{width: wp(30)}}} animationName="user-scanning" primaryText="¡No se ha encontrado ningún usuario!" primaryTextStyles={{color: 'white'}} secondaryText="Verifique su busqueda o ingrese otro nombre"/>
          </View>
        }
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
