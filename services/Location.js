import getEnvVars from "../environment";

const {apiKeyGoogle} = getEnvVars();

export async function getLocation(queryAddress) {
  // return Requests.post(`groups`, newGroup, { skipLoading, headers: {'Content-Type': 'multipart/form-data'}}).then(group => group.data)
    // console.log(`https://maps.googleapis.com/maps/api/geocode/xml?address=Calle+75B+#+26D&key=${apiKeyGoogle}`);
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBhNU5zU-r1BOFiyoEgCP4TW3d9ds99Gok
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryAddress}&key=${apiKeyGoogle}`, {
        method: 'GET',
      }).then(res => res.json());
}
