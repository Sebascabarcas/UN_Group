import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {
  Button,
  Content,
} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
// import {NavigationAction} from 'react-navigation';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import getEnvVars from '../../../environment.js';
import MyText from '../../../components/MyText';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import Images from '../../../constants/Images.js';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';

const HeaderComponent = ({canEdit, dispatch, post, navigate, goBack}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
        <View>
          <Button
          // block
            style={{marginLeft: 6}}
            iconLeft
            transparent
            onPress={() => goBack ()}
          >
            <Ionicons
              name="ios-arrow-back"
              color={theme.PRIMARY_COLOR}
              size={theme.ICON_SIZE_SMALL}
            />
          </Button>
        </View>
        <View style={styles.groupInfoContainer}>
          <Image
            resizeMode="cover"
            style={styles.imageGroup}
            source={
              post.user.picture
                ? {uri: `${post.user.picture.uri}`}
                : Images['no-profile-photo']
            }
          />
          <View>
            <MyText style={{color: theme.DARK_COLOR}} fontStyle="bold">
              Autor
            </MyText>
            <MyText
              style={{color: theme.GRAY_LIGHT_COLOR}}
              fontStyle="semibold"
            >
              {post.user.firstName} {post.user.firstLastName}
            </MyText>
          </View>
        </View>
        <View>
        {canEdit && <Button
            // block
            style={{marginRight: 6}}
            iconLeft
            transparent
            onPress={() => {
              dispatch ({
                type: 'roleModels/SET_STATE',
                payload: {editing_post: post},
              });
              navigate ('EditPost');
            }}
          >
            <Ionicons
              name="ios-create"
              color={theme.PRIMARY_COLOR}
              size={theme.ICON_SIZE_SMALL}
            />
          </Button>}
        </View>
      </View>
      <View style={styles.userTextInputContainer}>
        <MyText
          style={{
            textAlign: 'center',
            fontFamily: theme.FONT_FAMILY_BOLD,
            fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE,
          }}
        >
          {post.title}
        </MyText>
      </View>
      <View style={styles.postImgContainer}>
        <ImageBackground
          imageStyle={{borderRadius: 100}}
          style={styles.profileImg}
          source={post.postPicture ? {uri: post.postPicture.uri} : Images['logo']}
        />
      </View>
    </View>
  );
};

const ShowPost = () => {
  const {current_user: user, current_group: group} = useSelector (state => state.session);
  const {current_post: post} = useSelector (state => state.roleModels);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  const handleShowPost = () => {
    dispatch ({
      type: 'roleModels/CREATE_POST',
      payload: {
        goBack,
        post,
      },
    });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        dispatch={dispatch}
        navigate={navigate}
        canEdit={post.user.id === user.id}
        post={post}
        goBack={goBack}
      />
      <Content padder>
        <MyText style={{textAlign: 'justify'}}>
          {post.description}
        </MyText>
      </Content>
    </View>
  );
};

export default ShowPost;
