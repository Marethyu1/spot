import React, {Component} from "react"
import {Text} from "react-native"
import {Container, Content} from "native-base"
import {Grid} from "react-native-easy-grid"
import Row from "react-native-easy-grid/Components/Row"
import DefaultHeader from "../components/layoutComponents/DefaultHeader"
import {Permissions} from "expo"
import {connect} from "react-redux"

import {hasCameraPermission, hasLocationPermission} from "../actions"


class PermissionsScreen extends Component {


    componentDidMount(){
        this.getAllPermissions()
    }

        async getCameraPermission(){
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        if (status === "granted"){
            this.props.setCameraPermission()
        }
    }

    async getLocationPermission(){
        const {status} = await Permissions.askAsync(Permissions.LOCATION)
        if (status === "granted"){
            this.props.setLocationPermission()
        }
    }

    async getAllPermissions(){
        await this.getCameraPermission()
        await this.getLocationPermission()
    }
    render(){
        const {hasCameraPermission, hasLocationPermission} = this.props.permissions
        return (
            <Container>
                <DefaultHeader/>
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid style={{alignItems: 'center'}}>
                        <Row>
                            <Text>
                                {!hasCameraPermission && "This App requires camera permissions"}
                            </Text>
                        </Row>
                        <Row>
                            <Text>
                                {!hasLocationPermission && "This App requires location permissions"}
                            </Text>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCameraPermission: () => dispatch(hasCameraPermission()),
    setLocationPermission: () => dispatch(hasLocationPermission())
})

export default connect(() => ({}), mapDispatchToProps)(PermissionsScreen)
