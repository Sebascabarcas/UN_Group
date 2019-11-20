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

const CardPost = ({ containerStyles, user: {firstName, firstLastName}, postPicture, title, description, onPress}) => {
	return(
		<TouchableOpacity style={[styles.container, containerStyles]} onPress={onPress}>
			<View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
				<View style={{flex: 1}}>
					<View style={[styles.dataContainer]}>
						<MyText numberOfLines={2} fontStyle="semibold" style={styles.postTitleText}> {title} </MyText>
					</View>
					<View style={styles.dataContainer}>
						<MyText numberOfLines={2} style={styles.labelAddress}>{description}</MyText>
					</View>
				</View>
				<Image source={postPicture ? {uri: `${postPicture.uri}`} : images['logo']} style={styles.postPhoto}/>
			</View>
			<MyText fontStyle="bold" style={styles.labelName}>{firstName} {firstLastName}</MyText>
			{/* <View style={styles.eventData}>
			</View> */}
		</TouchableOpacity>
	)
}

export default CardPost
