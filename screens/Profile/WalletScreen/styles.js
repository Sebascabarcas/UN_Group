import {StyleSheet} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    backgroundColor: theme.GRAY_BACKGROUND_COLOR,
    flex: 1,
    opacity: 0.98,
    padding: 16,
  },
  listItem: {
    justifyContent: 'space-between',
  },
  walletTopContainer: {
    flex: 0.6,
    justifyContent: 'center',
    marginBottom: 20,
    // alignItems: 'center',
    // alignContent: 'center',
    // paddingHorizontal: 16,
    // backgroundColor: 'red',
  },
  walletBottomContainer: {
    backgroundColor: theme.GRAY_BACKGROUND_COLOR,
    flex: 1,
    elevation: 100,
    shadowColor: "red",
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 5,
    //   width: 5
    // }
    // paddingHorizontal: 16,
  },
  walletTopMoney: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  topMoneyText: {
    fontSize: wp(10)
  },
  paymentMethodContainer: {
    position: 'absolute',
    // bottom: -20,
    top: hp(30)
    // marginBottom: -20,
    // marginHorizontal: 15
  },
  iconContainer: {
    left: 0,
    marginRight: wp (2),
  },
  tabsContainer: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    // paddingTop: 16,
	},
  tab: {
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  leftTab: {
    borderBottomRightRadius: 0,
    borderTopEndRadius: 0
  },
  rightTab: {
    borderBottomLeftRadius: 0,
    borderTopStartRadius: 0,
  },
  tabTextStyle: {
    color: '#242A37',
    fontFamily: theme.FONT_FAMILY_BOLD,
  },
  activeTabTextStyle: {
    color: '#fff'
  },
  activeTab: {
    backgroundColor: '#242A37',
    borderRadius: 4,
  },
});
