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

const HeaderComponent = ({user, activityName, handleActivityName, goBack}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
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
              {user.firstName} {user.firstLastName}
            </MyText>
            <MyText
              style={{color: theme.GRAY_LIGHT_COLOR}}
              fontStyle="semibold"
            >
              Nueva Actividad
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
          style={{
            textAlign: 'center',
            fontFamily: theme.FONT_FAMILY_BOLD,
            fontSize: theme.FONT_SIZE_EXTRA_LARGE,
          }}
          placeholder="Nombre de la Actividad"
          onChangeText={activityName => handleActivityName (activityName)}
          value={activityName}
          //  autoFocus
        />
      </View>
    </View>
  );
};

const CreateActivity = () => {
  const {current_user: user, current_group: group} = useSelector (
    state => state.session
  );
  const {new_activity: activity} = useSelector (state => state.mentors);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  const handleCreateActivity = () => {
    dispatch ({
      type: 'mentors/CREATE_ACTIVITY',
      payload: {
        goBack,
        userId: user.id,
        activity,
        navigate,
      },
    });
  };

  const handleActivityName = activityName => {
    dispatch ({
      type: 'mentors/SET_STATE',
      payload: {new_activity: {...activity, activityName}},
    });
  };

  return (
    <Container style={styles.container}>
      <HeaderComponent
        user={user}
        {...activity}
        handleActivityName={handleActivityName}
        goBack={goBack}
      />
      <Button
        style={styles.activityButton}
        onPress={handleCreateActivity}
        full
        block
        primary
      >
        <Icon
          type="FontAwesome"
          name="book"
          style={{color: 'white', fontSize: theme.ICON_SIZE_MEDIUM}}
        />
      </Button>
    </Container>
  );
};

CreateActivity.navigationOptions = ({navigation}) => {
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

export default CreateActivity;
