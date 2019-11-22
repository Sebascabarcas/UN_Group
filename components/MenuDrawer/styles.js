import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {
 widthPercentageToDP as wp,
 heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "white",
        opacity: 0.98
    },
    scroller: {
        flex: 1,
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        paddingTop: 25,
        // backgroundColor: 'green',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    otherOptions: { 
        marginLeft: 12,
        marginVertical: 10
    },
    otherOptionContainer: {
        marginVertical: 5
    },
    otherOptionText: {
        color: 'white',
        fontSize: theme.FONT_SIZE_MEDIUM
    },
    profileText: {
        // backgroundColor: 'green',
        alignItems: 'center',
        flex: 0.95,
        marginLeft: 10,
        marginRight: 10,
        // flexDirection: 'row',
        // justifyContent: 'center',
    },
    name: {
        fontSize: theme.FONT_SIZE_LARGE,
        width: '100%',
        // backgroundColor: 'red',
        paddingBottom: 5,
        textTransform: "capitalize",
        color: 'white',
        textAlign: 'left',
    },
    roleText: {
        fontSize: wp(3.5),
        // paddingBottom: 5,
        alignSelf: 'center',
        color: theme.PRIMARY_COLOR,
        textAlign: 'center',
    },
    roleBadge: {
        backgroundColor: 'white',
        padding: 10,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    settingsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    imgView: {
        flex: 1,
        // flexBasis: 100,
        justifyContent: 'center',
        // backgroundColor: 'black',
        margin: 5,
        // paddingRight: 20,
        // backgroundColor: 'red',
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 90,
        borderColor: 'white',
        borderWidth: 2,
        overflow: 'hidden'
    },
    topLinks:{
        height: hp(40),
        backgroundColor: theme.PRIMARY_COLOR,
    },
    bottomLinks: {
        flex: 1,
        // backgroundColor: 'white',
        paddingTop: 20,
        // paddingBottom: 450,
    },
    linkContainer: {
        flexDirection: 'row',
        margin: 20,
        marginVertical: hp(2),
        // marginBottom: 20,
        // backgroundColor: 'red',
    },
    link: {
        flex: 1,
        fontSize: theme.FONT_SIZE_LARGE,
        // padding: 6,
        paddingBottom: 0,
        color: "#242E42",
        paddingLeft: 20,
        // margin: 5,
        textAlign: 'left',
        // backgroundColor: 'green',
    },
    iconLink: {
        // backgroundColor: 'blue',
        width:theme.ICON_SIZE_SMALL,
        textAlign: 'center'
        // paddingRight:20
        // marginRight:20
    },
})