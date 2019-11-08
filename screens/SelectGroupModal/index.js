import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {Ionicons} from '@expo/vector-icons';
// import {Divider, Button} from 'react-native-elements';
import {Button, CheckBox} from 'native-base';
import {View, Dimensions, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import theme from '../../styles/theme.style';
import styles from './styles.js';
import MyText from '../../components/MyText';
import BigListItem from '../../components/BigListItem/index.js';
import getEnvVars from '../../environment';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCWPrODz1hIw-3g2gX94dTJTspvq768GOw';
const {width, height} = Dimensions.get ('window');
const {apiUrl} = getEnvVars ();

export default (SelectGroupModal = () => {
  const {goBack} = useNavigation ();
  const dispatch = useDispatch ();
  var {myGroups, current_group, isSuperAdmin} = useSelector (state => state.session);
  if (!isSuperAdmin) myGroups = myGroups.map(relation => relation.group)
  console.log (myGroups);
  // console.log (myGroups);

  // const originMarker = {lat: originLocation.coords.latitude, lng: originLocation.coords.longitude}
  // const destinyMarker = {lat: destinyLocation.coords.latitude, lng: destinyLocation.coords.longitude}
  const [loading, _setLoading] = useState (false);

  const _selectGroup = group => {
    dispatch ({
      type: 'session/CHANGE_CURRENT_GROUP',
      payload: {group, goBack},
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.selectGroupContainer}>
        <View style={styles.detailsContainer}>
          <MyText fontStyle="bold" style={styles.detailsTitle}>
            Seleccione su grupo
          </MyText>
          {myGroups.map (group => (
            <BigListItem
              key={group.id}
              onPress={() => {_selectGroup (group);}}
              leftItem={
                <View style={styles.imgView}>
                  <Image
                    style={styles.img}
                    resizeMode="cover"
                    source={
                      group.groupPicture
                        ? {
                            uri: `${apiUrl}${group.groupPicture.groupPictureName}`,
                          }
                        : images['logo']
                    }
                  />
                </View>
              }
              primaryText={group.groupName}
              primaryTextStyles={{paddingTop: 5, paddingBottom: 2}}
              rightItem={
                <CheckBox
                  color={theme.PRIMARY_COLOR}
                  // fontFamily={}
                  checked={group.id === current_group.id}
                />
              }
            />
          ))}

        </View>
      </View>
    </View>
  );
});
