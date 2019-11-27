import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../../styles/theme.style';
import styles from './styles';
import MyText from '../../../components/MyText';
import {
  Input,
  Button,
  Item,
  Container,
  Icon,
  Content,
  Label,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

const {height: fullHeight} = Dimensions.get ('window');

const AddAdress = () => {
  const {navigate, getParam} = useNavigation ();
  const current_event = getParam('current_event', 'new_event')
  const {[current_event]: event} = useSelector (state => state.events);
  const [loading, _setLoading] = useState (false);
  const [offSet, _setOffSet] = useState (0);
  const dispatch = useDispatch ();

  return (
    
    <Container style={styles.container}>
      <Content padder>
        <Item onPress={() => navigate('SelectTypeOfRoad')} floatingLabel>
          <Label>Tipo de vía</Label>
          <Input value={event.typeOfRoad} onFocus={() => navigate('SelectTypeOfRoad', {current_event})} />
          <Icon active color={theme.PRIMARY_COLOR} name="ios-arrow-forward" />
        </Item>
        <View style={styles.inlineForm}>
          <Item style={styles.inlineInput} floatingLabel>
            <Label>Vía Principal</Label>
            <Input onChangeText={(mainRoad) => dispatch({type: 'events/SET_STATE', payload: {[current_event]: {...event, mainRoad}}})} value={event.mainRoad} />
          </Item>
          <Item style={styles.inlineInput} floatingLabel>
            <Label>#Vía Secundaria</Label>
            <Input onChangeText={(secondaryRoad) => dispatch({type: 'events/SET_STATE', payload: {[current_event]: {...event, secondaryRoad}}})} value={event.secondaryRoad} />
          </Item>
          <View style={{height: 25, marginHorizontal: 10, alignSelf: 'flex-end'}}>
            <MyText>-</MyText>
          </View>
          <Item style={styles.inlineInputNum} floatingLabel>
            <Label>Num</Label>
            <Input onChangeText={(roadNumber) => dispatch({type: 'events/SET_STATE', payload: {[current_event]: {...event, roadNumber}}})} value={event.roadNumber} />
          </Item>
        </View>
      </Content>
      <Button
        disabled={!event.mainRoad || !event.secondaryRoad}
        primary
        full
        onPress={() => {
          dispatch ({type: 'events/FIND_LOCATION', payload: {current_event, event, navigate}});
          // navigate ('Groups');
        }}
        // onPress={() => navigate('EditProfile')}
        style={styles.actionBottomButton}
      >
        <MyText
          style={{fontSize: theme.FONT_SIZE_LARGE}}
          fontStyle="bold"
          color="white"
        >
          BUSCAR
        </MyText>
      </Button>
    </Container>
  );
};

export default AddAdress;
