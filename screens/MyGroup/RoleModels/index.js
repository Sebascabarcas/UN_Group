import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
} from 'react-native';
import {Button, Switch, Content, Icon, Grid, Row, Col, Item, Input, Label, Fab} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import getEnvVars from '../../../environment.js';
import MyText from '../../../components/MyText';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import NoResults from '../../../components/NoResults/index.js';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import CardTask from '../../../components/CardTask/index.js';
import FloatingRoleModel from '../../../components/FloatingRoleModel/index.js';
import CardPost from '../../../components/CardPost/index.js';

const {apiUrl} = getEnvVars ();
const {height: fullHeight} = Dimensions.get ('window');

const HeaderComponent = ({goBack, navigate, dispatch, roleModels}) => {
  return (
  <View style={styles.headerContainer}>
    <View style={styles.headerInnerContainer}>
      <View style={styles.groupInfoContainer}>
        <MaterialIcons
          name="timeline"
          color={theme.PRIMARY_COLOR}
          size={theme.ICON_SIZE_LARGE}
        />
        <View>
          <MyText style={{color: theme.DARK_COLOR}} fontStyle="bold">
            Timeline
          </MyText>
          <MyText style={{color: theme.GRAY_LIGHT_COLOR, fontSize: theme.FONT_SIZE_SMALL}} fontStyle="semibold">
            Encuentra las últimas actualizaciones 
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
    <ScrollView
          style={styles.floatingScrollView}
          contentContainerStyle={styles.floatingScrollViewContainer}
          horizontal
          // scrollEventThrottle={200}
          // directionalLockEnabled={true}
    >
      {
        roleModels.map(
          roleModel => 
          <FloatingRoleModel
            key={roleModel.id} 
            onPress={
              () => {
                dispatch({
                  type: 'roleModels/SET_STATE',
                  payload: {
                    current_role_model: roleModel
                  }
                })
                navigate('ShowRoleModel')
              }
            } 
            {...roleModel.user}
          />
        )
      }
    </ScrollView>
  </View>
  );
};

const RoleModels = () => {
  const flatList = useRef (null);
  const {posts, role_models} = useSelector (state => state.roleModels);
  const {isRolemodel, isAdmin} = useSelector (state => state.session);
  const {current_group: group, refreshing} = useSelector (state => state.session);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
 
   useEffect (
    () => {
      dispatch ({
        type: 'roleModels/GET_ROLE_MODELS',
        payload: {groupId: group.id},
      });
      dispatch ({
        type: 'roleModels/GET_ROLE_MODELS_POSTS',
        payload: {groupId: group.id},
      });
    },
    [dispatch]
  );

  _fetchPostsOnEnd = async () => {
    dispatch ({
      type: 'roleModels/GET_ROLE_MODELS_POSTS',
      payload: {groupId: group.id},
      concat: true
    });
  };

  _onRefresh = async () => {
    dispatch ({
      type: 'roleModels/GET_ROLE_MODELS_POSTS',
      payload: {groupId: group.id},
    });
  };

  _renderPost = ({item: post, index}) => {
    return (
      <CardPost {...post} containerStyles={{marginVertical: 10}} onPress={() => _onPressPost(post)}/>
      // <CardEvent groupName="W-STEM" location={event.location} name={event.eventName} time={moment(event.date).format('hh:mm A')} date={moment(event.date).format('YYYY-MM-DD')} description={event.description} onPress={() => _onPressEvent(event)} />
    );
  };

  _onPressPost = (post) => {
    dispatch({
      type: 'roleModels/SET_STATE',
      payload: { current_post: {...post, file: post.postPicture} }
    });
    navigate('ShowPost')
  };

  return (
    <View style={styles.container}>
      <HeaderComponent roleModels={role_models} dispatch={dispatch} goBack={goBack} navigate={navigate}/>
        {
          posts.length > 0 ? 
          <Content contentContainerStyle={styles.bodyContainer} padder>
            <FlatList
                  // style={styles.scroller}
                  data={posts}
                  keyExtractor={post => post.id.toString ()}
                  renderItem={_renderPost}
                  showsVerticalScrollIndicator={false}
                  ref={flatList}
                  refreshing={false}
                  onRefresh={_onRefresh}
                  // onEndReached={!noMorePages && _fetchPostsOnEnd}
                  // onEndReachedThreshold={0.2}
                />
          </Content>
          :
          <View style={styles.bodyContainer}>
            <NoResults lottieProps={{autoSize: true, style:{width: wp(30)}}} animationName="minnion-looking" primaryText="¡No se ha encontrado ningúna publicación!" primaryTextStyles={{color: 'white'}} secondaryText={`Vuelva más tarde`}/>
          </View>
      }
      {isRolemodel && <Button
        primary
        full
        onPress={() => {
          navigate ('CreatePost');
        }}
        // onPress={() => navigate('EditProfile')}
        style={styles.actionBottomButton}
      >
        <MyText
          style={{fontSize: theme.FONT_SIZE_LARGE}}
          fontStyle="bold"
          color="white"
        >
          NUEVA PUBLICACIÓN
        </MyText>
      </Button>}
    </View>
  );
};

RoleModels.navigationOptions = ({navigation}) => {
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

export default RoleModels;
