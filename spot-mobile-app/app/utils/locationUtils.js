import {Location} from "expo";

export const getLocation = async () => {
    return await Location.getCurrentPositionAsync({});
}

export const getReverseGeoCode = async ({coords}) => {
    const reverseGeocodes = await Expo.Location.reverseGeocodeAsync(coords)
    const reverseGeocode = reverseGeocodes[0] //most of the time it is an array of 1 items
    return reverseGeocode
}

export const getLocationAndGeocode = async () => {
    const location = await getLocation()
    const geocode = await getReverseGeoCode(location)

    const allLocationInfo = {
        ...location,
        geocode
    }
    return allLocationInfo
}
