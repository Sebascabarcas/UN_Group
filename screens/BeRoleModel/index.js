import React, {useEffect, useState, useRef} from 'react';
import {
  View,
} from 'react-native';
import {
  Button,
  Content,
  Container,
  Icon,
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
        <LottieView autoPlay autoSize source={Animations['role-models']}/>
      </View>
      <View style={styles.userTextInputContainer}>
        <MyText
          style={{
            textAlign: 'justify',
            fontFamily: theme.FONT_FAMILY_BOLD,
            fontSize: theme.FONT_SIZE_EXTRA_EXTRA_LARGE,
          }}
        >
          {firstName} Conviertete en un Role Model
        </MyText>
      </View>
    </View>
  );
};

const BeRoleModel = () => {
  const {current_user: user} = useSelector (state => state.session);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  const handleBeRoleModel = () => {
    dispatch ({type: 'session/BE_ROLE_MODEL', payload: {userId: user.id, navigate}});
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
        onPress={handleBeRoleModel}
        // onPress={() => navigate('EditProfile')}
        style={styles.actionBottomButton}
      >
        <MyText
          style={{fontSize: theme.FONT_SIZE_LARGE}}
          fontStyle="bold"
          color={theme.HEADER_MENU_TITLE_COLOR}
        >
          CONVERTIRME EN ROLE MODEL
        </MyText>
      </Button>
    </Container>
  );
};

BeRoleModel.navigationOptions = ({navigation}) => {
  return {
    title: 'Sé un Role Model',
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerLeft: (
      <Button
        style={{marginLeft: 5}}
        transparent
        onPress={() => navigation.goBack ()}
      >
        <Icon
          type="Ionicons"
          name="ios-arrow-back"
          style={{fontSize: theme.ICON_SIZE_SMALL, color: theme.PRIMARY_COLOR}}
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

export default BeRoleModel;
