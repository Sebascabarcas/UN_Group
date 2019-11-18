import {StyleSheet, PixelRatio, Platform} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: '#EFEFF4',
    // height: '100%',
    // width: '100%',
  },
  scrollview: {
    // flex: 1,
  },
  scrollviewContainer: {
    flex: 1,
    // alignContent: 'flex-end',
    // flexGrow: 1,
    justifyContent: 'center',
    // justifyContent: 'space-around',
    // alignItems: 'baseline',
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
  },
  sliderContainer: {
    // backgroundColor: 'red',
    // flex: 1,
    // alignContent: 'flex-end',
    // justifyContent: 'space-around',
    // alignItems: 'baseline',
  },
  slider: {},
  textItemButton: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.SECONDARY_COLOR,
  },
  ////
});
