import React, {Component} from "react"
import {Body, Button, Container, Content, Header, Left, Right, Text, Title} from "native-base";
import {Grid} from "react-native-easy-grid";
import Row from "react-native-easy-grid/Components/Row";
import config from "../config/config"

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

        console.log(`base url: ${config.base_url}`)
        const userUrl = `${config.base_url}/users`
        console.log(`url: ${userUrl} `)

        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('242029906422575', {
            permissions: ['public_profile', "email"],
        })
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
            const joson = await response.json()
            // joson.id = parseInt(joson.id)
            const body = JSON.stringify(joson)
            console.log(body)
            const res = await fetch(userUrl,
                {
                    method: "POST",
                    body: userUrl,
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            ).catch(err => {
                    console.log(err)
                    debugger
                })

            console.log(res)
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
