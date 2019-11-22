import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles.js';
import MyText from '../../../components/MyText';
import {useDispatch, useSelector} from 'react-redux';
import CardGroupInfo from '../../../components/CardGroupInfo';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../../components/SliderEntry/index.js';
import { sliderWidth, itemWidth } from '../../../components/SliderEntry/styles.js';
import getEnvVars from '../../../environment.js';
import { Container, Icon, Content, Button } from 'native-base';
import theme from '../../../styles/theme.style.js';
import NoResults from '../../../components/NoResults/index.js';
import { AntDesign } from '@expo/vector-icons';

const {height: fullHeight} = Dimensions.get ('window');

const GroupMembers = () => {
  const {
    current_group_members,
    current_group: group,
    more_pages,
    loading,
    refreshing
  } = useSelector (state => state.groups);
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  const _renderItem = ({item, index}) => {
    const {user} = item;
    return <SliderEntry data={{
      title: `${user.firstName} ${user.firstLastName}`,
      subtitle: user.isAdmin ? 'Administrador' : 'Miembro',
      illustration: user.picture ? {uri: `${user.picture.uri}`} : {uri: 'https://i.imgur.com/SsJmZ9jl.jpg'},
    }} even={(index + 1) % 2 === 0} />;
  };

  useEffect (() => {
    dispatch({
      type: 'groups/GET_GROUP_MEMBERS',
      payload: {id: group.id}
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
    <Container>
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <View style={styles.groupInfoContainer}>
            <Image
              resizeMode="cover"
              style={styles.imageGroup}
              source={
                group.groupPicture ? {uri: `${group.groupPicture.uri}`} : images['logo']
              }
            />
            <View>
              <MyText style={{color: 'white'}} fontStyle="bold">{group.groupName}</MyText>
              <MyText style={{color: 'white'}} fontStyle="semibold">Miembros</MyText>
            </View>
          </View>
          <View>
            <Button onPress={() => goBack ()} light rounded>
                <Icon
                  type="AntDesign"
                  name="arrowup"
                  color="#000"
                  fontSize={theme.ICON_SIZE_SMALL}
                />
            </Button>
          </View>
        </View>
      </View>
      <Content padder contentContainerStyle={styles.container}>
          {current_group_members.length > 0 ? 
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
          : 
          <NoResults lottieProps={{style: {width: wp(50)}}} animationName="minnion-looking" primaryText="¡Aún no hay miembros!" secondaryText="Vuelve más tarde"/>
          }
        {/* <View style={styles.containerButtons}>
          <Button style={styles.buttonItem}>
            <MyText fontStyle="bold" style={styles.textItemButton}>
              Ver Eventos
            </MyText>
          </Button>
        </View> */}
      </Content>
    </Container>
  );
};

export default GroupMembers;
