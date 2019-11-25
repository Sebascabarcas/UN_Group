import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native'
import styles from './styles'
import {Card, Badge, Button} from 'native-base'
import MyText from '../MyText';
import Images from '../../constants/Images';
// https://dbits.netlify.com/assets/img/teamAlbeiro.min.jpg

const CardGroup = ({groupName, groupPicture, containerStyles, onPress}) => {
    return(
        <TouchableOpacity style={[styles.container, containerStyles]} onPress={onPress}>
			<View style={styles.dataContainer}>
				<Image source={groupPicture ? {uri: `${groupPicture.uri}`} : Images['logo']} style={styles.profilePhoto}/>
				<View style={styles.subDataContainer}>
					<View style={styles.groupNameContainer}>
						<MyText numberOfLines={1} fontStyle="semibold" style={styles.groupNameText}> {groupName} </MyText>
						{/*<MyText fontStyle="semibold" style={styles.groupNameText}> ${price} </MyText>*/}
					</View>
					<View style={styles.driverPriceContainer}>
						<View style={styles.badgeContainer}>
							<Badge style={styles.badgeItemBlueDark}>
								<MyText fontStyle="semibold" style={styles.textTime}>GRUPO</MyText>
							</Badge>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
    )
}

export default CardGroup
