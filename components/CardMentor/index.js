import React from 'react'
import styles from './styles'
import {View, Image, TouchableOpacity} from 'react-native'
import {Badge, Card} from 'native-base'
import moment from 'moment'
import {AntDesign, Ionicons} from '@expo/vector-icons'
import MyText from '../MyText';
import images from '../../constants/Images.js';
import theme from '../../styles/theme.style.js'

const CardMentor = ({ containerStyles, firstName, picture, firstLastName, onPress}) => {
	return(
		<TouchableOpacity style={[styles.container, containerStyles]} onPress={onPress}>
			<View style={styles.dataContainer}>
				<Image source={picture ? {uri: `${picture.uri}`} : images['no-profile-photo']} style={styles.profilePhoto}/>
				<View style={styles.subDataContainer}>
					<View style={styles.groupNameContainer}>
						<MyText numberOfLines={1} fontStyle="semibold" style={styles.groupNameText}> {firstName} {firstLastName} </MyText>
						{/*<MyText fontStyle="semibold" style={styles.groupNameText}> ${price} </MyText>*/}
					</View>
					<View style={styles.driverPriceContainer}>
						<View style={styles.badgeContainer}>
							<Badge style={styles.badgeItemBlueDark}>
								<MyText fontStyle="semibold" style={styles.textTime}>Mentor</MyText>
							</Badge>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default CardMentor
