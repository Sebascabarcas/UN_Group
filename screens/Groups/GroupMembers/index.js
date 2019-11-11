import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import {useDispatch, useSelector} from 'react-redux';
import CardGroupInfo from '../../../components/CardGroupInfo';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../../components/SliderEntry/index.js';
import { sliderWidth, itemWidth } from '../../../components/SliderEntry/styles.js';
import getEnvVars from '../../../environment.js';

const {height: fullHeight} = Dimensions.get ('window');
const { apiUrl } = getEnvVars();

const GroupMembers = () => {
  const {
    current_group_members,
    current_group,
    more_pages,
    loading,
    refreshing
  } = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, getParam} = useNavigation ();

  const _renderItem = ({item, index}) => {
    const {user} = item;
    return <SliderEntry data={{
      title: `${user.firstName} ${user.lastName}`,
      subtitle: user.isAdmin ? 'Administrador' : 'Miembro',
      illustration: user.picture ? `${user.picture.uri}` : 'https://i.imgur.com/SsJmZ9jl.jpg',
    }} even={(index + 1) % 2 === 0} />;
  };

  useEffect (() => {
    dispatch({
      type: 'groups/GET_GROUP_MEMBERS',
      payload: {id: current_group.id}
    })
  }, [dispatch]);

  const layoutExample = (number, title, type) => {
    return (
        <Carousel
          data={current_group_members}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
    );
  };

  const example3 = layoutExample(3, '"Stack of cards" layout | Loop', 'stack');

  return (
    <View style={styles.container}>
      {/* <StatusBar hidden={true}/> */}
      {/* <Button style={styles.arriveButton}>
        <MyText style={{textAlign: 'center'}} fontStyle="bold">
          {current_group.groupName}
        </MyText>
      </Button> */}
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
        scrollEventThrottle={200}
        directionalLockEnabled={true}
      >
        <View>
          {example3}
        </View>
      </ScrollView>
      {/* <View style={styles.containerButtons}>
        <Button style={styles.buttonItem}>
          <MyText fontStyle="bold" style={styles.textItemButton}>
            Ver Eventos
          </MyText>
        </Button>
      </View> */}
    </View>
  );
};

GroupMembers.navigationOptions = ({navigation}) => {
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

export default GroupMembers;
