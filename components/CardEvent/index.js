import React from 'react'
import styles from './styles.js'
import {View, Image, TouchableOpacity} from 'react-native'
import {Badge, Card} from 'native-base'
import moment from 'moment'
import {AntDesign, Ionicons} from '@expo/vector-icons'
import MyText from '../MyText';
import images from '../../constants/Images.js';
import theme from '../../styles/theme.style.js'
import getEnvVars from '../../environment.js'

const {apiUrl} = getEnvVars ();

const CardEvent = ({ eventName, date, group: {groupName, groupPicture}, location, description, onPress}) => {
	return(
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.dataContainer}>
				<Image source={groupPicture ? {uri: `${groupPicture.uri}`} : images['logo']} style={styles.profilePhoto}/>
				<View style={styles.subDataContainer}>
					<View style={styles.groupNameContainer}>
						<MyText numberOfLines={1} fontStyle="semibold" style={styles.groupNameText}> {eventName} </MyText>
						{/*<MyText fontStyle="semibold" style={styles.groupNameText}> ${price} </MyText>*/}
					</View>
					<View style={styles.driverPriceContainer}>
						<View style={styles.badgeContainer}>
							<Badge style={styles.badgeItemBlueDark}>
								<MyText fontStyle="semibold" style={styles.textTime}>{groupName}</MyText>
							</Badge>
							<Badge style={styles.badgeItemGray}>
								{/* <AntDesign
									name="calendar"
									color={theme.COMPLEMENTARY_COLOR}
									size={theme.ICON_SIZE_SUPER_EXTRA_SMALL}
								/> */}
								<MyText fontStyle="semibold" style={styles.textTime}>{moment(date).format('YYYY-MM-DD')}</MyText>
							</Badge>
							<Badge style={styles.badgeItemBlue}>
								{/* <AntDesign
									name="clockcircle"
									color={theme.COMPLEMENTARY_COLOR}
									size={theme.ICON_SIZE_SUPER_EXTRA_SMALL}
								/> */}
								<MyText fontStyle="semibold" style={styles.textTime}>{moment(date).format('hh:mm A')}</MyText>
							</Badge>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.eventData}>
				<MyText fontStyle="bold" style={styles.labelEvent}>LUGAR DEL EVENTO</MyText>
				<MyText style={styles.labelAddress}>{location}</MyText>
			</View>
			<View style={styles.eventData}>
				<MyText fontStyle="bold" style={styles.labelEvent}>DESCRIPCIÓN</MyText>
				<MyText style={styles.labelAddress}>{description}</MyText>
			</View>
		</TouchableOpacity>
	)
}

export default CardEvent
