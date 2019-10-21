import {StyleSheet, Platform} from 'react-native';
import theme from '../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
    tripBox: {
      // margin: 20,
      // marginBottom: 0,
      // padding: 5,
    },
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
    iconContainer: {
      margin: 10,
    },
    footerText: {
      color: 'white',
    },
    footerTextContainer: {
      flexDirection: 'column',
    },
    footerContainer: {
      backgroundColor: '#00AACD',
      flexDirection: 'row',
      flexBasis: 60,
      // flex: 02,
    },
    footerInfoContainer: {
      // backgroundColor: 'blue',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      // margin: 4,
  
      flex: 1,
    },
    badgesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 15,
      marginRight: 0,
      justifyContent: 'flex-start',
      // backgroundColor: 'blue',
    },
    pickerContainer: {
      // position: 'absolute',
      // right: 0,
      flex: 1,
      // justifyContent: "flex-end",
      // alignContent: "flex-end",
    },
    picker: {
      flex: 1,
      // height: 50,
      // width: 100,
      // alignSelf: "flex-end",
    },
    badge: {
      // backgroundColor: 'blue',
      margin: 10,
      marginRight: 0,
      borderRadius: 20,
      width: theme.ICON_SIZE_SMALL,
      height: theme.ICON_SIZE_SMALL,
    },
    badgeText: {
      margin: 10,
      fontSize: theme.FONT_SIZE_MEDIUM,
    },
    pickerItem: {
      fontSize: theme.FONT_SIZE_LARGE,
      fontWeight: "bold"
    },
    tripsContainer: {
      // backgroundColor: "red",
      // overflow: 'hidden',
      flexDirection: 'column',
      flex: 1,
      marginHorizontal: 10,
    },
    spinnerTextStyle: {
      color: '#FFF',
      fontFamily: theme.FONT_FAMILY_BOLD
    },
  });
  
