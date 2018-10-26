import React, { Component } from 'react'
import {
  Text, Icon, Container, Header, Right,
} from 'native-base'
import { View, TouchableOpacity, Modal } from 'react-native'
import { Camera } from 'expo'
import { connect } from 'react-redux'
import PhotoScreen from '../Modals/PhotoScreen'
import { getLocationAndGeocode } from '../utils/locationUtils'
import { hasCameraPermission } from '../utils/permissionsUtils'
import { setCameraPermission } from '../actions/permissionsActions'
import TagPickerScreen from '../Modals/TagPickerScreen'
import { updateDogTagAndClearCurrent } from '../actions'


class CameraTab extends Component {
    state = {
      modalVisible: false,
      uploadModalVisible: true,
      tagModalVisible: false,
      type: Camera.Constants.Type.back,
      imageInfo: {},
      location: {},
    }

    async componentDidMount() {
      const hasPermission = await hasCameraPermission()
      if (!hasPermission) {
        this.props.setCameraPermission(false)
      }
    }

    onUpload = () => {
      this.setState({
        // modalVisible: false,
        uploadModalVisible: false,
        imageInfo: {},
        tagModalVisible: true,
      })
    }

    getLocation = () => {
      getLocationAndGeocode()
        .then((location) => {
          this.setState({
            location,
          })
        })
    }

    updateDogTag = (tag) => {
      this.props.updateDogTag(this.props.user.id, this.props.currentDog.id, tag)
      this.setState({ tagModalVisible: false, modalVisible: false, uploadModalVisible: true })
    }

    takePicture() {
      if (this.camera) {
        this.setState({
          modalVisible: true,
        })

        this.getLocation()

        this.camera.takePictureAsync({
          base64: true,
        }).then((photo) => {
          this.setState({
            imageInfo: {
              ...photo,
              loaded: true,
            },
          })
        })
      }
    }


    render() {
      if (this.props.currentDog.tags) {
        console.log(`FOUND SOME TAGS FOR THE DOG ${this.props.currentDog.id}`)
        console.log(this.props.currentDog.tags)
      }
      const { hasCameraPermission } = this.props
      if (!hasCameraPermission) {
        return (
          <Text>
                  No access to camera
          </Text>
        )
      }

      return (
        <View style={{ flex: 1 }}>
          <Modal
            transparent={false}
            visible={this.state.modalVisible}
          >
            <Container>
              <Header>
                <Right>
                  <Text
                    onPress={() => {
                      this.setState({ modalVisible: false })
                    }}
                    style={{ color: 'gray' }}
                  >
                                  close
                  </Text>
                </Right>
              </Header>
              {this.state.tagModalVisible
                      && (
                      <TagPickerScreen
                        dog={this.props.currentDog}
                        onSave={this.updateDogTag}
                      />
                      ) }
              {this.state.uploadModalVisible
                         && <PhotoScreen image={this.state.imageInfo} location={this.state.location} onUpload={this.onUpload} />
                      }
            </Container>
          </Modal>

          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={(ref) => { this.camera = ref }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                alignSelf: 'flex-end',
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
                  })
                }}
              >
                <Icon
                  name="repeat"
                  style={{
                    fontSize: 40, color: 'white', marginTop: 15, marginRight: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.takePicture.bind(this)}
              >
                <Icon name="paw" style={{ fontSize: 80, color: 'white', marginBottom: 10 }} />

              </TouchableOpacity>
            </View>
          </Camera>
        </View>

      )
    }
}

const mapDispatchToProps = dispatch => ({
  setCameraPermission: (permission = true) => dispatch(setCameraPermission(permission)),
  updateDogTag: (userId, dogId, tag) => dispatch(updateDogTagAndClearCurrent(userId, dogId, tag)),
})

const mapStateToProps = state => ({
  hasCameraPermission: state.permissions.hasCameraPermission,
  currentDog: state.dogs.currentDog,
  user: state.user.userInfo,
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraTab)

// export GOOGLE_APPLICATION_CREDENTIALS=
// "/Users/stefanhall/Local/Documents/spot/server/config/spot-d85b7c01dfc6.json"
