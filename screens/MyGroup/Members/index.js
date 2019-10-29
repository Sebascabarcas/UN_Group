import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import {Input, Button, List, ListItem, Form, Item, Badge} from 'native-base';
import {
  Ionicons,
  FontAwesome,
  Foundation,
  MaterialIcons,
  AntDesign
} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import CardGroupInfo from '../../../components/CardGroupInfo';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../../components/SliderEntry/index.js';
import { sliderWidth, itemWidth } from '../../../components/SliderEntry/styles.js';

const {height: fullHeight} = Dimensions.get ('window');

const Members = () => {
  const {
    current_group,
    more_pages,
    loading,
    refreshing
  } = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, getParam} = useNavigation ();
  const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/lceHsT6l.jpg'
    }
  ];

  const ENTRIES2 = [
    {
        title: 'Favourites landscapes 1',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/SsJmZ9jl.jpg'
    },
    {
        title: 'Favourites landscapes 2',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/5tj6S7Ol.jpg'
    },
    {
        title: 'Favourites landscapes 3',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat',
        illustration: 'https://i.imgur.com/pmSqIFZl.jpg'
    },
    {
        title: 'Favourites landscapes 4',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/cA8zoGel.jpg'
    },
    {
        title: 'Favourites landscapes 5',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/pewusMzl.jpg'
    },
    {
        title: 'Favourites landscapes 6',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat',
        illustration: 'https://i.imgur.com/l49aYS3l.jpg'
    }
  ];

  const _renderLightItem = ({item, index}) => {
    return <SliderEntry data={item} even={false} />;
  }

  const _renderItem = ({item, index}) => {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />; 
  }

  useEffect (() => {
    dispatch({
      type: 'groups/GET_GROUP_MEMBERS',
      payload: {id: 0}
    })
  }, [dispatch]);

  const layoutExample = (number, title, type) => {
    const isTinder = type === 'tinder';
    return (
        <View style={[styles.exampleContainer, isTinder ? styles.exampleContainerDark : styles.exampleContainerLight]}>
            <MyText style={[styles.title, isTinder ? {} : styles.titleDark]}>{`Example ${number}`}</MyText>
            <MyText style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>{title}</MyText>
            <Carousel
              data={isTinder ? ENTRIES2 : ENTRIES1}
              renderItem={isTinder ? _renderLightItem : _renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              layout={type}
              loop={true}
            />
        </View>
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
        scrollEventThrottle={200}
        directionalLockEnabled={true}
      >
        {example3}
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

Members.navigationOptions = ({navigation}) => {
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

export default Members;
