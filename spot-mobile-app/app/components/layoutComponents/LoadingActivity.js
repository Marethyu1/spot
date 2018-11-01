import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})

const LoadingActivity = () => (
  <View style={styles.activityIndicatorContainer}>
    <ActivityIndicator animating />
  </View>
)

export default LoadingActivity
