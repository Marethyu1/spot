import React, { Component } from 'react';
import { Image } from 'react-native';
import {uploadDogPhoto} from "../api/routes"
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class PhotoScreen extends Component {


    onDogSubmit = () => {
        const options = {
            image: {
                image: this.props.navigation.state.params.image.base64
            },
            latitude: 192,
            longitude: 80
        }
        uploadDogPhoto(options)
            .then((response) => {
                console.log(response)
            }).catch(err => {
                console.log(err)
        })
    }


    render() {
        return (
            <Container>
                <Content>

                    <Image
                        source={{uri: this.props.navigation.state.params.image.uri}}
                        style={{flex:1, height: 300,resizeMode: 'contain', marginTop:10, marginBottom: 10, borderRadius: 10 }}
                    />

                    <Button block onPress={this.onDogSubmit}>
                        <Text>Upload Doggo!</Text>
                    </Button>

                    {/*<Image*/}
                        {/*style={{flex:1, height: null, width: '100%'}}*/}
                        {/*source={{uri: this.props.navigation.state.params.image.uri}}*/}

                    {/*/>*/}

                    {/*<Image style={{width: '100%', height: '100%'}} resizeMode={'contain'} source={{uri: this.props.navigation.state.params.image.uri}}/>*/}

                </Content>
            </Container>
        );
    }
}
