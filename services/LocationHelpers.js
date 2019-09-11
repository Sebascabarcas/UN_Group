Number.prototype.toFixedNumber = function(x, base){
    var pow = Math.pow(base||10,x);
    return Math.round(this*pow) / pow;
}

export function getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  }) (points[0]);

  // calculate rect
  points.map (point => {
    minX = Math.min (minX, point.latitude);
    maxX = Math.max (maxX, point.latitude);
    minY = Math.min (minY, point.longitude);
    maxY = Math.max (maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = points.length === 1 ? 0.025 : (maxX - minX) * 1.2;
  const deltaY = points.length === 1 ? 0.025 : (maxY - minY) * 1.2;
  
  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  };
};

export function convertGeocodingResults (results) {
  return results.map( result => {
    // console.log(result);
    // console.log(result);
    const {types, formatted_address, address_components, geometry: {location: {lat: latitude, lng: longitude}}} = result
    
    let politicals = []
    let element_for_split = null
    // console.log('--------------------------------TYPES---------------------------------------')
    // console.log(types);
    // console.log(formatted_address);
    // console.log(result.types);
    let political_address = types.indexOf('political') !== -1 || types.indexOf('postal_code') !== -1 
    address_components.map((address_component, i) => {
      const {types, long_name} = address_component
      // console.log('--------------------------------ADDRESS COMPONENT---------------------------------------')
      // console.log(address_component);
      if (types.indexOf('political') !== -1) {
        if (formatted_address.includes(long_name) && element_for_split === null) element_for_split = long_name
        politicals.indexOf(long_name) === -1 ? politicals.push(long_name) : null 
      }
      // ['administrative_area_level_5', 'administrative_area_level_4', 'administrative_area_level_3', 'administrative_area_level_2', 'administrative_area_level_1', 'country', 'locality', 'sublocality', 'neighborhood', 'postal_code']
    })
    // 'postal_code', 'political'
    if (political_address) {
      // console.log(`${politicals[0]}`)
      let main_text = politicals[0]
      politicals.splice(0, 1)
      // console.log(`${politicals.join(', ')}`)
      return {
        structured_formatting: {
          main_text,
          secondary_text: politicals.join(', '), 
        },
        coords: {
          latitude, 
          longitude
        }
      }
    } else {
      // console.log(`${formatted_address.split(politicals[0])[0]}`)
      return {
        structured_formatting: {
          main_text: formatted_address.split(element_for_split)[0].trim().replace(/,/g, ''),
          secondary_text: politicals.join(', '),
        },
        coords: {
          latitude, 
          longitude
        }
      }
    } 
  })
}
