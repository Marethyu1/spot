import React, {Component} from "react"
import {View, Text} from "react-native"
import {Button, Container, Content} from "native-base";
import {Grid} from "react-native-easy-grid";
import Row from "react-native-easy-grid/Components/Row";
import DefaultHeader from "../components/layoutComponents/DefaultHeader"
import {Permissions} from "expo";
import {connect} from "react-redux"

import {findDogs, hasCameraPermission, hasLocationPermission, tryLogin} from "../actions"

const mapDispatchToProps = dispatch => ({
    setCameraPermission: () => dispatch(hasCameraPermission()),
    setLocationPermission: () => dispatch(hasLocationPermission())
})


class PermissionsScreen extends Component {




    componentDidMount(){
        this.getAllPermissions()

    }

    async getAllPermissions(){
        const options = await Permissions.askAsync(Permissions.CAMERA, Permissions.LOCATION);
        if (options.status === "granted"){
            this.props.setCameraPermission()
            this.props.setLocationPermission()
        } else {
            alert('This app requires permissions');
        }
        debugger
    }
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

export default connect(() => ({}), mapDispatchToProps)(PermissionsScreen)
