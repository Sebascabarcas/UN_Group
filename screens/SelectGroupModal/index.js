import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {Ionicons} from '@expo/vector-icons';
import theme from '../../styles/theme.style';
// import {Divider, Button} from 'react-native-elements';
import {Button, CheckBox} from 'native-base';
import {View, Dimensions, Image} from 'react-native';
import styles from './styles.js';
import MyText from '../../components/MyText';
import {useSelector, useDispatch} from 'react-redux';
import BigListItem from '../../components/BigListItem/index.js';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCWPrODz1hIw-3g2gX94dTJTspvq768GOw';
const {width, height} = Dimensions.get ('window');

export default TripPreviewScreen = () => {
  const {goBack} = useNavigation ();
  const dispatch = useDispatch();
  const {myGroups, current_group} = useSelector(state => state.session)
  // const originMarker = {lat: originLocation.coords.latitude, lng: originLocation.coords.longitude}
  // const destinyMarker = {lat: destinyLocation.coords.latitude, lng: destinyLocation.coords.longitude}
  const [loading, _setLoading] = useState (false)

  const selectGroup = (group) => {
    dispatch({
      type: 'session/CHANGE_CURRENT_GROUP',
      payload: {current_group: group, goBack}
    })
  }
    return (
      <View style={styles.container}>
        <View style={styles.selectGroupContainer}>
          <View style={styles.detailsContainer}>
            <MyText fontStyle="bold" style={styles.detailsTitle}>
              Seleccione su grupo
            </MyText>
            {myGroups.map(group => 
            (<BigListItem key={group.id}
            leftItem={
                <TouchableWithoutFeedback style={styles.imgView} onPress={() => selectGroup(group)}>
                    <Image style={styles.img} resizeMode="cover" source={{uri: `http://10.20.36.141:4936${group.groupPicture.groupPictureName}`}}/>
                </TouchableWithoutFeedback>
                }
                primaryText={group.groupName}
                primaryTextStyles={{paddingTop: 5, paddingBottom: 2}}
            rightItem={
                    <CheckBox
                    color={theme.PRIMARY_COLOR}
                    // fontFamily={}
                    checked={group.id === current_group.id}
                    onPress={() => selectGroup(group)}
                    />
            }
            />)
            )}
            
          </View>
        </View>
      </View>
    );
}
