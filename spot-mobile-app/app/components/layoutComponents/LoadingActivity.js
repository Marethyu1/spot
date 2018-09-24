import {ActivityIndicator, StyleSheet, View} from "react-native";
import React from "react";

const LoadingActivity = () => {
    return (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator animating={true}/>
        </View>
    )
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
})

export default LoadingActivity
