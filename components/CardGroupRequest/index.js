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
// https://dbits.netlify.com/assets/img/teamAlbeiro.min.jpg

const CardGroupRequest = ({name, username, onAccept, onReject}) => {
    return(
        <Card style={styles.container}>
            <View style={styles.dataContainer}>
                <View style={styles.groupPrincipalInfo}>
                    <Image style={styles.image} source={Images['big_check']}></Image>
                    <View style={styles.nameContainer}>
                        <MyText numberOfLines={1} style={styles.groupName}>{name}</MyText>
                        <Badge style={styles.badgeRate}>
                            <AntDesign
                                name="star"
                                color={theme.COMPLEMENTARY_COLOR}
                                size={theme.ICON_SIZE_SUPER_EXTRA_SMALL}
                              />
                            <MyText style={styles.rateText}>{username}</MyText>
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
                <Button iconLeft onPress={onReject} style={styles.buttonIgnore}>
                    <AntDesign
                        name="closecircle"
                        color={'rgba(36, 46, 66, 0.3)'}
                        size={theme.ICON_SIZE_TINY_SMALL}
                      />
                    <MyText fontStyle="semibold" style={styles.buttonText}>IGNORAR</MyText>
                </Button>
                <Button primary iconLeft onPress={onAccept} style={styles.buttonAccept}>
                    <AntDesign
                        name="checkcircle"
                        color={'rgba(36, 46, 66, 0.3)'}
                        size={theme.ICON_SIZE_TINY_SMALL}
                      />
                    <MyText fontStyle="semibold" style={styles.buttonTextAccept}>ACEPTAR</MyText>
                </Button>
            </View>
         </Card>
    )
}

export default CardGroupRequest
