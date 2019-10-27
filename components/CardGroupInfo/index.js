import React from 'react'
import styles from './styles.js'
import {View, Image} from 'react-native'
import {Badge, Card} from 'native-base'
import MyText from '../MyText';
import Images from '../../constants/Images.js';

const CardGroupInfo = ({description}) => {
	return(
		<Card style={styles.container}>
			<View style={styles.dataContainer}>
				<View style={styles.subDataContainer}>
					<View style={styles.groupNameContainer}>
						<MyText numberOfLines={1} fontStyle="semibold" style={styles.groupNameText}> Información Del Grupo </MyText>
						{/*<MyText fontStyle="semibold" style={styles.groupNameText}> ${price} </MyText>*/}
					</View>
				</View>
			</View>
			<View style={styles.groupData}>
				<MyText fontStyle="bold" style={styles.labelGroup}>DESCRIPCIÓN</MyText>
				<MyText style={styles.labelAddress}>{description}</MyText>
			</View>
		</Card>
	)
}

export default CardGroupInfo
