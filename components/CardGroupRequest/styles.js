import {StyleSheet, PixelRatio} from 'react-native'
import {
 widthPercentageToDP as wp,
 heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../styles/theme.style';

export default StyleSheet.create({
    container:{
        width: '90%',
        height: hp(30),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    dataContainer:{
        width: '100%',
        height: '60%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '5%',
        marginLeft: '10%',
    },
    groupPrincipalInfo:{
        height: '50%',
        // width: '90%',
        // marginRight: '5%',
        flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        // alignItems: 'flex-start',
        alignContent: 'space-around'
    },
    groupData:{
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '30%',
        alignItems: 'center'
    },
    nameContainer:{
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '100%',
        height: '100%'
    },
    image:{
        width: PixelRatio.get()*30,
        borderRadius: theme.BORDER_RADIUS_SMALL,
        height: PixelRatio.get()*30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf :'center',
        marginRight: '5%',
    },
    groupName:{
        width: '65%',
        color: theme.SECONDARY_COLOR,
        fontSize:theme.FONT_SIZE_LARGE
    },
    badgeRate:{
        height: '35%',
        backgroundColor: theme.SECONDARY_COLOR,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rateText:{
        fontSize: theme.FONT_SIZE_SMALL
    },
    badgeCarName:{
        height: '40%',
        width: '90%',
        backgroundColor: theme.SECONDARY_COLOR,
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 2,
        alignItems: 'center',
    },
    badgeModel:{
        width: '90%',
        backgroundColor: '#FFD428',
        color: theme.SECONDARY_COLOR,
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 2,
        height: '40%',
        alignItems: 'center',
    },
    badgeText:{
        alignSelf: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: theme.FONT_SIZE_EXTRA_MEDIUM,
    },
    acceptContainer:{
        height: '40%',
        marginTop: '5%',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        width: '100%',
        flexDirection: 'row'
    },
    buttonIgnore:{
        backgroundColor: '#F1F1F1',
        width: '40%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonAccept:{
        borderWidth: 1,
        width: '40%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText:{
        paddingLeft: 0,
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.SECONDARY_COLOR
    },
    buttonTextAccept:{
        paddingLeft: 0,
        fontSize: theme.FONT_SIZE_MEDIUM,
    }
})
