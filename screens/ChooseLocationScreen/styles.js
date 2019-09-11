import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  mapView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  mapCenterMarkerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },

  mapCenterMarker: {
    // width: 32,
    // height: 32,
    // backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 3,
      position: 'absolute',
      marginTop: -37,
      marginLeft: -11,
      left: '50%',
      top: '50%'
  },
  addressForm: {
    // position: "absolute",
    width: wp(100), 
    bottom: 0, 
    backgroundColor: "white"
  },
  slidingPanel: {
    backgroundColor: '#f3f3f381',
    zIndex: 4
  //   margin: wp(3),
  //   borderRadius: 20,
  },
  actionPanel: {
    // flex: .15,
    height: 50,  
    width: "100%",
    position: "relative",
    // bottom: 7,
    // marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: wp(3),
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
  },
  panel: {
    flex: 1,
    zIndex: 1,
    
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    borderRadius: 10,
    height: 60,
    // backgroundColor: theme.PRIMARY_COLOR,
    // alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  iconContainer: {
    marginRight: wp(3),
  },
  placeContainer: {
    margin: wp(2),
    flexDirection: "row"
  },
  placeMainText: {
    color: "#86939e",
    fontSize: theme.FONT_SIZE_MEDIUM
    // alignSelf: "center"
  },
  placeSecondaryText: {
    fontSize: theme.FONT_SIZE_SMALL
    // alignSelf: "center"
  }
});
