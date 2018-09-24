import React, { Component } from 'react';
import { Text, Icon, Container, Header, Right } from 'native-base';
import { View, TouchableOpacity, Modal } from 'react-native';
import { Camera } from 'expo';
import PhotoScreen from "../Modals/PhotoScreen";
import {getLocationAndGeocode} from "../utils/locationUtils";
import {hasCameraPermission} from "../utils/permissionsUtils";
import {setCameraPermission} from "../actions/permissionsActions"
import {connect} from "react-redux";


class CameraTab extends Component {
    state = {
        modalVisible: false,
        type: Camera.Constants.Type.back,
        imageInfo: {},
        location: {}
    }

    async componentDidMount () {
        const hasPermission = await hasCameraPermission()
        if (!hasPermission) {
            this.props.setCameraPermission(false)
        }
    }

    async takePicture()  {
        if (this.camera) {

            this.setState({
                modalVisible: true,
            })

            this.camera.takePictureAsync({
                base64: true
            }).then(async (photo) => {
                const location = await getLocationAndGeocode()

                this.setState({
                    imageInfo: {
                        ...photo,
                        loaded: true
                    },
                    location: location
                })
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
      const { hasCameraPermission } = this.props;
      if (!hasCameraPermission) {
          return (
              <Text>
                  No access to camera
              </Text>
          );
      }
      return (
          <View style={{ flex: 1 }}>
              <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  >
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
                    <Icon name="aperture" style={{fontSize: 80, color: 'white', marginBottom: 10}}/>

                </TouchableOpacity>
            </View>
          </Camera>
        </View>

      );
    }
}

const mapDispatchToProps = dispatch => ({
    setCameraPermission: (permission=true) => dispatch(setCameraPermission(permission))
})

const mapStateToProps = (state, props) => ({
    hasCameraPermission: state.permissions.hasCameraPermission,
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraTab)

