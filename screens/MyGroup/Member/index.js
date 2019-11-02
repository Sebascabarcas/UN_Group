import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, Image} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../../components/SliderEntry/index.js';
import {
  sliderWidth,
  itemWidth,
} from '../../../components/SliderEntry/styles.js';
import getEnvVars from '../../../environment.js';
import MyText from '../../../components/MyText';
const { apiUrl } = getEnvVars();
const {height: fullHeight} = Dimensions.get ('window');

const Member = () => {
  const {current_group} = useSelector (state => state.session);
  const {current_group_member, more_pages, loading, refreshing} = useSelector (
    state => state.groups
  );
  console.log (current_group_member);

  const dispatch = useDispatch ();
  const {navigate, getParam} = useNavigation ();

/*   useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_MEMBERS',
        payload: {id: current_group.id},
      });
    },
    [dispatch]
  ); */

  return (
    <View style={styles.container}>
      <View style={styles.containerProfileImage}>
        <Image/>
        <MyText></MyText>
      </View>
      <View style={styles.containerUsername}>
        <MyText></MyText>
      </View>
      <View style={styles.containerSecondaryInfo}>
        <View style={styles.secondaryInfo}>
          <MyText style={styles.secondaryInfoTitle}></MyText>
          <MyText style={styles.secondaryInfoText}></MyText>
        </View>
      </View>
    </View>
  );
};

Member.navigationOptions = ({navigation}) => {
  return {
    // title: '',
    header: null,
    // headerLeft: (
    //   <Button
    //     // block
    //     style={{marginLeft: 20}}
    //     iconLeft
    //     transparent
    //     onPress={() => navigation.goBack ()}
    //   >
    //     <FontAwesome
    //       name="arrow-left"
    //       color={theme.HEADER_MENU_TITLE_COLOR}
    //       size={theme.ICON_SIZE_SMALL}
    //     />
    //   </Button>
    // ),
  };
};

export default Member;
