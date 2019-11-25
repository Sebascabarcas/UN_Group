import {StyleSheet, Platform} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
    container: {
      flex: 1,
      backgroundColor: '#EFEFF4',
      display: 'flex',
      // marginTop: Platform.OS === 'ios' ? 60 : 80,
      // paddingBottom: Platform.OS === 'ios' ? 60 : 80,
      // justifyContent: 'space-evenly',
      // alignItems: 'center',
    },
    headerContainer: {
      width: wp (100),
      paddingHorizontal: wp (5),
      paddingTop: Platform.OS === 'ios' ? 60 : 80,
      paddingBottom: 25,
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      backgroundColor: theme.PRIMARY_COLOR,
    },
    headerInnerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    groupInfoContainer: {
      // flex: 1,
      flexDirection: 'row',
    },
    imageGroup: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 5
    },
    scroller: {
      flex: 1,
    },
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    content: {
      marginBottom: hp(9)
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    iconContainer: {
      margin: 10,
    },
    actionBottomButton: {
      position: 'absolute',
      height: hp(10),
      bottom: 0,
      width: wp(100)
    }
  });
  
