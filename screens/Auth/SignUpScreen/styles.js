import {StyleSheet} from 'react-native';
import theme from '../../../styles/theme.style'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create ({
    containerBack:{
      width: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      paddingVertical: hp(5)
    },
    itemForm: {
      marginTop: 10,
      marginBottom: 10
    },
    input: {
      marginTop: 3,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      alignContent: 'flex-end',
      color: '#FFF',
      height: 35,
      fontSize: theme.FONT_SIZE_INPUT
    },
    registerButton:{
      // marginTop: 40,
      width: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: wp(5),
      marginRight: wp(5),
    },
    inputContainer: {
      width: 300,
      marginBottom: 10,
    },
    mainForm: {
      width: wp(80)
    },
    fullImage: {
      width: '100%',
      height: '100%',
      flex: 1,
      display: 'flex',
      // justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    checksContainer:{
      // backgroundColor: 'red',
      marginTop: 30,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
    checkContainer:{
      // backgroundColor: 'red',
      display: 'flex',
      flexDirection: 'row',
    },
    checkText: {
      color: '#FFF',
      marginLeft: 15,
      fontSize: theme.FONT_SIZE_MEDIUM
    },
    picker: {
      height: 50,
      width: 300,
      fontSize: theme.FONT_SIZE_LARGE,
      fontFamily: theme.FONT_FAMILY_BOLD,
      color: 'white',
      fontWeight: "bold",
      // alignSelf: "flex-end",
    },
    pickerItem: {
      fontSize: theme.FONT_SIZE_LARGE,
      fontFamily: theme.FONT_FAMILY_BOLD,
      color: 'white',
      fontWeight: "bold",
    },
    loginOption: {
      marginBottom: hp(5)
    }
  });
  
