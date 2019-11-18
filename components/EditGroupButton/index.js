import React from 'react';
import {Button} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import MyText from '../MyText';
import theme from '../../styles/theme.style';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

export default (
  EditGroupButton = props => {
    const dispatch = useDispatch ();
    const {navigate} = useNavigation ();
    const current_group = useSelector (state => state.groups.current_group);
      return (
      <Button
        // block
        style={{marginRight: 20}}
        iconLeft
        transparent
        onPress={() => {
          dispatch ({
            type: 'groups/SET_STATE',
            payload: {editing_group: current_group},
          });
          navigate ('EditGroup');
        }}
      >
        <Ionicons
          name="ios-create"
          color={props.color || theme.PRIMARY_COLOR}
          size={theme.ICON_SIZE_SMALL}
        />
      </Button>
    );
});
