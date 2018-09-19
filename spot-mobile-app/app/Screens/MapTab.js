import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native'
import {
    Container,
    Header,
    Left,
    Right,
    Body,
    Title,
    Icon,
    Text
} from 'native-base';
import {MapView, Permissions} from 'expo';
import {connect} from "react-redux";
import DogMarkers from "../components/mapComponents/DogMarkers";
import {getLocation} from "../utils/locationUtils";

class MapTab extends Component {

    state = {
        regionSet: false,
        location: null,
        errorMessage: null,
    }

    async componentDidMount() {
        await this._getLocationAsync();

        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            const region = {
                ...this.state.region,
                latitude,
                longitude
            }
            this.setState({ region, regionSet: true })
        })
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await getLocation()
        this.setState({ location });
    };

    onRegionChange = (region) => {
        if (!this.state.regionSet) return;
        this.setState({
            region
        });
    }

    render () {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon name="md-paw"/>
                    </Left>
                    <Body>
                    <Title>Map</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={this.props.screenProps.onLogout}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>

                    <MapView
                        showsUserLocation={true}
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
                        <DogMarkers markers={this.props.dogs}/>
                    </MapView>

            </Container>
        );
    }
}


const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = (state, props) => ({
    dogs: state.dogs.dogs,
})

export default connect(mapStateToProps, mapDispatchToProps)(MapTab)

