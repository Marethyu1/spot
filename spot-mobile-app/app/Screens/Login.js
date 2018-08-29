import React, {Component} from "react"
import {Body, Button, Container, Content, Header, Left, Right, Text, Title} from "native-base";
import {Grid} from "react-native-easy-grid";
import Row from "react-native-easy-grid/Components/Row";

const DefaultHeader = () => {
    return (
        <Header>
            <Left/>
            <Body>
            <Title>Spot</Title>
            </Body>
            <Right />
        </Header>
    )
}

export default class Login extends Component {

    login = async () => {

        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('242029906422575', {
            permissions: ['public_profile', "email"],
        })
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
            const joson = await response.json()
            joson.id = parseInt(joson.id)
            const body = JSON.stringify(joson)
            const res = await fetch('http://192.168.1.15:3000/api/v1/users',
                {
                    method: "POST",
                    body: body,
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            ).then(x => x.json())
                .catch(err => {
                    console.log(err)
                    debugger
            })

            console.log(res.json())
            this.props.setLoggedIn()
        }
    }

    render() {
        return (
            <Container>
                <DefaultHeader/>
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid style={{alignItems: 'center'}}>
                        <Row>
                            <Text>
                                Welcome to spot!
                            </Text>
                        </Row>
                        <Row>
                            <Button primary block
                                    onPress={this.login}>
                                <Text> Login With Facebook </Text>
                            </Button>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}
