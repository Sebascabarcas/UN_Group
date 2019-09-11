const GOOGLE_MAPS_APIKEY = 'AIzaSyCWPrODz1hIw-3g2gX94dTJTspvq768GOw';

export async function getLatLngLocation(lat, lng, { skipLoading } = {}) {
    return Requests.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890`, { skipLoading }).then(response => response.data)
}

export async function getLatLngLocation2(lat, lng, { skipLoading } = {}) {
    return Requests.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_APIKEY}&sessiontoken=1234567890`, { skipLoading }).then(response => response.data)
}
  