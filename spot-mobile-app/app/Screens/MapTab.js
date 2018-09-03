import React, { Component } from 'react';
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
import {Platform, StatusBar, StyleSheet} from "react-native";
import {Location, MapView, Permissions} from 'expo';

const Marker = MapView.Marker


export default class MapTab extends Component {

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

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        console.log(location)
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
                        <Icon name="md-paw" style={{color: 'white'}}/>
                    </Left>
                    <Body>
                    <Title>Map</Title>
                    </Body>
                    <Right/>
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
                        <MapView.Marker
                            key={1}
                            coordinate={{latitude: -43.517781, longitude: 172.576635}}
                            title={"Some Title"}
                            // description={"Hello world"}
                        />
                        <MapView.Marker
                            key={2}
                            coordinate={{latitude: -43.517781, longitude: 172.57700}}
                            title={"Some Title"}
                            // description={"Hello world"}
                        />
                    </MapView>

            </Container>
        );
    }
}



