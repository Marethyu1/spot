import React from 'react';
import { ActivityIndicator, StyleSheet,  } from 'react-native';
import TabNavigator from './app/TabNavigator';
import Login from "./app/Screens/Login"


console.disableYellowBox = true;


export default class App extends React.Component {
    state = {
        isLoggedIn: false,
        userInfo: {
            id: "10210259641485879"
        },

    }

    async componentDidMount() {
        await this.loadFonts()
        await this.setLoggedIn(this.state.userInfo)
    }

    setLoggedIn = async (userInfo) => {
        this.setState({
            isLoggedIn: true,
            userInfo: userInfo
        })
    }




    async loadFonts() {
        await Expo.Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
        });
    }

    render() {
      if (!this.state.isLoggedIn) {
          {/*<Container style={styles.activityIndicatorContainer}>*/}
          return (
              <Login
                  setLoggedIn={this.setLoggedIn}
              />
          )

      }
      return (
        <TabNavigator userInfo={this.state.userInfo}/>
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
