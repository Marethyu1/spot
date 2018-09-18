import React from 'react';
import { ActivityIndicator, StyleSheet, View, AsyncStorage } from 'react-native';
import TabNavigator from './app/TabNavigator';
import Login from "./app/Screens/Login"

import store from './app/store'
import {Provider, connect} from "react-redux";
import {findDogs, tryLogin, loginUser} from "./app/actions"

console.disableYellowBox = true;


class MainScreen extends React.Component {
    state = {
        isLoggedIn: false,
        userInfo: {
            id: ""
        },
        dogs: [],
        isReady: false,
    }

    componentDidMount() {
        //this.logout()
        this.loadFonts()
        this._retrieveData()
        // await this.tryLoginFlow()
    }

    _retrieveData = async () => {

        try {
            console.log("getting id from async storage")
            const value = await AsyncStorage.getItem("id")
            console.log("wow",JSON.parse(value))
            let parsed = JSON.parse(value)
            if (parsed !== null) {
                // an Id is stored so they don't need to login
                // get all the data using the id
                //call action to save data to the store
                this.setState({isLoggedIn: true})
                this.props.storeUserRedux(parsed)
                this.props.fetchDogs(parsed)
                //this.getJobsData()
            } else {
                // we don't have their data so they need to login...
                console.log("not logged in")
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    afterLogin = async (loginData) => {

        console.log("after login!")
        this.setState({isLoggedIn: true,
            userData: {id: loginData.id}
        })

        await this.props.storeUserRedux(loginData)
        this.props.fetchDogs()
        this._storeAsyncStorageData()
    }

    _storeAsyncStorageData = async () => {
        console.log("storing login data to async storage")
        try {
            await AsyncStorage.setItem("id", JSON.stringify(this.props.user.userInfo.id))
        } catch (error) {
            console.log("Error saving data: " + error)
        }
    }

    logout = async () => {
        console.log("logging out")
        await AsyncStorage.removeItem("id")
        //call logout function
       // this.props.logoutDevanner()
        this.setState({isLoggedIn: false})
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
        console.log(this.props.user)
        if (!this.state.isReady) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        } else {
            if (!this.state.isLoggedIn) {
                return (
                    <Login
                        tryLogin={this.props.tryLogin} afterLogin={this.afterLogin}
                    />
                )

            }
            return (
                <TabNavigator userInfo={this.props.userInfo} dogs={this.props.dogs} onLogout={this.logout}/>
            );
        }
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDogs: (userId) => dispatch(findDogs(userId)),
    storeUserRedux: (userInfo) => dispatch(loginUser(userInfo)),
})

const mapStateToProps = (state, props) => ({
    dogs: state.dogs.dogs,
    user: state.user
})



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
