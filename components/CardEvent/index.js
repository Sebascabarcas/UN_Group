import React from 'react'
import styles from './styles.js'
import {View, Image} from 'react-native'
import {Badge, Card} from 'native-base'
import MyText from '../MyText';
import Images from '../../constants/Images.js';

const CardEvent = ({ name, time, date, groupName, price, distance, source, description}) => {
	return(
		<Card style={styles.container}>
			<View style={styles.dataContainer}>
				<Image source={Images['big_check']} style={styles.profilePhoto}/>
				<View style={styles.subDataContainer}>
					<View style={styles.groupNameContainer}>
						<MyText numberOfLines={1} fontStyle="semibold" style={styles.groupNameText}> {name} </MyText>
						{/*<MyText fontStyle="semibold" style={styles.groupNameText}> ${price} </MyText>*/}
					</View>
					<View style={styles.driverPriceContainer}>
						<View style={styles.badgeContainer}>
							<Badge style={styles.badgeItemBlueDark}>
								<MyText fontStyle="semibold" style={styles.textTime}>{groupName}</MyText>
							</Badge>
							<Badge style={styles.badgeItemGray}>
								<MyText fontStyle="semibold" style={styles.textTime}>{date}</MyText>
							</Badge>
							<Badge style={styles.badgeItemBlue}>
								<MyText fontStyle="semibold" style={styles.textTime}>{time}</MyText>
							</Badge>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.tripData}>
				<MyText fontStyle="bold" style={styles.labelTrip}>LUGAR DEL EVENTO</MyText>
				<MyText style={styles.labelAddress}>{source}</MyText>
			</View>
			<View style={styles.tripData}>
				<MyText fontStyle="bold" style={styles.labelTrip}>DESCRIPCIÓN</MyText>
				<MyText style={styles.labelAddress}>{description}</MyText>
			</View>
		</Card>
	)
}

export default CardEvent
