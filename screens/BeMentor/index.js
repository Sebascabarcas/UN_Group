import React, {useEffect, useState, useRef} from 'react';
import {
  View,
} from 'react-native';
import {
  Button,
  Content,
  Container,
} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
// import {NavigationAction} from 'react-navigation';
import {useDispatch, useSelector, createSelector} from 'react-redux';
import MyText from '../../components/MyText';
import styles from './styles';
import theme from '../../styles/theme.style.js';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import Animations from '../../constants/Animations';

const HeaderComponent = ({firstName, firstLastName}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.postImgContainer}>
        <LottieView style={{width: wp(50), height: wp(50)}} autoPlay source={Animations['mentors']}/>
      </View>
      <View style={styles.userTextInputContainer}>
        <MyText
          style={{
            textAlign: 'justify',
            fontFamily: theme.FONT_FAMILY_BOLD,
            fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE,
          }}
        >
          {firstName} Conviertete en un Mentor
        </MyText>
      </View>
    </View>
  );
};

const BeMentor = () => {
  const {current_user: user} = useSelector (state => state.session);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  const handleBeMentor = () => {
    dispatch ({type: 'session/BE_MENTOR', payload: {userId: user.id, navigate}});
  };

  return (
    <Container style={styles.container}>
      <HeaderComponent
        {...user}
      />
      <Content padder>
        {/* <MyText style={{textAlign: 'justify'}}>
        </MyText> */}
      </Content>
      <Button
        primary
        full
        onPress={handleBeMentor}
        // onPress={() => navigate('EditProfile')}
        style={styles.actionBottomButton}
      >
        <MyText
          style={{fontSize: theme.FONT_SIZE_LARGE}}
          fontStyle="bold"
          color={theme.HEADER_MENU_TITLE_COLOR}
        >
          CONVERTIRME EN MENTOR
        </MyText>
      </Button>
    </Container>
  );
};

BeMentor.navigationOptions = ({navigation}) => {
  return {
    title: 'Sé un Mentor',
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerLeft: (
      <Button
        // block
        style={{marginLeft: 20}}
        iconLeft
        transparent
        onPress={() => navigation.goBack ()}
      >
        <Ionicons
          name="ios-arrow-back"
          color={theme.PRIMARY_COLOR}
          size={theme.ICON_SIZE_SMALL}
        />
      </Button>
    ),
    headerTitleStyle: {
      fontFamily: theme.FONT_FAMILY_SEMIBOLD,
      fontSize: theme.FONT_SIZE_MEDIUM,
      color: theme.DARK_COLOR,
    },
  };
};

export default BeMentor;
