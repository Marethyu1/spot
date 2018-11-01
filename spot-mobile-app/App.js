import React from 'react'
import { AsyncStorage } from 'react-native'
import { Provider, connect } from 'react-redux'
import TabNavigator from './app/TabNavigator'
import Login from './app/Screens/Login'

import store from './app/store'
import { findDogs, loginUser } from './app/actions'
import PermissionsScreen from './app/Screens/Permissions'
import LoadingActivity from './app/components/layoutComponents/LoadingActivity'

console.disableYellowBox = true


class MainScreen extends React.Component {
    state = {
      isLoggedIn: false,
      isReady: false,
    }

    componentDidMount() {
      this.loadFonts()
      this._retrieveData()
    }

    _retrieveData = async () => {
      try {
        console.log('getting id from async storage')
        const json = await AsyncStorage.getItem('spot_user_id')
        console.log('wow', JSON.parse(json))
        const userId = JSON.parse(json)
        if (userId !== null) {
          const userInfo = {
            id: userId,
          }
          // an Id is stored so they don't need to login
          // get all the data using the id
          // call action to save data to the store
          this.setState({ isLoggedIn: true })
          this.props.storeUserRedux(userInfo)
          this.props.fetchDogs(userId)
          // this.getJobsData()
        } else {
          // we don't have their data so they need to login...
          console.log('not logged in')
        }
      } catch (error) {
        // Error retrieving data
      }
    }

    afterLogin = async (loginData) => {
      console.log('after login!')
      this.setState({
        isLoggedIn: true,
      })
      await this.props.storeUserRedux(loginData)
      this.props.fetchDogs(loginData.id)
      this._storeAsyncStorageData()
    }

    _storeAsyncStorageData = async () => {
      console.log('storing login data to async storage')
      try {
        await AsyncStorage.setItem('spot_user_id', JSON.stringify(this.props.user.userInfo.id))
      } catch (error) {
        console.log(`Error saving data: ${error}`)
      }
    }

    logout = async () => {
      console.log('logging out')
      await AsyncStorage.removeItem('spot_user_id')
      // call logout function
      // this.props.logoutDevanner()
      this.setState({ isLoggedIn: false })
    }


    async loadFonts() {
      await Expo.Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
      })
      // Please don't delete this, it is needed for Android
      this.setState({ isReady: true })
    }

    render() {
      const { isReady, isLoggedIn } = this.state
      const { permissions } = this.props
      const { hasCameraPermission, hasLocationPermission } = permissions

      if (!isReady) {
        return (
          <LoadingActivity />
        )
      }
      if (!hasCameraPermission || !hasLocationPermission) {
        return (
          <PermissionsScreen permissions={permissions} />
        )
      } if (!isLoggedIn) {
        return (
          <Login
            tryLogin={this.props.tryLogin}
            afterLogin={this.afterLogin}
          />
        )
      }

      return (
        <TabNavigator
          userInfo={this.props.userInfo}
          dogs={this.props.dogs}
          onLogout={this.logout}
        />
      )
    }
}

const mapDispatchToProps = dispatch => ({
  fetchDogs: userId => dispatch(findDogs(userId)),
  storeUserRedux: userInfo => dispatch(loginUser(userInfo)),
})

const mapStateToProps = state => ({
  dogs: state.dogs.dogs,
  user: state.user,
  permissions: state.permissions,
})


const Main = connect(mapStateToProps, mapDispatchToProps)(MainScreen)


export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
)
