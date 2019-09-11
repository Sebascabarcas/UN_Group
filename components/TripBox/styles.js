import { StyleSheet } from "react-native";
import theme from '../../styles/theme.style';
import { ThemeConsumer } from "react-native-elements";

export default StyleSheet.create ({
    iconContainer: {
      marginRight: 10,
    },
    codeText: {
      // backgroundColor: "red",
      fontSize: theme.FONT_SIZE_LARGE,
      marginLeft: 5,
      padding: 5,
    },
    box: {
      // backgroundColor: "yellow",
      // width: '100%',
      // height: 80,
      margin: 20,
      marginBottom: 0,
      padding: 10,
      borderWidth: 0.2,
      borderRadius: 5,
      borderColor: '#ddd',
      shadowOpacity: 0.75,
      shadowRadius: 5,
      shadowColor: '#ddd',
      shadowOffset: {height: 0, width: 0},
      elevation: 1,
      // height: 200
    },
    infoBoxContainer: {
      // backgroundColor: 'red',
      // position: "relative",
      // flex: 1,
      // flexBasis: 100,
      // flexBasis: "50%"
      flexDirection: 'row',
    },
    textInfo: {
      flex: 1
    },
    infoContainer: {
      // backgroundColor: 'blue',
      // alignContent: "flex-start",
      flexDirection: 'row',
      margin: 5,
      marginBottom: 0,
      padding: 5,
      paddingBottom: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 1,
    },
    badgeContainer: {
      // backgroundColor: 'blue',
      position: 'absolute',
      right: 0,
      top: 5,
      // marginRight: ,
    },
    badge: {
      borderRadius: 20,
      width: theme.ICON_SIZE_SMALL,
      height: theme.ICON_SIZE_SMALL,
    },
  });
  