import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {MapView} from 'expo';
import moment from 'moment'
import FitImage from 'react-native-fit-image'
import {uploadDogPhoto} from "../api/routes"
import {createImageUrl} from "../utils";
import { Container, Input, Content, Text, View,  } from 'native-base';



class DogDetails extends Component {

    async componentDidMount() {
        await this.locationStringMaker()
    }

    state = {
        location: ""
    }

    locationStringMaker = async () => {
        let locationString = this.props.dog.street+ " " + this.props.dog.city + " " + this.props.dog.country
        this.setState({location: locationString})
    }

    render() {
        return (
            <Container>
                <Content style={styles.background}>

                    <Text style={styles.captionText}>{this.props.dog.caption}</Text>
                    <FitImage
                        source={{uri: createImageUrl(this.props.dog)}}
                        style={styles.fitImage}
                    />

                    <View style={styles.textView}>

                        <Text style={styles.text}>{moment(this.props.dog.created_at).format("dddd MMMM Do YYYY, hh:mm a")}</Text>
                        <Text style={styles.text}>{this.state.location}</Text>
                        <Text style={styles.text}>{this.props.dog.tag}</Text>
                    </View>

                    <MapView
                        initialRegion={{
                            latitude: this.props.dog.latitude,
                            longitude:this.props.dog.longitude,
                            latitudeDelta: 0.0222,
                            longitudeDelta: 0.0121,
                        }}
                        style={styles.map}>

                        <MapView.Marker
                            coordinate={{latitude: this.props.dog.latitude, longitude: this.props.dog.longitude}}
                        />
                    </MapView>
                </Content>
            </Container>
        );
    }
}


export default DogDetails

const styles = StyleSheet.create({

    fitImage: {
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 10,
        borderRadius: 10,
        borderColor: "#E1AC88",
    },
    text: {
        color: "#74401d"
    },

    captionText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        color: "#74401d"
    },

    textView: {
        flexDirection: "column",
        backgroundColor: "#FFE0CB",
        marginTop: 10,
        borderRadius: 10,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },

    background: {
        backgroundColor: "#F8EDED",
    },

    map: {
        height: 200,
        marginLeft: 20,
        marginRight: 20,
    }



});
