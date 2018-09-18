import {MapView} from "expo";
import DogPhoto from "../../../assets/pin.png";
import React from "react";

const DogMarker = ({marker}) => {
    return (
        <MapView.Marker
            key={marker.id}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.title}
            image={DogPhoto}
        />
    )
}

const DogMarkers = (props) => {
    return props.markers.map((marker, key) => {
        return (
            <DogMarker
                marker={marker} key={key}
            />
        )
    })
}

export default DogMarkers
