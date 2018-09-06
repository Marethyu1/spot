import React, { Component } from 'react';
import { Text, Button } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';

export default class CameraTab extends Component {
    state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    }

    onPictureSaved = async photo => {

        debugger
        console.log("pppppooooooooo")
        console.log(photo.uri);
        this.setState({ newPhotos: true });
    }

    async takePicture()  {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo);
            console.log(this.props.navigation)
            this.props.navigation.navigate("PhotoScreen", {image: photo})
            //here we want to push an ol stack nav
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
            <Camera
                style={{ flex: 1 }}
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
