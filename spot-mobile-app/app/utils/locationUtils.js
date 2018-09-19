import {Location} from "expo";

export const getLocation = () => {
    return Location.getCurrentPositionAsync({});
}
