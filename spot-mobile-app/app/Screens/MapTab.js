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
import { MapView } from 'expo';


export default class MapTab extends Component {

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
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />

            </Container>
        );
    }
}



