import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './styles';
import MyText from '../MyText';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import theme from '../../styles/theme.style';

export default class EventSliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={illustration.uri ? { uri: illustration.uri } : illustration}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={ illustration.uri ? { uri: illustration.uri } : illustration}
              style={styles.image}
            />
        );
    }

    render () {
        const { data: { title, subtitle }, even, onPress } = this.props;

        const uppercaseTitle = title ? (
            <MyText
              style={[styles.title]}
              fontStyle="bold"
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </MyText>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={onPress}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer]}>
                    { this.image }
                    {/* <View style={[styles.radiusMask]} /> */}
                </View>
                <View style={[styles.textContainer]}>
                    <View>
                        { uppercaseTitle }
                        <MyText
                        style={[styles.subtitle]}
                        fontStyle="semibold"
                        numberOfLines={2}
                        >
                            { subtitle.toUpperCase()  }
                        </MyText>
                    </View>
                    <View style={[styles.secondaryInfoContainer]}>
                        <FontAwesome
                            name="map-marker"
                            color={theme.GRAY_LIGHT_COLOR}
                            size={theme.ICON_SIZE_SMALL}
                          />
                        <MyText
                        style={[styles.subtitle, styles.location]}
                        //   fontStyle=""
                        numberOfLines={2}
                        >
                            Cl 75B # 26D - 39
                        </MyText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}