import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {uploadDogPhoto} from "../api/routes"
import { Container, Input, Content, Text, Button,  } from 'native-base';
import {connect} from "react-redux";
import {submitDog} from "../actions";



class PhotoScreen extends Component {


    state = {
        caption: ""
    }

    onDogSubmit = () => {
        const options = {
            image: {
                image: this.props.image.base64
            },
            caption: this.state.caption,
            latitude: -43.524088,
            longitude: 172.582539,
        };

        this.props.postDog(options)
            .then((response) => {
                console.log(response)
                this.props.onUpload()
            })
    }


    render() {
        return (
            <Container>
                <Content>

                    <Image
                        source={{uri: this.props.image.uri}}
                        style={styles.image}
                    />

                    <Input placeholder="caption"
                           multiline={true}
                           style={styles.textInput}
                           value={this.state.caption}
                           onChangeText={(text) => this.setState({caption: text})}
                    />

                    <Button block onPress={this.onDogSubmit} style={styles.uploadButton}>
                        <Text>Upload Doggo!</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}



const mapDispatchToProps = dispatch => ({
    postDog: (options) => dispatch(submitDog(options))
})

const mapStateToProps = (state, props) => ({
    dogs: state.dogs.dogs
})


export default connect(mapStateToProps, mapDispatchToProps)(PhotoScreen)

const styles = StyleSheet.create({
    image: {
        flex:1,
        height: 300,
        resizeMode: 'contain',
        marginTop:10,
        marginBottom: 10,
        borderRadius: 10
    },
    textInput: {
        flex:1,
        marginTop:20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },

    uploadButton: {
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 15,
    }
});
