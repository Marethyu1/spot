import {MapView} from "expo";
import React from "react";
import {createImageUrl, createPinUrl} from "../../utils";
import {Text} from "native-base"
import {StyleSheet, Image, View} from "react-native";
import FitImage from "react-native-fit-image"

// const fetchImage = async (uri) => {
//     return fetch(uri)
// }

const DogMarker = ({marker}) => {
    // const uri = createImageUrl(marker)
    // const image = await fetchImage(uri)

    return (
            <MapView.Marker
                key={marker.id}
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                title={marker.caption}
                image={createPinUrl(marker)}
                anchor={{x:0.5, y:1}}
            >
                <MapView.Callout>
                    <Text style={{alignSelf: "center", fontWeight: "bold"}}>
                        {marker.caption}
                    </Text>
                    <FitImage
                        source={{uri: createImageUrl(marker)}}
                        style={styles.fitImage}
                    />
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


const styles = StyleSheet.create({

    fitImage: {
        // marginLeft: 20,
        // marginRight: 20,
        borderWidth: 10,
        borderRadius: 10,
        borderColor: "#E1AC88",
        width:200,
        height: 200,
    }
})


export default DogMarkers
