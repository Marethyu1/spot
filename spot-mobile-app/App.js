import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import TabNavigator from './app/TabNavigator';

console.disableYellowBox = true;


export default class App extends React.Component {
    state = {
      isReady: false,
    }

    componentDidMount() {
      this.loadFonts();
      // this.props.getInitialData() // call our action
    }

    async loadFonts() {
      await Expo.Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
      });

      this.setState({ isReady: true }, function () {
        console.log(this.state.isReady);
      });
    }

    render() {
      if (!this.state.isReady) {
        return (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator animating />
          </View>
        );
      }
      return (
        <TabNavigator />
      );
    }
}


const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  row: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
  },

  description: {
    marginTop: 5,
    fontSize: 14,
  },
});
