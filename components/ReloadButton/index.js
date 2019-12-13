import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Icon} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles';
import theme from '../../styles/theme.style';
import Storage from '../../services/Storage';

export default (ReloadButton = () => {
  const dispatch = useDispatch ();
  const {navigate} = useNavigation ();

  handleReload = async () => {
    const sessionInfo = await Storage.get ('Session');
    dispatch ({
      type: 'session/LOAD_CURRENT_ACCOUNT',
      payload: {
        navigate,
        current_session: sessionInfo,
      },
    });
  };

  return (
    <Button
      transparent
      style={{marginRight: 5}}
      onPress={handleReload}
      style={styles.actionHeaderButton}
    >
      <Icon
        type="AntDesign"
        name="reload1"
        style={{color: theme.PRIMARY_COLOR, fontSize: theme.ICON_SIZE_SMALL}}
      />

    </Button>
  );
});
