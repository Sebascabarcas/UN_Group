import { StyleSheet } from 'react-native'
import theme from '../../styles/theme.style.js'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    width: wp(100),
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? 40 : 60,
    paddingBottom: 25,
  },
  headerExtraPadding: {
    paddingTop: Platform.OS === 'ios' ? 60 : 80,
  },
  headerContainerSuperBottomBordered: {
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },
  headerContainerBottomBordered: {
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  headerContainerBordered: {
    borderRadius: 40,
  },
  headerInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerInfoContainer: {
    // flex: 1,
    flexDirection: 'row',
  },
  infoImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  primaryText: {
    color: theme.DARK_COLOR
  },
  secondaryText: {
    color: theme.GRAY_LIGHT_COLOR
  },
    ////
})
