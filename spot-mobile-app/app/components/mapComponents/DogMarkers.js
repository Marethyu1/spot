import {MapView} from "expo";
import React from "react";
import {createImageUrl, createPinUrl} from "../../utils";
import {Text, Button, Icon} from "native-base"
import {StyleSheet, Platform} from "react-native";
import FitImage from "react-native-fit-image"

const DogMarker = ({marker, onCalloutPress}) => {

    const showModalData = () => {
        onCalloutPress(marker)
    }

    return (
            <MapView.Marker
                key={marker.id}
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                title={marker.caption}
                image={createPinUrl(marker)}
                anchor={{x:0.5, y:1}}
            >
                <MapView.Callout onPress={showModalData}>
                    <Text style={{alignSelf: "center", fontWeight: "bold"}}>
                        {marker.caption}
                    </Text>

                    {Platform.OS === 'ios' &&
                    <FitImage
                        source={{uri: createImageUrl(marker)}}
                        style={styles.fitImage}
                    />
                    }
                </MapView.Callout>
            </MapView.Marker>
    )
}

const DogMarkers = (props) => {
    return props.markers.map((marker, key) => {
        return (
            <DogMarker
                marker={marker} key={key} onCalloutPress={props.onCalloutPress}
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
