import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

const Dog = (props) => {
    const url = `http://10.196.78.25:3000/api/v1/users/10210259641485879/dogs/${props.id}/image/${props.image_id}`
    console.log(url)
    console.log("Props!!!!")
    console.log(props)

    return (
        <Card key={props.id}>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: url}} />
                    <Body>
                    <Text>{props.caption}</Text>
                    <Text note>{props.latitude}, {props.longitude}</Text>
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

export default class ListTab extends Component {
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
                    {this.props.screenProps.dogs &&
                        this.props.screenProps.dogs.map(Dog)}
                </Content>
            </Container>
        );
    }
}
