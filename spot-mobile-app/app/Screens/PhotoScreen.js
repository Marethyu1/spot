import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class PhotoScreen extends Component {
    render() {
        debugger
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: this.props.navigation.state.params.image.uri}}/>
                                <Body>
                                <Text>Cute Puppy!</Text>
                                <Text note>wowza</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image
                                source={{uri: this.props.navigation.state.params.image.uri}}
                                style={{  resizeMode: 'cover', height: 200, width: null, flex: 1 }}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>11h ago</Text>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
