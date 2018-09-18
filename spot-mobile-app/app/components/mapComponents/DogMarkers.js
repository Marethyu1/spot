import {MapView} from "expo";
import React from "react";
import {createPinUrl} from "../../utils";

const DogMarker = ({marker}) => {
    return (
            <MapView.Marker
                key={marker.id}
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                title={marker.caption}
                image={createPinUrl(marker)}
                anchor={[0.5, 1]}
            />
    )
}

const DogMarkers = (props) => {
    return props.markers.map((marker) => {
        return (
            <DogMarker
                marker={marker}
            />
        )
    })
}


export default DogMarkers
