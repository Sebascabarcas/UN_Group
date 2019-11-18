import React from 'react'
import styles from './styles'
import {View, Image, TouchableOpacity} from 'react-native'
import {Badge, Card, Button} from 'native-base'
import moment from 'moment'
import {AntDesign, Ionicons} from '@expo/vector-icons'
import MyText from '../MyText';
import images from '../../constants/Images.js';
import theme from '../../styles/theme.style.js'
import getEnvVars from '../../environment.js'

const {apiUrl} = getEnvVars ();

const CardTask = ({ containerStyles, taskName, completed, date, group: {groupName, groupPicture}, description, onPress}) => {
	return(
		<TouchableOpacity style={[styles.container, containerStyles]} onPress={onPress}>
			<View style={styles.dataContainer}>
				<Button large style={[completed ? styles.completedButton : styles.uncompletedButton]}>
					<Ionicons
					color="white"
					size={theme.ICON_SIZE_MEDIUM}
					// style={{}}
					active
					name={completed ? "ios-checkmark-circle" : "ios-close-circle"}
					/>
				</Button>
				{/* <Image source={groupPicture ? {uri: `${groupPicture.uri}`} : images['logo']} style={styles.profilePhoto}/> */}
				<View style={styles.subDataContainer}>
					<View style={styles.groupNameContainer}>
						<MyText numberOfLines={1} fontStyle="semibold" style={styles.groupNameText}> {taskName} </MyText>
						{/*<MyText fontStyle="semibold" style={styles.groupNameText}> ${price} </MyText>*/}
					</View>
					<View style={styles.groupInfoContainer}>
						<View style={styles.badgeContainer}>
							<Badge style={styles.badgeItemBlueDark}>
								<MyText fontStyle="semibold" style={styles.groupName}>{groupName}</MyText>
							</Badge>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.taskData}>
				<MyText fontStyle="bold" style={styles.labelEvent}>DESCRIPCIÓN</MyText>
				<MyText style={styles.labelDescription}>{description}</MyText>
			</View>
		</TouchableOpacity>
	)
}

export default CardTask
