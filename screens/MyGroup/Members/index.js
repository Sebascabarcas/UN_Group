import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, Image} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles.js';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../../components/SliderEntry/index.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  sliderWidth,
  itemWidth,
} from '../../../components/SliderEntry/styles.js';
import getEnvVars from '../../../environment.js';
import { Content, Button, Icon, Container } from 'native-base';
import NoResults from '../../../components/NoResults/index.js';
import MyText from '../../../components/MyText/index.js';
import theme from '../../../styles/theme.style.js';
import { AntDesign } from '@expo/vector-icons';
const { apiUrl } = getEnvVars();
const {height: fullHeight} = Dimensions.get ('window');

const Members = () => {
  console.log ('MyGroup/Members:');
  const {current_group: group, current_group_members, more_pages, loading, refreshing} = useSelector (
    state => state.groups
  );
  // let _current_group_members = [...current_group_members, ...current_group_members, ...current_group_members]
  const dispatch = useDispatch ();
  const {navigate, goBack, getParam} = useNavigation ();

  const _onPressMember = (member, index) => {
    dispatch({
      type: 'groups/SET_STATE',
      payload: {
        current_group_member: member
      }
    })
    navigate('Member');
  }

  const _renderItem = ({item, index}) => {
    const {user} = item;
    user.isAdmin = item.isAdmin
    return <SliderEntry data={{
      title: `${user.firstName} ${user.firstLastName}`,
      subtitle: user.isAdmin ? 'Administrador' : 'Miembro',
      illustration: user.picture ? {uri: `${user.picture.uri}`} : {uri: 'https://i.imgur.com/SsJmZ9jl.jpg'}
    }} even={(index + 1) % 2 === 0} onPress={() => _onPressMember(item, index)} />;
  };

  useEffect (
    () => {
      dispatch ({
        type: 'groups/GET_GROUP_MEMBERS',
        payload: {id: group.id},
      });
    },
    [dispatch]
  );

  const layoutExample = (title, type) => {
    return (
      // <View
      //   style={[
      //     styles.exampleContainer,
      //     isTinder ? styles.exampleContainerDark : styles.exampleContainerLight,
      //   ]}
      // >
      //   <MyText
      //     style={[styles.title, isTinder ? {} : styles.titleDark]}
      //   >{`Example ${number}`}</MyText>
      //   <MyText style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>
      //     {title}
      //   </MyText>
        <Carousel
          data={current_group_members.length === 1 ? [...current_group_members, ...current_group_members] : current_group_members}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
      // </View>
    );
  };

  const example3 = layoutExample ('"Stack of cards" layout | Loop', 'stack');

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
                  size={theme.ICON_SIZE_SMALL}
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
          <NoResults lottieProps={{style: {width: wp(50)}}} animationName="minnion-looking" primaryText="¡Aún no hay miembros!" secondaryText="Anímate a buscar usuarios y convertirlos en miembros de tu grupo"/>
          }
          <Button primary iconRight block superRounded onPress={() => {
            dispatch({
              type: 'session/SET_STATE',
              payload: {users_searched: []}
            })
            navigate('AddMember')
          }}>
              <MyText style={{fontSize: theme.FONT_SIZE_MEDIUM}} fontStyle="bold">Agregar Miembro</MyText>
              <AntDesign
                name="adduser"
                color="white"
                size={theme.ICON_SIZE_SMALL}
              />
          </Button>
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
