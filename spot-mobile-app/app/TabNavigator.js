import React from "react"
import {Badge, Button, Footer, FooterTab, Icon, Text} from "native-base"
import ReactNavigation, {
    TabNavigator,
} from "react-navigation"

import MapTab from "./Screens/MapTab"
import ListTab from "./Screens/ListTab"
import CameraTab from "./Screens/CameraTab"
import {Platform, StatusBar, StyleSheet} from 'react-native'


//to remove funny header thing..need to look into whether this impacts IOS
ReactNavigation.SafeAreaView.setStatusBarHeight(0);



export default TabNavigator({
    Map: {screen: MapTab},
    Camera: {screen: CameraTab},
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


