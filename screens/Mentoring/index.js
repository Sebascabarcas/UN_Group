import React, {useEffect, useState, useRef} from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import {Button, Content, Icon} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import getEnvVars from '../../environment.js';
import MyText from '../../components/MyText';
import styles from './styles';
import theme from '../../styles/theme.style.js';
import NoResults from '../../components/NoResults/index.js';
import {AntDesign, MaterialIcons, Feather} from '@expo/vector-icons';
import CardPost from '../../components/CardPost/index.js';
import BigIconItem from '../../components/BigIconItem/index.js';
import CardActivity from '../../components/CardActivity/index.js';

const HeaderComponent = ({goBack, navigate}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
        <View style={styles.groupInfoContainer}>
          <Feather
            name="activity"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_LARGE}
          />
          <View>
            <MyText style={{color: theme.DARK_COLOR}} fontStyle="bold">
              Actividades
            </MyText>
            <MyText
              style={{
                color: theme.GRAY_LIGHT_COLOR,
                fontSize: theme.FONT_SIZE_SMALL,
              }}
              fontStyle="semibold"
            >
              Encuentra aquí tus actividades
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
          Mis Actividades
        </MyText>
      </View>
    </View>
  );
};

const Mentoring = () => {
  const flatList = useRef (null);
  const {current_user: user} = useSelector (state => state.session);
  const {mentor_activities: activities} = useSelector (state => state.mentors);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  useEffect (
    () => {
      dispatch ({
        type: 'mentors/GET_MENTOR_ACTIVITIES',
        payload: {userId: user.id},
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
    navigate ('ShowActivity');
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        dispatch={dispatch}
        goBack={goBack}
        navigate={navigate}
      />
      
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
        <Button
          primary
          full
          onPress={() => {
            dispatch({
              type: 'mentors/SET_STATE',
              payload: {new_activity: {}}
            });
            navigate ('CreateActivity');
          }}
          // onPress={() => navigate('EditProfile')}
          style={styles.actionBottomButton}
        >
          <MyText
            style={{fontSize: theme.FONT_SIZE_LARGE}}
            fontStyle="bold"
            color="white"
          >
            NUEVA ACTIVIDAD
          </MyText>
        </Button>
    </View>
  );
};

Mentoring.navigationOptions = ({navigation}) => {
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

export default Mentoring;
