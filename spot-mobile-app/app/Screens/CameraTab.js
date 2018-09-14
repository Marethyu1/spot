import React, { Component } from 'react';
import { Text, Icon, Container, Header, Right } from 'native-base';
import { View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import PhotoScreen from "./PhotoScreen";
import {getLocation} from "./MapTab";

export default class CameraTab extends Component {
    state = {
        hasCameraPermission: null,
        modalVisible: false,
        type: Camera.Constants.Type.back,
        imageInfo: {},
        location: {}
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
            const location = await getLocation()

            this.setState({
                imageInfo: photo,
                modalVisible: true,
                location: location
            })
        }
    };

    onUpload = () => {
        // alert("Image Uploaded?")
        this.setState({
            modalVisible: false,
            imageInfo: {}
        })
    }


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
              <Modal
                  animationType="slider"
                  transparent={false}
                  visible={this.state.modalVisible}
                  presentationStyle={"currentContext"}>
                  <Container>
                      <Header>
                          <Right>
                              <Text onPress={() => {
                                  this.setState({modalVisible: false})
                              }} style={{color: "gray"}}>
                                  Back
                              </Text>
                          </Right>
                      </Header>
                      <PhotoScreen image={this.state.imageInfo} location={this.state.location} onUpload={this.onUpload}/>
                  </Container>
              </Modal>


            <Camera
                style={{ flex: 1 }}
                type={this.state.type}
                ref={ (ref) => {this.camera = ref} }
            >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                alignSelf: 'flex-end'
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                  <Icon name="repeat" style={{fontSize: 40, color: 'white', marginTop: 15, marginRight:15}}/>
              </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={this.takePicture.bind(this)}
                >
                    {/*<Text*/}
                        {/*style={{ fontSize: 18, marginBottom: 10, color: 'white' }}*/}
                    {/*>*/}
                        {/*{' '}*/}
                        {/*Capture*/}
                        {/*{' '}*/}
                    {/*</Text>*/}
                    <Icon name="aperture" style={{fontSize: 80, color: 'white', marginBottom: 10}}/>

                </TouchableOpacity>
            </View>
          </Camera>
        </View>

      );
    }
}
