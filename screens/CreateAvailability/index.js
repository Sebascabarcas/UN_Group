import React, {useEffect, useState} from 'react';
import {View, Dimensions, Image} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../styles/theme.style';
import styles from './styles.js';
import MyText from '../../components/MyText';
import {
  Button,
  Icon,
  Container,
  Content,
} from 'native-base';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Images from '../../constants/Images';
import moment from 'moment'

const HeaderComponent = ({goBack, user, activityName}) => (
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
          <MyText style={{color: theme.GRAY_LIGHT_COLOR}} fontStyle="semibold">
            {activityName}
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
        Disponibilidad
      </MyText>
    </View>
  </View>
);

const CreateAvailability = () => {
  const {navigate, goBack} = useNavigation ();
  const dispatch = useDispatch ();
  const {
    new_availability: availability,
    current_activity: activity,
  } = useSelector (state => state.mentors);
  // const {new_group: group} = useSelector (state => state.groups);
  const {current_group: group} = useSelector (state => state.session);
  const [isDateTimePickerVisible, _setIsDateTimePickerVisible] = useState (
    false
  );
  const [timeType, _setTimeType] = useState (
    'start_time'
  );

  handleCreateAvailability = async () => {
    dispatch ({
      type: 'mentors/CREATE_AVAILABILITY',
      payload: {activityId: activity.id, availability, navigate, goBack},
    });
  };

  handleTimePicked = time => {
    _setIsDateTimePickerVisible (false);
    dispatch ({
      type: 'mentors/SET_STATE',
      payload: {
        new_availability: {
          ...availability,
          [timeType]: moment (time).format ('hh:mm A'),
        },
      },
    });
    // hideDateTimePicker ();
    _setIsDateTimePickerVisible (false);
    // console.log(new Date (moment (date).format ('MM-DD-YYYY')))
    // console.log(new Date (date))
  };
  
  showDateTimePicker = (type) => {
    _setTimeType(type)
    _setIsDateTimePickerVisible (true);
  };

  hideDateTimePicker = () => {
    _setIsDateTimePickerVisible (false);
  };

  return (
    <Container style={styles.container}>
      <HeaderComponent goBack={goBack} {...activity} />
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleTimePicked}
        // date={new Date (event.date)}
        // minimumDate={new Date ()}
        mode="time"
        onCancel={hideDateTimePicker}
      />
      <Content contentContainerStyle={styles.content} padder>
        <TouchableWithoutFeedback
          onPress={() => navigate ('SelectWeekDay')}
          style={styles.dateTimeContainer}
        >
          <AntDesign
            name="calendar"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_MEDIUM}
          />
          <View>
            <MyText fontStyle="bold">¿Qué día de semana?</MyText>
            <MyText>Día de la semana</MyText>
            {availability.weekDay && <MyText fontStyle="bold">{availability.weekDay}</MyText>}
          </View>
          <Ionicons
            name="ios-arrow-forward"
            color={theme.GRAY_COLOR2}
            size={theme.ICON_SIZE_MEDIUM}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => showDateTimePicker ('start_time')}
          style={styles.dateTimeContainer}
        >
          <AntDesign
            name="clockcircle"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_MEDIUM}
          />
          <View style={{alignSelf: 'flex-start'}}>
            <MyText fontStyle="bold">¿A qué hora empieza?</MyText>
            <MyText>Hora de inicio</MyText>
            {availability.start_time &&
              <MyText fontStyle="bold">{availability.start_time}</MyText>}
          </View>
          <Ionicons
            name="ios-arrow-forward"
            color={theme.GRAY_COLOR2}
            size={theme.ICON_SIZE_MEDIUM}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => showDateTimePicker ('end_time')}
          style={styles.dateTimeContainer}
        >
          <AntDesign
            name="clockcircle"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_MEDIUM}
          />
          <View style={{alignSelf: 'flex-start'}}>
            <MyText fontStyle="bold">¿A qué hora termina?</MyText>
            <MyText>Hora de finalización</MyText>
            {availability.end_time &&
              <MyText fontStyle="bold">{availability.end_time}</MyText>}
          </View>
          <Ionicons
            name="ios-arrow-forward"
            color={theme.GRAY_COLOR2}
            size={theme.ICON_SIZE_MEDIUM}
          />
        </TouchableWithoutFeedback>
      </Content>
      {
        <Button
          primary
          full
          onPress={handleCreateAvailability}
          // onPress={() => navigate('EditProfile')}
          style={styles.actionBottomButton}
        >
          <MyText
            style={{fontSize: theme.FONT_SIZE_LARGE}}
            fontStyle="bold"
            color="white"
          >
            <Icon
              type="FontAwesome"
              name="plus-circle"
              style={{color: "white", fontSize: theme.ICON_SIZE_MEDIUM}}
            />
          </MyText>
        </Button>
      }
    </Container>
  );
};

export default CreateAvailability;
