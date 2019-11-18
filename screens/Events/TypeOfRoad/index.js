import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import theme from '../../../styles/theme.style';
import styles from './styles';
import MyText from '../../../components/MyText';
import {
  Input,
  Header,
  Button,
  List,
  ListItem,
  Form,
  Item,
  Container,
  Icon,
  Left,
  Body,
  Content,
  Footer,
  FooterTab,
  Right,
  Label,
} from 'native-base';
import {FontAwesome, Foundation, MaterialIcons} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import BigListItem from '../../../components/BigListItem';

const {height: fullHeight} = Dimensions.get ('window');

const TypeOfRoad = () => {
  const {goBack, getParam} = useNavigation ();
  const current_event = getParam('current_event', 'new_event')
  const {[current_event]: event} = useSelector (state => state.events);
  const dispatch = useDispatch ();

  const handleOnPress = (typeOfRoad) => {
    dispatch({
      type: 'events/SET_STATE',
      payload: {[current_event]: {...event, typeOfRoad}}
    })
    goBack();
  }

  const TypeOfRoadItem = ({typeOfRoad}) => {
    return <BigListItem
      onPress={() => handleOnPress(typeOfRoad)}
      primaryText={typeOfRoad}
      primaryTextStyles={{paddingTop: 0, paddingBottom: 0}}
    />
  }

  return (
    <Container style={styles.container}>
      <Content padder>
        <TypeOfRoadItem
          typeOfRoad="Autopista"
        />
        <TypeOfRoadItem
          typeOfRoad="Avenida"
        />
        <TypeOfRoadItem
          typeOfRoad="Avenida Calle"
        />
        <TypeOfRoadItem
          typeOfRoad="Avenida Carrera"
        />
        <TypeOfRoadItem
          typeOfRoad="Calle"
        />
        <TypeOfRoadItem
          typeOfRoad="Carrera"
        />
        <TypeOfRoadItem
          typeOfRoad="Circular"
        />
        <TypeOfRoadItem
          typeOfRoad="Diagonal"
        />
        <TypeOfRoadItem
          typeOfRoad="Manzana"
        />
        <TypeOfRoadItem
          typeOfRoad="Transversal"
        />
        <TypeOfRoadItem
          typeOfRoad="Vía"
        />
      </Content>
    </Container>
  );
};

// TypeOfRoad.navigationOptions = ({navigation}) => {
//   return {
//     // title: '',
//     headerLeft: (
//       <Button
//         // block
//         style={{marginLeft: 20}}
//         iconLeft
//         transparent
//         onPress={() => navigation.goBack ()}
//       >
//         <FontAwesome
//           name="arrow-left"
//           color={theme.HEADER_MENU_TITLE_COLOR}
//           size={theme.ICON_SIZE_SMALL}
//         />
//       </Button>
//     ),
//   };
// };

export default TypeOfRoad;
