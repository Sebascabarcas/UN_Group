import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions, Platform} from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const slideHeight = hp (30);
const slideWidth = wp (20);
const itemHorizontalMargin = wp (2);

const entryBorderRadius = 8;
const OFFSET = wp (18) / 2 - hp (18) / 2;

export default StyleSheet.create ({
  slideInnerContainer: {
    width: slideWidth,
    height: slideHeight,
    backgroundColor: '#F9B798',
    // paddingHorizontal: itemHorizontalMargin,
    marginHorizontal: 5,
    borderRadius: wp (5),
    padding: wp (1), // needed for shadow
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    // resizeMode: 'cover',
    borderColor: '#DC5032',
    borderWidth: 1.5,
    height: hp (10),
    width: wp (18),
    borderRadius: wp (5),
  },
  // image's border radius is buggy on iOS; let's hack it!
  textContainer: {
    width: wp (18),
    height: hp (18),
    // flex: 1,
    // backgroundColor: 'red',
    // paddingTop: 15 - entryBorderRadius,
    // paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: '#DC5032',
    // backgroundColor: 'transparent',
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
  },
  title: {
    // marginLeft: wp(1),
    textAlign: 'left',
    textAlignVertical: 'center',
    transform: [
      {
        rotate: '-90deg',
      },
      {translateX: OFFSET},
      {translateY: OFFSET},
    ],
    // width: hp(18),
    // height: wp(18),
    paddingLeft: wp(2),
    height: wp (18),
    width: hp (18),
    // backgroundColor: 'yellow',
    color: theme.DARK_COLOR,
    borderColor: '#CCC',
    borderStartWidth: 2,
    // textAlign: 'justify',
    fontSize: theme.FONT_SIZE_MEDIUM,
    // letterSpacing: 0.5
  },
});
