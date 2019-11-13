import React from 'react'
import styles from './styles'
import {View, Image, TouchableOpacity} from 'react-native'
import {Badge, Card} from 'native-base'
import moment from 'moment'
import {AntDesign, Ionicons} from '@expo/vector-icons'
import MyText from '../MyText';
import images from '../../constants/Images.js';
import theme from '../../styles/theme.style.js'
import getEnvVars from '../../environment.js'

const {apiUrl} = getEnvVars ();

const CardTask = ({ containerStyles, taskName, date, group: {groupName, groupPicture}, description, onPress}) => {
	return(
		<TouchableOpacity style={[styles.container, containerStyles]} onPress={onPress}>
			<View style={styles.dataContainer}>
				<Image source={groupPicture ? {uri: `${groupPicture.uri}`} : images['logo']} style={styles.profilePhoto}/>
				<View style={styles.subDataContainer}>
					<View style={styles.groupNameContainer}>
						<MyText numberOfLines={1} fontStyle="semibold" style={styles.groupNameText}> {taskName} </MyText>
						{/*<MyText fontStyle="semibold" style={styles.groupNameText}> ${price} </MyText>*/}
					</View>
					<View style={styles.driverPriceContainer}>
						<View style={styles.badgeContainer}>
							<Badge style={styles.badgeItemBlueDark}>
								<MyText fontStyle="semibold" style={styles.textTime}>{groupName}</MyText>
							</Badge>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.taskData}>
				<MyText fontStyle="bold" style={styles.labelEvent}>DESCRIPCIÓN</MyText>
				<MyText style={styles.labelAddress}>{description}</MyText>
			</View>
		</TouchableOpacity>
	)
}

export default CardTask
