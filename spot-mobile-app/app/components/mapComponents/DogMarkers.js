import {MapView} from "expo";
import React from "react";
import {createImageUrl, createPinUrl} from "../../utils";
import {View, Text} from "native-base"
import {Image} from "react-native";

const DogMarker = ({marker}) => {
    return (
            <MapView.Marker
                key={marker.id}
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                title={marker.caption}
                image={createPinUrl(marker)}
                anchor={{x:0.5, y:1}}
            >
                <MapView.Callout>
                    <View>
                        <Text style={{alignSelf: "center", fontWeight: "bold"}}>
                            {marker.caption}
                        </Text>
                        <Image
                            source={{uri: createImageUrl(marker)}}
                            style={{ width: 200, height: 200, alignSelf:'center', margin: 5, backgroundColor: 'red'} }
                            resizeMode='cover'
                        />
                    </View>
                </MapView.Callout>

            </MapView.Marker>
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
