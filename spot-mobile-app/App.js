import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import TabNavigator from './app/TabNavigator';
import Login from "./app/Screens/Login"

import store from './app/store'
import {Provider, connect} from "react-redux";
import {findDogs, tryLogin} from "./app/actions"
import PermissionsScreen from "./app/Screens/Permissions";

console.disableYellowBox = true;


const mapDispatchToProps = dispatch => ({
    fetchDogs: () => dispatch(findDogs()),
    tryLogin: () => dispatch(tryLogin())
})

const mapStateToProps = (state, props) => ({
    dogs: state.dogs.dogs,
    user: state.user,
    permissions: state.permissions
})


class MainScreen extends React.Component {
    state = {
        isLoggedIn: false,
        userInfo: {
            id: "10210259641485879"
        },
        dogs: [],
        isReady: false,

    }

    tryLoginFlow(){
        if (!this.props.user.isLoggedIn){
            this.props.tryLogin()
        }
        if (process && process.env.NODE_ENV === "development") {
            //Load dogs on start up
            this.props.fetchDogs()
        }
    }

    async componentDidMount() {
        await this.loadFonts()

        this.tryLoginFlow()
    }

    setLoggedIn = async (userInfo) => {
        await this.setState({
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
        // Please don't delete this, it is needed for Android
        this.setState({isReady: true})
    }

    render() {
        const {isReady} = this.state
        const {user, permissions} = this.props
        const {isLoggedIn} = user
        const {hasCameraPermission, hasLocationPermission} = permissions

        if (!isReady) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        } else {
            if (!isLoggedIn) {
                return (
                    <Login
                        setLoggedIn={this.setLoggedIn}
                    />
                )
            } else if (!hasCameraPermission || !hasLocationPermission){
                return (
                    <PermissionsScreen permissions={permissions}/>
                )
            }


            else {
                return (
                    <TabNavigator userInfo={this.props.userInfo} dogs={this.props.dogs}/>
                );
            }

        }
    }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(MainScreen)



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


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}
