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
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import CardPost from '../../../components/CardPost/index.js';
import Images from '../../../constants/Images.js';

const HeaderComponent = ({user: {firstName, firstLastName, picture}}) => {
  return (
  <View style={styles.headerContainer}>
      <View style={styles.userTextInputContainer}>
        <View style={styles.postImgContainer}>
          <ImageBackground
            style={styles.profileImg}
            source={picture ? {uri: picture.uri} : Images['no-profile-photo']}
          />
        </View>
        <MyText
          style={{
            textAlign: 'center',
            fontFamily: theme.FONT_FAMILY_BOLD,
            fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE,
          }}
        >
          {firstName} {firstLastName}
        </MyText>
      </View>
  </View>
  );
};

const ShowRoleModel = () => {
  const flatList = useRef (null);
  const {current_user: user, current_group: group} = useSelector (state => state.session);
  const {current_role_model: role_model, current_role_model_posts: posts} = useSelector (state => state.roleModels);
  // const {current_group: group, current_user_tasks: tasks, refreshing} = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();
  
  useEffect (
    () => {
      dispatch ({
        type: 'roleModels/GET_ROLE_MODEL_POSTS',
        payload: {groupId: group.id, userId: role_model.userId},
      });
    },
    [dispatch]
  );

  _fetchTasksOnEnd = async () => {
    dispatch ({
      type: 'roleModels/GET_ROLE_MODEL_POSTS',
      payload: {groupId: group.id, userId: role_model.userId},
      concat: true
    });
  };

  _onRefresh = async () => {
    dispatch ({
      type: 'roleModels/GET_ROLE_MODEL_POSTS',
      payload: {groupId: group.id, userId: role_model.userId},
    });
  };

  _renderPost = ({item: post, index}) => {
    return (
      <CardPost {...post} user={role_model.user} containerStyles={{marginVertical: 10}} onPress={() => _onPressPost(post)}/>
    );
  };

  _onPressPost = (post) => {
    dispatch({
      type: 'roleModels/SET_STATE',
      payload: { current_post: {...post, file: post.postPicture, user: role_model.user} }
    });
    navigate('ShowPost')
  };


  return (
    <View style={styles.container}>
      <HeaderComponent {...role_model}/>
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
                  // onEndReached={!noMorePages && _fetchEventsOnEnd}
                  // onEndReachedThreshold={0.2}
                />
          </Content>
          :
          <View style={styles.bodyContainer}>
            <NoResults lottieProps={{autoSize: true, style:{width: wp(30)}}} animationName="minnion-looking" primaryText="¡No se ha encontrado ningúna publicación!" primaryTextStyles={{color: 'white'}} secondaryText={`Vuelva más tarde`}/>
          </View>
      }
    </View>
  );
};

ShowRoleModel.navigationOptions = ({navigation}) => {
  return {
    title: 'Perfil',
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
          style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.PRIMARY_COLOR}}
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

export default ShowRoleModel;
