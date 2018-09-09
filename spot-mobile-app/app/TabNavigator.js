import React, {Component} from "react"
import {Badge, Button, Footer, FooterTab, Icon, Text} from "native-base"
import ReactNavigation, {
    TabNavigator, StackNavigator
} from "react-navigation"

import MapTab from "./Screens/MapTab"
import ListTab from "./Screens/ListTab"
import CameraTab from "./Screens/CameraTab"
import PhotoScreen from "./Screens/PhotoScreen"
import {Platform, StatusBar, StyleSheet} from 'react-native'


//to remove funny header thing..need to look into whether this impacts IOS
ReactNavigation.SafeAreaView.setStatusBarHeight(0);

//Wrapping the tab navigator in a component means we can inject state into the navigator
//Access via this.props.screenProps
export default class WrappedTabNavigator extends Component {

    render() {
        return (
            <Navigator screenProps={{userInfo: this.props.userInfo, dogs: this.props.dogs}}/>
        )
    }
}


const Navigator = TabNavigator({
    Map: {screen: MapTab},
    Camera: { //screen: CameraTab
        screen: StackNavigator({
            CameraTab: {
                screen: CameraTab,
                navigationOptions: {
                    header: null,
                },
            },
            PhotoScreen: {
                screen: PhotoScreen
            }
        })
       },
    List: { screen: ListTab },
}, {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
        return (
            <Footer>
                <FooterTab>
                    <Button
                        vertical
                        active={props.navigationState.index === 0}
                        onPress={() => props.navigation.navigate("Map")}>
                        <Icon name="pin" />
                        {/*<Text>Map</Text>*/}
                    </Button>
                    <Button
                        vertical
                        active={props.navigationState.index === 1}
                        onPress={() => props.navigation.navigate("Camera")}>
                        <Icon name="camera" />
                        {/*<Text>Camera</Text>*/}
                    </Button>
                    <Button
                        vertical
                        active={props.navigationState.index === 2}
                        onPress={() => props.navigation.navigate("List")}>
                        <Icon name="list-box" />
                        {/*<Text>List </Text>*/}
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
})


