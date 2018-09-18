import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {connect} from "react-redux";
import {createImageUrl, createThumbnailUrl} from "../utils";

const Dog = ({dog}) => {
    return (
        <Card key={dog.id}>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: createThumbnailUrl(dog)}} />
                    <Body>
                    <Text>{dog.caption}</Text>
                    <Text note>{dog.latitude}, {dog.longitude}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
                <Image source={{uri: createImageUrl(dog)}} style={{height: 200, width: null, flex: 1}}/>
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
    return props.dogs.map((dog, key) => {
        return <Dog dog={dog} key={key} userId={props.userId}/>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTab)
