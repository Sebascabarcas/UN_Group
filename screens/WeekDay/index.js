import React, {useEffect, useState} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../styles/theme.style';
import styles from './styles';
import {
  Container,
  Content,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import BigListItem from '../../components/BigListItem';

const WeekDay = () => {
  const {goBack, getParam} = useNavigation ();
  const {new_availability: availability} = useSelector (state => state.mentors);
  const dispatch = useDispatch ();

  const handleOnPress = (weekDay) => {
    dispatch({
      type: 'mentors/SET_STATE',
      payload: {new_availability: {...availability, weekDay}}
    })
    goBack();
  }

  const WeekDayItem = ({weekDay}) => {
    return <BigListItem
      onPress={() => handleOnPress(weekDay)}
      primaryText={weekDay}
      primaryTextStyles={{paddingTop: 0, paddingBottom: 0}}
    />
  }

  return (
    <Container style={styles.container}>
      <Content padder>
        <WeekDayItem
          weekDay="Lunes"
        />
        <WeekDayItem
          weekDay="Martes"
        />
        <WeekDayItem
          weekDay="Miercoles"
        />
        <WeekDayItem
          weekDay="Jueves"
        />
        <WeekDayItem
          weekDay="Viernes"
        />
        <WeekDayItem
          weekDay="Sábado"
        />
        <WeekDayItem
          weekDay="Domingo"
        />
      </Content>
    </Container>
  );
};

export default WeekDay;
