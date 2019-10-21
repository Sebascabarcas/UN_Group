import React, {useState, useEffect, useRef} from 'react'
import { View, Text, ImageBackground, Image, Alert } from 'react-native'
import { Button, Card, Badge } from 'native-base'
import MyText from '../../components/MyText'
import styles from './styles.js.js'
import {useNavigation} from 'react-navigation-hooks'
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import theme from '../../styles/theme.style.js'
import {updateTrip} from './../../services/Trip';


const TripDataScreen = ({navigation},props)=>{
	const { navigate, setParams, getParam } = useNavigation();
	const actualEvent = useSelector(state => state.trip.actualEvent)

	useEffect(()=>{
		setParams({headerRef: actualEvent.ref})
	},[])

	const handleStartTrip = () => {
		Alert.alert(
		  '¿Deseas iniciar este viaje?',
		  'Confirma tu accion mediante las siguientes opciones.',
		  [
		    {text: 'Cancelar', onPress: () => console.log('Ask me later pressed')},
		    {
		      text: 'Confirmar',
		      onPress: () => {
				  updateTrip({
                      id: actualEvent.id,
                      status: 'started_with_passenger'
                  })
			  	  navigate('OnTripScreen')
		  	  },
		      style: 'cancel',
		    }
		  ],
		  {cancelable: false},
		);
	}

	const handleCancelTrip = () => {
		navigate('CancelTripScreen')
	}

	return(
		<View style={styles.container}>
			<View style={styles.dataContainer}>
				<Image source={require('./../../assets/images/raul.png')} style={styles.profilePhoto}/>
				<View style={styles.subDataContainer}>
					<View style={styles.driverNameContainer}>
						<MyText numberOfLines={1} fontStyle="semibold" style={styles.driverNameText}> {actualEvent.person} </MyText>
						{/*<MyText fontStyle="semibold" style={styles.driverNameText}> ${actualEvent.price} </MyText>*/}
					</View>
					<View style={styles.driverPriceContainer}>
						<View style={styles.badgeContainer}>
							<Badge style={styles.badgeItemBlueDark}>
								<MyText fontStyle="semibold" style={styles.textTime}>{actualEvent.date}</MyText>
							</Badge>
							<Badge style={styles.badgeItemGray}>
								<MyText fontStyle="semibold" style={styles.textTime}>{actualEvent.time}</MyText>
							</Badge>
							<Badge style={styles.badgeItemBlue}>
								<MyText fontStyle="semibold" style={styles.textTime}>{actualEvent.ref}</MyText>
							</Badge>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.tripData}>
				<MyText fontStyle="bold" style={styles.labelTrip}>ORIGEN</MyText>
				<MyText style={styles.labelAddress}>{actualEvent.source}</MyText>
			</View>
			<View style={styles.tripData}>
				<MyText fontStyle="bold" style={styles.labelTrip}>Descripción</MyText>
				<MyText style={styles.labelAddress}>{actualEvent.description}</MyText>
			</View>
			<View style={styles.tripData}>
				<MyText fontStyle="bold" style={styles.labelTrip}>REFERENCIA</MyText>
				<MyText style={styles.labelAddress}>{actualEvent.ref}</MyText>
			</View>
			<View style={styles.tripData}>
				<MyText fontStyle="bold" style={styles.labelTrip}>ORGANIZADORES</MyText>
				<View style={styles.priceContainer}>
					<View style={styles.labelContainer}>
						<MyText fontStyle="semibold" style={styles.priceText}>Efectivo</MyText>
						<MyText fontStyle="semibold" style={styles.priceText}>$15.000</MyText>
					</View>
					<View style={styles.labelContainer}>
						<MyText fontStyle="semibold" style={styles.priceText}>Descuento</MyText>
						<MyText fontStyle="semibold" style={styles.priceText}>$10.000</MyText>
					</View>
					<View style={styles.labelContainer}>
						<MyText fontStyle="semibold" style={styles.priceText}>Total</MyText>
						<MyText fontStyle="semibold" style={styles.priceText}>$15.000</MyText>
					</View>
				</View>
			</View>
			<View style={styles.actionTrip}>
				<Button style={styles.buttonAction}>
					<Ionicons name="ios-call" size={30} color="white" />
					<MyText fontStyle="semibold" style={styles.buttonTextIcon}>Llamar</MyText>
				</Button>
				<Button style={styles.buttonAction}>
					<Ionicons name="ios-chatbubbles" size={30} color="white" />
					<MyText fontStyle="semibold" style={styles.buttonTextIcon}>Chat</MyText>
				</Button>
				<Button onPress={handleCancelTrip} style={styles.buttonAction}>
					<Ionicons name="ios-trash" size={30} color="white" />
					<MyText fontStyle="semibold" style={styles.buttonTextIcon}>Cancelar</MyText>
				</Button>
			</View>
			<Button full style={styles.fullButtonTravel} onPress={handleStartTrip}>
				<MyText fontStyle="semibold" style={styles.fullButtonText}>INICIAR VIAJE</MyText>
			</Button>
		</View>
	)
}

TripDataScreen.navigationOptions = ({ navigation }) => {
	const headerRef = navigation.getParam('headerRef','Cargando...')
	return{
		title: headerRef,
		headerLeft: (
		   <Button
			   style={{marginLeft: 20}}
		 	   iconLeft transparent
			   onPress={()=> navigation.navigate('GetRiderScreen')}
		   >
			 <Ionicons
				 name="md-arrow-round-back"
				 color={theme.COMPLEMENTARY_COLOR}
				 size={24}
			   />
		   </Button>
	   ),
	}
};

export default TripDataScreen
