import React, {Component} from "react"
import {Body, Button, Container, Content, Header, Left, Right, Text, Title} from "native-base";
import {Grid} from "react-native-easy-grid";
import Row from "react-native-easy-grid/Components/Row";
import config from "../config/config"
import {login} from "../api/routes"

import DefaultHeader from "../components/layoutComponents/DefaultHeader"

export default class Login extends Component {

    login = async () => {
        const userInfo = await login()
        this.props.setLoggedIn(userInfo)
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
