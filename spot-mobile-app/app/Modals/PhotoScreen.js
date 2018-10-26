import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Container, Input, Content, Text, Button,
} from 'native-base'
import { connect } from 'react-redux'
import FitImage from 'react-native-fit-image'
import { submitDog } from '../actions/index'
import LoadingActivity from '../components/layoutComponents/LoadingActivity'

const styles = StyleSheet.create({
  image: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 5,
    // borderRadius: 10,
    borderColor: '#B3886B',
  },
  textInput: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },

  loadingText: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    color: '#B3886B',
  },

  uploadButton: {
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#B3886B',
  },
})


class PhotoScreen extends Component {
    state = {
      caption: '',
      savingImage: false,
    }

    onDogSubmit = () => {
      this.toggleImageSave() // turn on saving screen

      const options = {
        image: {
          image: this.props.image.base64,
        },
        caption: this.state.caption,
        latitude: this.props.location.coords.latitude,
        longitude: this.props.location.coords.longitude,
        geocode: this.props.location.geocode,
      }


      this.props.postDog(options, this.props.user.id).then(() => {
        this.toggleImageSave(false, this.props.onUpload) // turn off saving screen
      })
    }

    toggleImageSave = (saving = true, cb) => {
      this.setState({
        savingImage: saving,
      }, cb)
    }

    isReadyToSubmit = () => {
      const hasImage = this.props.image.loaded
      const hasLocation = Object.keys(this.props.location).length > 0
      const captionFilledIn = this.state.caption.length > 0
      return hasImage && hasLocation && captionFilledIn
    }

    renderImageOrLoading = () => {
      const imageHasLoaded = this.props.image.loaded
      const Image = (
        <FitImage
          source={{ uri: this.props.image.uri }}
          style={styles.image}
        />
      )
      const LoadingScreen = (
        <Content>
          <Text style={styles.uploadButton}>
Your image is loading
          </Text>
          <LoadingActivity />
        </Content>
      )
      return imageHasLoaded ? Image : LoadingScreen
    }


    render() {
      const ImageComponent = this.renderImageOrLoading()
      const readyToSubmit = this.isReadyToSubmit()
      const { savingImage } = this.state
      return (
        <Container>
          <Content>
            {ImageComponent}
            <Input
              placeholder="caption"
              multiline
              style={styles.textInput}
              value={this.state.caption}
              onChangeText={text => this.setState({ caption: text })}
            />
            {savingImage && (
            <Text style={styles.loadingText}>
Saving Doggo! This may take some time!
            </Text>
            )}
            {savingImage && <LoadingActivity />}

            <Button
              block
              onPress={this.onDogSubmit}
              style={styles.uploadButton}
              disabled={!readyToSubmit || savingImage}
            >
              <Text>
Upload Doggo!
              </Text>
            </Button>

          </Content>
        </Container>
      )
    }
}


const mapDispatchToProps = dispatch => ({
  postDog: (options, id) => dispatch(submitDog(options, id)),
})

const mapStateToProps = (state) => ({
  dogs: state.dogs.dogs,
  user: state.user.userInfo,
})


export default connect(mapStateToProps, mapDispatchToProps)(PhotoScreen)
