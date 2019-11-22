import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {
  View,
  Dimensions,
  Image,
  // Picker,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Fab, Content, Container, Button, Icon} from 'native-base';
import NoResults from '../../../components/NoResults/index.js';
import MyText from '../../../components/MyText';
import Images from '../../../constants/Images.js';
import theme from '../../../styles/theme.style.js';
import styles from './styles';
import CardMentor from '../../../components/CardMentor/index.js';

const HeaderComponent = ({groupPicture, groupName, goBack}) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerInnerContainer}>
      <View style={styles.groupInfoContainer}>
        <Image
          resizeMode="cover"
          style={styles.imageGroup}
          source={groupPicture ? {uri: `${groupPicture.uri}`} : images['logo']}
        />
        <View>
          <MyText style={{color: 'white'}} fontStyle="bold">
            {groupName}
          </MyText>
          <MyText style={{color: 'white'}} fontStyle="semibold">
            Mentores
          </MyText>
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
);

GroupMentoring = () => {
  console.log ('MyGroup/GroupMentoring');
  const flatList = useRef (null);
  const dispatch = useDispatch ();
  const {navigate, goBack, setParams} = useNavigation ();
  // const [groups, _setGroups] = useState ([]);
  const {mentors} = useSelector (
    state => state.mentors
  );
  const {current_group: group, refreshing} = useSelector (
    state => state.session
  );

  useEffect (
    () => {
      dispatch ({
        type: 'mentors/GET_MENTORS',
        payload: {
          groupId: group.id,
        },
      });
    },
    [dispatch]
  );

  _onRefresh = async () => {
    console.log ('Render on refresh');
    dispatch ({
      type: 'mentors/GET_MENTORS',
      payload: {
        groupId: group.id,
      },
    });
  };

  _renderMentor = ({item: mentor, index}) => {
    return (
      <CardMentor
        containerStyles={{marginVertical: 10}}
        {...mentor.user}
        group={group}
        onPress={() => _onPressMentor (mentor, group)}
      />
    );
  };

  _onPressMentor = (mentor) => {
    console.log(mentor);
    
    dispatch ({
      type: 'mentors/SET_STATE',
      payload: {current_mentor: mentor},
    });
    navigate ('ShowMentor')
    // navigate ('ShowEvent', {isGroupEvent: true});
  };

  return (
    <Container
      style={styles.container}
      // source={Images['dashboard_bg_image']}
    >
      <HeaderComponent {...group} goBack={goBack} />
      <Content contentContainerStyle={styles.content} padder>
        {mentors.length > 0
          ? <FlatList
              // style={styles.scroller}
              data={mentors}
              keyExtractor={mentor => mentor.id.toString ()}
              renderItem={_renderMentor}
              showsVerticalScrollIndicator={false}
              ref={flatList}
              refreshing={refreshing}
              onRefresh={_onRefresh}
              // onEndReached={!noMorePages && _fetchGroupMentoringOnEnd}
              // onEndReachedThreshold={0.2}
            />
          : <NoResults
              lottieProps={{style: {width: 200}}}
              animationName="empty-gabinete"
              primaryText="¡No hay resultados!"
              secondaryText="No hay mentores en el grupo, vuelve más tarde"
            />}
      </Content>
      {/* </View>  */}
      <Button
        primary
        full
        onPress={() => {
          dispatch({
            type: 'mentors/SET_STATE',
            payload: {
              activities: []
            }
          })
          navigate ('SearchActivity');
        }}
        // onPress={() => navigate('EditProfile')}
        style={styles.actionBottomButton}
      >
        <MyText
          style={{fontSize: theme.FONT_SIZE_LARGE}}
          fontStyle="bold"
          color="white"
        >
          BUSCAR ACTIVIDAD
        </MyText>
      </Button>
    </Container>
  );
};

GroupMentoring.navigationOptions = ({navigation}) => {
  // const searchHeader = navigation.getParam('search_header', null)
  return {
    header: null,
    //   title: 'W STEM'
    //   headerRight: (
    //     <Button iconRight transparent onPress={() => searchHeader.current.show ()}
    //     style={{marginRight: 20}}
    //     >
    //       <Ionicons
    //         name="md-search"
    //         color={theme.HEADER_MENU_TITLE_COLOR}
    //         size={theme.ICON_SIZE_MEDIUM}
    //       />
    //     </Button>
    //   ),
  };
};
export default GroupMentoring;
