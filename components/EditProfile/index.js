import React from 'react';
import {Button} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import MyText from '../MyText';
import theme from '../../styles/theme.style';
import styles from './styles.js';
import {useDispatch, useSelector} from 'react-redux';

export default (EditProfileButton = props => {
  const dispatch = useDispatch ();
  const {navigate} = useNavigation ();
  const current_user = useSelector (state => state.session.current_user);
  return (
    <Button
      transparent
      onPress={() =>
        {
        dispatch ({
          type: 'session/SET_STATE',
          payload: {current_user_edition: current_user},
        });
        navigate('EditProfile');
      }}
      // onPress={() => navigate('EditProfile')}
      style={styles.actionHeaderButton}
    >
      <MyText
        style={{fontSize: theme.FONT_SIZE_LARGE}}
        color={theme.HEADER_MENU_TITLE_COLOR}
      >
        Editar
      </MyText>
    </Button>
  );
});
