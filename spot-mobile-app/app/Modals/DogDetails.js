import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {Location} from 'expo'
import {uploadDogPhoto} from "../api/routes"
import {createImageUrl} from "../utils";
import { Container, Input, Content, Text, Button,  } from 'native-base';



class DogDetails extends Component {

    async componentDidMount() {
        await this.reverseGeoCode()
    }

    state = {
        location: ""
    }


    //todo move this to somewhere else and maybe store
    reverseGeoCode = async () => {
        let location = {
            latitude: parseFloat(this.props.dog.latitude),
            longitude: parseFloat(this.props.dog.longitude)
        };
        let place = await Location.reverseGeocodeAsync(location)
        place = place[0]
        let locationString = place.street+ " " + place.city + " " + place.country
        this.setState({location: locationString})
    }


    render() {
        return (
            <Container>
                <Content>

                    <Image
                        source={{uri: createImageUrl(this.props.dog)}}
                        style={styles.image}
                    />

                    <Text>{this.props.dog.caption}</Text>
                    <Text>{this.props.dog.created_at}</Text>
                    <Text>{this.state.location}</Text>
                </Content>
            </Container>
        );
    }
}


export default DogDetails

const styles = StyleSheet.create({
    image: {
        flex:1,
        height: 300,
        resizeMode: 'contain',
        marginTop:10,
        marginBottom: 10,
        borderRadius: 10
    },
    text: {

    }



});
