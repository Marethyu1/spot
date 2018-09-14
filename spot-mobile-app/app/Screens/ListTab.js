import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {connect} from "react-redux";
import config from "../config/config"
const BASE_URL = config.baseUrl

const Dog = (props) => {
    const url = `${BASE_URL}/users/${props.userId}/dogs/${props.dog.id}/image/${props.dog.image_id}`

    return (
        <Card key={props.id}>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: url}} />
                    <Body>
                    <Text>{props.title}</Text>
                    <Text note>wowza</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
                <Image source={{uri: url}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
                <Left>
                    <Text>11h ago</Text>
                </Left>
            </CardItem>
        </Card>
    )
}

const Dogs = (props) => {
    return props.dogs.map((dog) => {
        return <Dog dog={dog} userId={props.userId}/>
    })
}

class ListTab extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon name="md-paw" style={{color: 'white'}}/>
                    </Left>
                    <Body>
                    <Title>Spotted Dogs</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Dogs dogs={this.props.dogs} userId={this.props.userId}/>
                </Content>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = (state, props) => ({
    dogs: state.dogs.dogs,
    userId: state.user.userInfo.id
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTab)
