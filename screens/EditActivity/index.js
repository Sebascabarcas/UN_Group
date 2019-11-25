import React, {useEffect, useState, useRef} from 'react';
import {View, Image, TextInput} from 'react-native';
import {
  Button,
  Content,
  Icon,
  Container,
} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import MyText from '../../components/MyText';
import styles from './styles';
import theme from '../../styles/theme.style.js';
import Images from '../../constants/Images.js';
import { Ionicons } from '@expo/vector-icons';

const HeaderComponent = ({user, activityName, id: activityId, handleActivityName, goBack, navigate, dispatch}) => {

  const handleDeleteActivity = () => {
    dispatch ({
      type: 'mentors/DELETE_ACTIVITY',
      payload: {activityId: activityId, navigate, goBack},
    });
  }

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
              user.picture
                ? {uri: `${user.picture.uri}`}
                : Images['no-profile-photo']
            }
          />
          <View>
            <MyText style={{color: theme.DARK_COLOR}} fontStyle="bold">
              Edición de actividad
            </MyText>
            <MyText
              style={{color: theme.GRAY_LIGHT_COLOR}}
              fontStyle="semibold"
            >
              {activityName}
            </MyText>
          </View>
        </View>
        <View>
        <Button
            // block
            style={{marginRight: 6}}
            iconLeft
            transparent
            onPress={() => {
              dispatch ({
                type: 'modals/SET_STATE',
                payload: {confirmModalVisible: true, handleOnConfirm: handleDeleteActivity},
              });
            }}
          >
            <Ionicons
              name="ios-trash"
              color={theme.DANGER_COLOR}
              size={theme.ICON_SIZE_MEDIUM}
            />
          </Button>
        </View>
      </View>
      <View style={styles.userTextInputContainer}>
        <TextInput
          style={{
            textAlign: 'center',
            fontFamily: theme.FONT_FAMILY_BOLD,
            fontSize: theme.FONT_SIZE_EXTRA_LARGE,
          }}
          placeholder="Nombre de la Actividad"
          autoFocus
          onChangeText={activityName => handleActivityName (activityName)}
          value={activityName}
          //  autoFocus
        />
      </View>
    </View>
  );
};

const EditActivity = () => {
  const {current_user: user, current_group: group} = useSelector (
    state => state.session
  );
  const {editing_activity: activity, current_activity} = useSelector (state => state.mentors);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  const handleEditActivity = () => {
    dispatch ({
      type: 'mentors/UPDATE_ACTIVITY',
      payload: {
        goBack,
        activityId: activity.id,
        activity,
        navigate,
      },
    });
  };

  const handleActivityName = activityName => {
    dispatch ({
      type: 'mentors/SET_STATE',
      payload: {editing_activity: {...activity, activityName}},
    });
  };

  return (
    <Container style={styles.container}>
      <HeaderComponent
        dispatch={dispatch}
        user={user}
        {...current_activity}
        handleActivityName={handleActivityName}
        goBack={goBack}
        navigate={navigate}
      />
      <Button
        style={styles.activityButton}
        onPress={handleEditActivity}
        full
        block
        primary
      >
        <Icon
          type="FontAwesome"
          name="save"
          style={{color: 'white', fontSize: theme.ICON_SIZE_MEDIUM}}
        />
      </Button>
    </Container>
  );
};

export default EditActivity;
