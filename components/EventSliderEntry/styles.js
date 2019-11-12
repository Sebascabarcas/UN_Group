import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../styles/theme.style';

const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const slideHeight = hp(30);
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
    slideInnerContainer: {
        flexDirection: 'row',
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 0.3,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: entryBorderRadius,
        // borderTopRightRadius: entryBorderRadius
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: entryBorderRadius,
        // borderTopLeftRadius: entryBorderRadius,
        // borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    // radiusMask: {
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     height: entryBorderRadius,
    //     backgroundColor: 'white'
    // },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        flex: 0.7,
        justifyContent: 'space-between',
        marginTop: 20 - entryBorderRadius,
        marginBottom: 20,
        padding: 16,
        backgroundColor: 'white',
        borderTopRightRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    title: {
        color: theme.DARK_COLOR,
        fontSize: theme.FONT_SIZE_MEDIUM,
        letterSpacing: 0.5
    },
    subtitle: {
        marginTop: 6,
        color: theme.GRAY_COLOR2,
        fontSize: theme.FONT_SIZE_SMALL,
        // fontStyle: 'italic'
    },
    location: {
        // fontStyle: 'italic'
    },
    secondaryInfoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    }
});