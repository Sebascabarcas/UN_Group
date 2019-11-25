import React, {useEffect, useState, useRef} from 'react';
import {View, Dimensions, Image, ImageBackground, FlatList} from 'react-native';
import {Button, Content, Icon} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
// import {NavigationAction} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import MyText from '../../../components/MyText';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import Images from '../../../constants/Images.js';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import CardAvailability from '../../../components/CardAvailability';
import NoResults from '../../../components/NoResults';

const HeaderComponent = ({activity, goBack}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
        <View style={styles.groupInfoContainer}>
          <Image
            resizeMode="cover"
            style={styles.imageGroup}
            source={
              activity.user.picture
                ? {uri: `${activity.user.picture.uri}`}
                : Images['no-profile-photo']
            }
          />
          <View>
            <MyText style={{color: theme.DARK_COLOR}} fontStyle="bold">
              Mentor
            </MyText>
            <MyText
              style={{color: theme.GRAY_LIGHT_COLOR}}
              fontStyle="semibold"
            >
              {activity.user.firstName} {activity.user.firstLastName}
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
        <MyText
          style={{
            textAlign: 'center',
            fontFamily: theme.FONT_FAMILY_BOLD,
            fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE,
          }}
        >
          {activity.activityName}
        </MyText>
      </View>
    </View>
  );
};

const ShowMentorActivity = () => {
  const flatList = useRef (null);
  const {current_user: user, current_group: group} = useSelector (
    state => state.session
  );
  const {
    current_activity: activity,
    current_activity_availabilities: availabilities,
  } = useSelector (state => state.mentors);
  const dispatch = useDispatch ();
  const {navigate, goBack} = useNavigation ();
  const activityOwner = activity.user.id === user.id;
  console.log (availabilities);

  useEffect (
    () => {
      dispatch ({
        type: 'mentors/GET_ACTIVITY',
        payload: {activityId: activity.id},
      });
    },
    [dispatch]
  );

  _fetchAvailabilitiesOnEnd = async () => {
    dispatch ({
      type: 'mentors/GET_ACTIVITY',
      payload: {activityId: activity.id, navigate, goBack},
      concat: true,
    });
  };

  _onRefresh = async () => {
    dispatch ({
      type: 'mentors/GET_ACTIVITY',
      payload: {activityId: activity.id},
    });
  };

  _renderAvailability = ({item: availability, index}) => {
    return (
      <CardAvailability
        {...availability}
        canDelete={activity.userId === user.id}
        touchContainerStyles={{marginVertical: 10}}
        onPress={() => dispatch({
          type: 'modals/SET_STATE',
          payload: {
            confirmModalVisible: true,
            handleOnConfirm: _onDeleteAvailability
          }
        })}
      />
    );
    // <CardEvent groupName="W-STEM" location={event.location} name={event.eventName} time={moment(event.date).format('hh:mm A')} date={moment(event.date).format('YYYY-MM-DD')} description={event.description} onPress={() => _onPressEvent(event)} />
  };

  _onDeleteAvailability = availability => {
    dispatch ({
      type: 'mentors/DELETE_AVAILABILITY',
      payload: {availabilityId: availability.id},
    });
    // navigate ('ShowMentorActivity');
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        dispatch={dispatch}
        navigate={navigate}
        canEdit={activityOwner}
        activity={activity}
        goBack={goBack}
      />
      {availabilities.length > 0
        ? <Content contentContainerStyle={styles.bodyContainer} padder>
            <FlatList
              // style={styles.scroller}
              data={availabilities}
              keyExtractor={availability => availability.id.toString ()}
              renderItem={_renderAvailability}
              showsVerticalScrollIndicator={false}
              ref={flatList}
              refreshing={false}
              onRefresh={_onRefresh}
              // onEndReached={!noMorePages && _fetchActivitiesOnEnd}
              // onEndReachedThreshold={0.2}
            />
          </Content>
        : <View style={styles.bodyContainer}>
            <NoResults
              lottieProps={{autoSize: true, style: {width: wp (30)}}}
              animationName="minnion-looking"
              primaryText="¡No se ha encontrado ningúna disponibilidad!"
              primaryTextStyles={{color: 'white'}}
              secondaryText={`¡Vuelva más tarde!`}
            />
          </View>}
    </View>
  );
};

export default ShowMentorActivity;
