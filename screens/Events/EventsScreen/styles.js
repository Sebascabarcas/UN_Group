import {StyleSheet, Platform} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
    fullImage: {
      width: '100%',
      height: '100%',
      flex: 1,
      display: 'flex',
      // marginTop: Platform.OS === 'ios' ? 60 : 80,
      // paddingBottom: Platform.OS === 'ios' ? 60 : 80,
      // justifyContent: 'space-evenly',
      // alignItems: 'center',
    },
    scroller: {
      flex: 1,
    },
    container: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 60 : 80,
      // alignItems: 'center',
      justifyContent: 'center',
    },
    eventsContainer: {
      // backgroundColor: "red",
      // overflow: 'hidden',
      flexDirection: 'column',
      flex: 1,
      // marginHorizontal: 10,
    },
  });
  
