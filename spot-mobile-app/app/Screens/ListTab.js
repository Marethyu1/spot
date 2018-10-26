import React, { Component } from 'react'
import { Image, Modal } from 'react-native'
import {
  Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right, View,
} from 'native-base'
import { connect } from 'react-redux'
import FitImage from 'react-native-fit-image'
import moment from 'moment'
import { createImageUrl, createThumbnailUrl } from '../utils'
import DogDetails from '../Modals/DogDetails'

const Dog = (props) => {
  const { dog } = props
  return (
    <Card key={dog.id}>
      <CardItem button onPress={() => { props.onModalPress(true, dog) }}>
        <Left>
          <Thumbnail source={{ uri: createThumbnailUrl(dog) }} />
          <Body>
            <Text>
              {dog.caption}
            </Text>
            <Text note>
              {dog.tag}
            </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <FitImage source={{ uri: createImageUrl(dog) }} style={{ flex: 1 }} />
      </CardItem>
      <CardItem>
        <Left>
          <Text>
            {moment(dog.created_at).format('dd MM YYYY, hh:mm a')}
          </Text>
        </Left>
      </CardItem>
    </Card>
  )
}

const Dogs = props => props.dogs.map((dog, key) => <Dog dog={dog} key={key} userId={props.userId} onModalPress={props.onModal} />)

class ListTab extends Component {
    state = {
      modalVisible: false,
      selectedDog: {},
    }

    setModalState = (modal, dog) => {
      this.setState({
        modalVisible: modal,
        selectedDog: dog,
      })
    }

    render() {
      return (
        <Container>
          <Modal
            animationType="slide"
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
                                    Back
                  </Text>
                </Right>
              </Header>
              <DogDetails dog={this.state.selectedDog} />
            </Container>
          </Modal>
          <Header>
            <Left>
              <Icon name="md-paw" />
            </Left>
            <Body>
              <Title>
Spotted Dogs
              </Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Dogs dogs={this.props.dogs} userId={this.props.userId} onModal={this.setModalState} />
          </Content>
        </Container>
      )
    }
}

const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = (state, props) => ({
  dogs: state.dogs.dogs,
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTab)
