import {StyleSheet} from 'react-native';
import theme from '../../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: wp(10),
    height: hp(10),
  },
  resultText: {
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    marginTop: 20,
    marginBottom: 10
  },
  resultModal: {
    height: hp(20),
    width: wp(90),
    borderRadius: wp(20),
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
  },
  actionButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  acceptButton: {
    width: wp(30),
    marginRight: 15,
    justifyContent: 'center'
  },
  acceptButtonText: {
    color: theme.PRIMARY_COLOR,
    fontSize: theme.FONT_SIZE_LARGE
  }
});