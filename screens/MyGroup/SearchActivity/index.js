import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  Image,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import {
  Button,
  Content,
  Icon,
  Container,
} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import getEnvVars from '../../../environment.js';
import MyText from '../../../components/MyText';
import styles from './styles';
import theme from '../../../styles/theme.style.js';
import NoResults from '../../../components/NoResults/index.js';
import CardActivity from '../../../components/CardActivity/index.js';

const HeaderComponent = ({
  group,
  activityName,
  handleActivityName,
  _setLoopSearchAnimation,
  searchAnimation,
  loopSearchAnimation,
  goBack,
}) => {
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
            <MyText
              style={{color: theme.GRAY_LIGHT_COLOR}}
              fontStyle="semibold"
            >
              Actividades de Mentoría
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
          onFocus={() => {
            searchAnimation.current.play ();
          }}
          onBlur={() => {
            _setLoopSearchAnimation (false);
          }}
          onChangeText={activityName => handleActivityName (activityName)}
          value={activityName}
          //  autoFocus
        />
        <LottieView ref={searchAnimation} style={styles.searchAnimation} loop={loopSearchAnimation} source={animations['searching-around']} />
      </View>
    </View>
  );
};

const SearchActivity = () => {
  const searchAnimation = useRef (null);
  const flatList = useRef (null);
  const [activityName, _setActivityName] = useState (null);
  const [loopSearchAnimation, _setLoopSearchAnimation] = useState (true);
  const {current_group: group} = useSelector (state => state.session);
  const {activities, refreshing} = useSelector (state => state.mentors);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  /*   useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_MEMBERS',
        payload: {id: current_group.id},
      });
    },
    [dispatch]
  ); */
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

  const _onPressActivity = activity => {
    Keyboard.dismiss ();
    dispatch ({
      type: 'mentors/SET_STATE',
      payload: {current_activity: activity},
    });
    navigate ('ShowMentorActivity');
  };

  const handleActivityName = activityName => {
    _setActivityName (activityName);
    dispatch ({
      type: 'mentors/SEARCH_ACTIVITIES',
      payload: {searchQuery: activityName},
    });
  };

  return (
    <Container style={styles.container}>
      <HeaderComponent
        group={group}
        activityName={activityName}
        handleActivityName={handleActivityName}
        _setLoopSearchAnimation={_setLoopSearchAnimation}
        searchAnimation={searchAnimation}
        loopSearchAnimation={loopSearchAnimation}
        goBack={goBack}
      />
      {activities.length > 0
        ? <Content style={styles.bodyContainer}>
            <FlatList
              // style={styles.scroller}
              data={activities}
              keyExtractor={activity => activity.id.toString ()}
              renderItem={_renderActivity}
              showsVerticalScrollIndicator={false}
              ref={flatList}
              refreshing={refreshing}
              onRefresh={_onRefresh}
              // onEndReached={!noMorePages && _fetchGroupMentoringOnEnd}
              // onEndReachedThreshold={0.2}
            />
          </Content>
        : <View style={styles.bodyContainer}>
            <NoResults
              lottieProps={{autoSize: true, style: {width: wp (30)}}}
              animationName="scanning"
              primaryText="¡No se ha encontrado ninguna actividad!"
              primaryTextStyles={{color: 'white'}}
              secondaryText="Verifique su busqueda o ingrese otro nombre"
            />
          </View>}
    </Container>
  );
};

export default SearchActivity;
