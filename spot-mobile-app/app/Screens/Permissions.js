import React, {Component} from "react"
import {Text} from "react-native"
import {Container, Content} from "native-base"
import {Grid} from "react-native-easy-grid"
import Row from "react-native-easy-grid/Components/Row"
import DefaultHeader from "../components/layoutComponents/DefaultHeader"
import {connect} from "react-redux"

import {setCameraPermission, setLocationPermission} from "../actions"

import {hasCameraPermission, hasLocationPermission} from "../utils/permissionsUtils";


class PermissionsScreen extends Component {

    componentDidMount(){
        this.getAllPermissions()
    }

    async getCameraPermission(){
        const hasPermission = await hasCameraPermission()
        if (hasPermission){
            this.props.setCameraPermission()
        }
    }

    async getLocationPermission(){
        const hasPermission = await hasLocationPermission()
        if (hasPermission){
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
    setCameraPermission: () => dispatch(setCameraPermission()),
    setLocationPermission: () => dispatch(setLocationPermission())
})

export default connect(() => ({}), mapDispatchToProps)(PermissionsScreen)
