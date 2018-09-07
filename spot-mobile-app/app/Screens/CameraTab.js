import React, { Component } from 'react';
import { Text, Button } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraTab extends Component {
    state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    }

    async takePicture()  {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                base64: true
            });
            this.props.navigation.navigate("PhotoScreen", {image: photo})
        }
    };



    render() {
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      } if (hasCameraPermission === false) {
        return (
          <Text>
            No access to camera
          </Text>
        );
      }
      return (
          <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={this.state.type}
                ref={ (ref) => {this.camera = ref} }
            >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {' '}
                  Flip
                  {' '}
                </Text>
              </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 0.3,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={this.takePicture.bind(this)}
                >
                    <Text
                        style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                    >
                        {' '}
                        Capture
                        {' '}
                    </Text>
                </TouchableOpacity>
            </View>
          </Camera>
        </View>

      );
    }
}
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         ...Platform.select({
//             android: {
//                 marginTop: StatusBar.currentHeight
//             }
//         })
//
//     }
// })
