import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {uploadDogPhoto} from "../api/routes"
import { Container, Input, Content, Text, Button,  } from 'native-base';



class DogDetails extends Component {
    render() {
        return (
            <Container>
                <Content>

                    <Image
                        source={{uri: this.props.image.uri}}
                        style={styles.image}
                    />

                    <Text>
                    </Text>
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



});
