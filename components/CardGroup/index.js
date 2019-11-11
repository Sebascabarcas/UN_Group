import React from 'react';
import {View, Image} from 'react-native'
import styles from './styles'
import {Card, Badge, Button} from 'native-base'
import theme from '../../styles/theme.style'
import MyText from '../MyText';
import {AntDesign, Ionicons} from '@expo/vector-icons'
import {
 widthPercentageToDP as wp,
 heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Images from '../../constants/Images';
import getEnvVars from '../../environment';
// https://dbits.netlify.com/assets/img/teamAlbeiro.min.jpg

const { apiUrl } = getEnvVars();

const CardGroup = ({groupName, groupPicture, onPress}) => {
    return(
        <Card style={styles.container}>
            <View style={styles.dataContainer}>
                <View style={styles.groupPrincipalInfo}>
                    <Image style={styles.image} source={groupPicture ? {uri: `${groupPicture.uri}`} : images['logo']}/>
                    <View style={styles.nameContainer}>
                        <MyText numberOfLines={1} style={styles.groupName}>{groupName}</MyText>
                        <Badge style={styles.badgeRate}>
                            <AntDesign
                                name="star"
                                color={theme.COMPLEMENTARY_COLOR}
                                size={theme.ICON_SIZE_SUPER_EXTRA_SMALL}
                              />
                            <MyText style={styles.rateText}>GRUPO</MyText>
                        </Badge>
                    </View>
                </View>
                {/* <View style={styles.groupData}>
                    <Badge style={styles.badgeModel}>
                        <MyText fontStyle="semibold" style={{...styles.badgeText, color: theme.SECONDARY_COLOR}}>AXL - 256</MyText>
                    </Badge>
                    <View style={{flex:1}}></View>
                    <Badge style={styles.badgeCarName}>
                        <Ionicons
                            style={{marginRight: wp(1)}}
                            name="md-car"
                            color={theme.COMPLEMENTARY_COLOR}
                            size={theme.ICON_SIZE_SUPER_SMALL}
                          />
                      <MyText fontStyle="semibold" style={styles.badgeText}>UNINORTE</MyText>
                    </Badge>
                </View> */}
            </View>
            <View style={{borderBottomColor: '#EFEFF4', borderBottomWidth: 1, width:'100%'}}/>
            <View style={styles.acceptContainer}>
                <Button onPress={onPress} full iconLeft style={styles.buttonView}>
                    <AntDesign
                        name="eye"
                        color={'rgba(36, 46, 66, 0.3)'}
                        size={theme.ICON_SIZE_SMALL}
                      />
                    <MyText fontStyle="semibold" style={styles.buttonText}>VER GRUPO</MyText>
                </Button>
            </View>
         </Card>
    )
}

export default CardGroup
