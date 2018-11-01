import { MapView } from 'expo'
import React from 'react'
import { Text } from 'native-base'
import { StyleSheet, Platform } from 'react-native'
import FitImage from 'react-native-fit-image'
import { createImageUrl, createPinUrl } from '../../utils'

const styles = StyleSheet.create({

  fitImage: {
    // marginLeft: 20,
    // marginRight: 20,
    borderWidth: 10,
    borderRadius: 10,
    borderColor: '#E1AC88',
    width: 200,
    height: 200,
  },
})


const DogMarker = ({ marker, onCalloutPress }) => {
  const showModalData = () => {
    onCalloutPress(marker)
  }

  return (
    <MapView.Marker
      key={marker.id}
      coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
      title={marker.caption}
      image={createPinUrl(marker)}
      anchor={{ x: 0.5, y: 1 }}
    >
      <MapView.Callout onPress={showModalData}>
        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>
          {marker.caption}
        </Text>

        {Platform.OS === 'ios'
                    && (
                    <FitImage
                      source={{ uri: createImageUrl(marker) }}
                      style={styles.fitImage}
                    />
                    )
                    }
      </MapView.Callout>
    </MapView.Marker>
  )
}

const DogMarkers = ({ markers, onCalloutPress }) => markers.map((marker, key) => (
  <DogMarker
    marker={marker}
    key={key}
    onCalloutPress={onCalloutPress}
  />
))


export default DogMarkers
