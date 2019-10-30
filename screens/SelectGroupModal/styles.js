import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    flex: 1,
    // backgroundColor: '#ccc',
    backgroundColor: '#2F363A',
    opacity: 0.95,
    justifyContent: 'flex-start',
  },
  selectGroupContainer: {
    backgroundColor: 'white',
    flex: 1,
    margin: wp(10),
    borderRadius: 20
  },
  mapContainer: {
    flex: 1,
  },
  detailsContainer: {
    // position: "absolute",
    padding: wp(3),
    flex: 1,
    backgroundColor: 'white',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    width: "100%",
    // height: 300,
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 0,
    // padding: 5,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  detailText: {
    margin: wp(1),
    marginRight: wp(3),
    fontSize: theme.FONT_SIZE_MEDIUM,
    // color: "#ABABAB"
  },
  detailsTitle: {
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_LARGE
  },
  iconContainer: {
    marginRight: wp(3),
  },
  img: {
    height: theme.ICON_SIZE_XL,
    width: theme.ICON_SIZE_XL,
    borderRadius: 90,
    borderColor: theme.PRIMARY_COLOR,
    borderWidth: 2,
    overflow: 'hidden'
  }
});
