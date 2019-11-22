import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {AntDesign} from '@expo/vector-icons'
import MyText from '../MyText';
import styles from './styles';
import theme from '../../styles/theme.style';

export default (
  SelectGroupButton = props => {
    const dispatch = useDispatch ();
    const {navigate} = useNavigation ();
    const {current_group} = useSelector (state => state.session);
      return (
        <Button
          transparent
          onPress={() =>
            {
              current_group && navigate('SelectGroup');
          }}
          iconRight
          style={styles.actionHeaderButton}
        >
          <MyText
            fontStyle="bold"
            style={{fontSize: theme.FONT_SIZE_LARGE}}
            color={theme.PRIMARY_COLOR}
          >
            {current_group ? current_group.groupName : 'UNGROUP'}
          </MyText>
          { current_group && <AntDesign
            name="caretdown"
            color={theme.PRIMARY_COLOR}
            size={theme.ICON_SIZE_SUPER_EXTRA_SMALL}
          />}
          
        </Button>
    );
});
