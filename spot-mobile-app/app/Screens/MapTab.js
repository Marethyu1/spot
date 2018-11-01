import React, { Component } from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Icon,
  Text,
} from 'native-base'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import DogMarkers from '../components/mapComponents/DogMarkers'
import { getLocation } from '../utils/locationUtils'
import { hasLocationPermission } from '../utils/permissionsUtils'
import { setLocationPermission } from '../actions/permissionsActions'
import DogDetails from '../Modals/DogDetails'


class MapTab extends Component {
    state = {
      regionSet: false,
      location: null,
      errorMessage: null,
      modalVisible: false,
      selectedDog: null,

    }

    async componentDidMount() {
      await this._getLocationAsync()

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        const region = {
          ...this.state.region,
          latitude,
          longitude,
        }
        this.setState({ region, regionSet: true })
      })
    }

    _getLocationAsync = async () => {
      const hasPermission = await hasLocationPermission()
      if (!hasPermission) {
        this.props.setLocationPermission(false)
      } else {
        const location = await getLocation()
        this.setState({ location })
      }
    };

    onRegionChange = (region) => {
      if (!this.state.regionSet) return
      this.setState({
        region,
      })
    }

    showModal = (dog) => {
      this.setState({
        modalVisible: true,
        selectedDog: dog,
      })
    }

    render() {
      return (
        <Container>
          <Header>
            <Left>
              <Icon name="md-paw" />
            </Left>
            <Body>
              <Title>
                Map
              </Title>
            </Body>
            <Right>
              <TouchableOpacity onPress={this.props.screenProps.onLogout}>
                <Text>
                  Logout
                </Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <Container>
              <Header>
                <Right>
                  <Text
                    onPress={() => {
                      this.setState({ modalVisible: false })
                    }}
                    style={{ color: 'gray' }}
                  >
                  Back
                  </Text>
                </Right>
              </Header>
              <DogDetails dog={this.state.selectedDog} />
            </Container>
          </Modal>

          <MapView
            showsUserLocation
            style={{ flex: 1 }}
            initialRegion={{
              latitude: -43.517781,
              longitude: 172.576635,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={this.props.region}
            onRegionChangeComplete={region => this.onRegionChange(region)}
          >
            <DogMarkers markers={this.props.dogs} onCalloutPress={this.showModal} />
          </MapView>

        </Container>
      )
    }
}


const mapDispatchToProps = dispatch => ({
  setLocationPermission: (permission = true) => dispatch(setLocationPermission(permission)),
})

const mapStateToProps = state => ({
  dogs: state.dogs.dogs,
  hasLocationPermission: state.permissions.hasLocationPermission,

})

export default connect(mapStateToProps, mapDispatchToProps)(MapTab)
