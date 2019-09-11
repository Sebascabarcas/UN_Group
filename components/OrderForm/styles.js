import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 15,
  },
  iconContainer: {
    // backgroundColor: "green",
    marginTop: 2,
  },
  inputContainer: {
    // backgroundColor: "blue",
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    margin: wp (1),
    // marginBottom: 0,
    // padding: 5,
  },
  input: {
    // backgroundColor: "blue",
    marginTop: 8,
    // padding: 5,
  },
  inputText: {
    margin: wp (1),
    marginRight: wp (3),
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: '#ABABAB',
  },
  iconContainer: {
    marginRight: wp (3),
  },
  formTitle: {
    fontSize: theme.FONT_SIZE_LARGE,
    marginBottom: 10,
    alignSelf: 'center',
  }
});
