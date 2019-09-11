import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'flex-start'
  },
  slidingPanel: {
    backgroundColor: '#f3f3f381',
    margin: wp(3),
    borderRadius: 20,
  },
  actionPanelContainer: {
    height: 50,
    // backgroundColor: 'red',  
    width: "100%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp(3),
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
  },
  actionPanel: {
    // backgroundColor: 'blue',  
    // height: 50,  
    // width: "50%",
    // position: "relative",
    // flexDirection: "row",
    // justifyContent: "flex-end",
    // padding: wp(3),
    // paddingTop: 0,
    // paddingBottom: 0,
    // borderBottomStartRadius: 20,
    // borderBottomEndRadius: 20,
    // borderTopWidth: 0.5,
    // borderColor: '#ccc',
  },
  panel: {
    flex: 1,
    zIndex: 1,
    
    // backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelPlaces: {
    flex: 1,
    zIndex: 1,
    marginHorizontal: 10,
    // backgroundColor: theme.PRIMARY_COLOR,
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
  mapContainer: {
    flex: 1,
  },
  formContainer: {
    position: "absolute",
    backgroundColor: 'white',
    borderRadius: 10,
    width: wp(90),
    left: 0,
    marginLeft: wp(5),
    // height: 300,
    bottom: hp(5),
    padding: 15
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 0,
    // padding: 5,
  },
  iconContainer: {
    // backgroundColor: "green",
    marginTop: 2,
  },
  detailsContainer: {
    flex: 1,
    // position: 'absolute',
    // bottom: 0,
    // opacity: 0.5,
    backgroundColor: '#ffffffd2',
    width: '100%',
    alignItems: 'center',
    // elevation: 0.5,
    // borderRadius: 10,
    // borderWidth: 0.8,
    // borderColor: '#ccc',
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    // flex: .2,
    // margin: 5,
    // marginBottom: 0,
    // padding: 5,
  },
  inputContainer: {
    // backgroundColor: "blue",
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    margin: wp(1)
    // marginBottom: 0,
    // padding: 5,
  },
  inputText: {
    margin: wp(1),
    marginRight: wp(3),
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "#ABABAB"
  },
  iconContainer: {
    marginRight: wp(3),
  },
  formTitle: {
    alignSelf: "center"
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
