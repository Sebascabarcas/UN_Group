import React, {useEffect, useState, useRef} from 'react';
import {View, Dimensions, FlatList, Image} from 'react-native';
import {Button, Content, Icon, Container} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import MyText from '../../../components/MyText';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import NoResults from '../../../components/NoResults/index.js';
import CardActivity from '../../../components/CardActivity/index.js';
import Images from '../../../constants/Images';

const HeaderComponent = ({goBack, user}) => {
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
              Mentor
            </MyText>
            <MyText
              style={{color: theme.GRAY_LIGHT_COLOR}}
              fontStyle="semibold"
            >
              {user.firstName} {user.firstLastName}
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
          Actividades
        </MyText>
      </View>
    </View>
  );
};

const ShowMentor = () => {
  const flatList = useRef (null);
  const {current_user: user} = useSelector (state => state.session);
  const {mentor_activities: activities, current_mentor: mentor} = useSelector (
    state => state.mentors
  );
  console.log(mentor);
  
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  useEffect (
    () => {
      dispatch ({
        type: 'mentors/GET_MENTOR_ACTIVITIES',
        payload: {userId: mentor.userId},
      });
    },
    [dispatch]
  );

  _fetchActivitiesOnEnd = async () => {
    dispatch ({
      type: 'mentors/GET_MENTOR_ACTIVITIES',
      payload: {userId: user.id},
      concat: true,
    });
  };

  _onRefresh = async () => {
    dispatch ({
      type: 'mentors/GET_MENTOR_ACTIVITIES',
      payload: {userId: user.id},
    });
  };

  _renderActivity = ({item: activity, index}) => {
    return (
      <CardActivity
        {...activity}
        touchContainerStyles={{marginVertical: 10}}
        onPress={() => _onPressActivity (activity)}
      />
    );
    // <CardEvent groupName="W-STEM" location={event.location} name={event.eventName} time={moment(event.date).format('hh:mm A')} date={moment(event.date).format('YYYY-MM-DD')} description={event.description} onPress={() => _onPressEvent(event)} />
  };

  _onPressActivity = activity => {
    dispatch ({
      type: 'mentors/SET_STATE',
      payload: {current_activity: activity},
    });
    navigate ('ShowMentorActivity');
  };

  return (
    <Container style={styles.container}>
      <HeaderComponent user={mentor.user} goBack={goBack} navigate={navigate} />

      {activities.length > 0
        ? <Content contentContainerStyle={styles.bodyContainer} padder>
            <FlatList
              // style={styles.scroller}
              data={activities}
              keyExtractor={activity => activity.id.toString ()}
              renderItem={_renderActivity}
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
              primaryText="¡No se ha encontrado ningúna actividad!"
              primaryTextStyles={{color: 'white'}}
              secondaryText={`¡Agregue sus actividades!`}
            />
          </View>}
    </Container>
  );
};

export default ShowMentor;
