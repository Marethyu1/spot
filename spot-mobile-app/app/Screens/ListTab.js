import React, { Component } from 'react';
import { Image, Modal } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right, View } from 'native-base';
import {connect} from "react-redux";
import {createImageUrl, createThumbnailUrl} from "../utils";
import DogDetails from "../Modals/DogDetails";
import FitImage from "react-native-fit-image";
import moment from "moment";

const Dog = (props) => {
    let dog = props.dog
    return (
        <Card key={dog.id}>
            <CardItem button onPress={() => {props.onModalPress(true, dog)}}>
                <Left>
                    <Thumbnail source={{uri: createThumbnailUrl(dog)}} />
                    <Body>
                    <Text>{dog.caption}</Text>
                    <Text note>{dog.tag}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
                {/*<Image source={{uri: createImageUrl(dog)}}source={{uri: createImageUrl(dog)}} style={{height: 300, width: null, flex: 1}}/>*/}
                <FitImage source={{uri: createImageUrl(dog)}} style={{flex:1}} />
                {/*style={{flex: 1}}*/}
            </CardItem>
            <CardItem>
                <Left>
                    <Text>{moment(dog.created_at).format("dd MM YYYY, hh:mm a")}</Text>
                </Left>
            </CardItem>
        </Card>
    )
}

const Dogs = (props) => {
    return props.dogs.map((dog, key) => {
        return <Dog dog={dog} key={key} userId={props.userId} onModalPress={props.onModal}/>
    })
}

class ListTab extends Component {
    state = {
        modalVisible: false,
        selectedDog: {},
    }

    setModalState = (modal, dog) => {
        this.setState({
            modalVisible: modal,
            selectedDog: dog
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
                                <Text onPress={() => {
                                    this.setState({modalVisible: false})
                                }} style={{color: "gray"}}>
                                    Back
                                </Text>
                            </Right>
                        </Header>
                       <DogDetails dog={this.state.selectedDog}/>
                    </Container>
                </Modal>
                <Header>
                    <Left>
                        <Icon name="md-paw" style={{color: 'white'}}/>
                    </Left>
                    <Body>
                    <Title>Spotted Dogs</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Dogs dogs={this.props.dogs} userId={this.props.userId} onModal={this.setModalState}/>
                </Content>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = (state, props) => ({
    dogs: state.dogs.dogs,
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTab)
