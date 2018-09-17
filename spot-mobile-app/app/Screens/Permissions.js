import React, {Component} from "react"
import {View, Text} from "react-native"
import {Button, Container, Content} from "native-base";
import {Grid} from "react-native-easy-grid";
import Row from "react-native-easy-grid/Components/Row";
import DefaultHeader from "../components/layoutComponents/DefaultHeader"


export default class PermissionsScreen extends Component {
    render(){
        return (
            <Container>
                <DefaultHeader/>
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid style={{alignItems: 'center'}}>
                        <Row>
                            <Text>
                                Yikes lets do some permission stuff
                            </Text>
                        </Row>
                        {/*<Row>*/}
                            {/*<Button primary block*/}
                                    {/*onPress={this.login}>*/}
                                {/*<Text> Login With Facebook </Text>*/}
                            {/*</Button>*/}
                        {/*</Row>*/}
                    </Grid>
                </Content>
            </Container>
        )
    }
}
