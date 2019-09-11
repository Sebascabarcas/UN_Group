import React from 'react';
import {Button} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import MyText from '../MyText';
import theme from '../../styles/theme.style';
import styles from './styles.js';
import {useDispatch, useSelector} from 'react-redux';

export default ConfirmEditProfile = (props) => {
    const dispatch = useDispatch ();
    const {navigate} = useNavigation ();
    const current_user = useSelector(state => state.session.current_user_edition)
    return (
    <Button
        transparent
        onPress={() => dispatch({type: 'session/UPDATE_PROFILE', payload: { user: current_user, navigate}})}
        // onPress={() => navigate('EditProfile')}
        style={styles.actionHeaderButton}
      >
        <MyText
          style={{fontSize: theme.FONT_SIZE_LARGE}}
          color={theme.HEADER_MENU_TITLE_COLOR}
        >
          Terminado
        </MyText>
      </Button>
    )
}
