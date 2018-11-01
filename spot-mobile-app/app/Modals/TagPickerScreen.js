import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import RadioGroup from 'react-native-radio-buttons-group'
import {
  Container, Spinner, View, Content, Text, Button,
} from 'native-base'

const styles = StyleSheet.create({

  fitImage: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 10,
    borderRadius: 10,
    borderColor: '#E1AC88',
  },
  text: {
    color: '#74401d',
  },

  radioButtonsContainer: {
    marginTop: 50,
  },

  captionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    color: '#74401d',
  },

  textView: {
    flexDirection: 'column',
    backgroundColor: '#FFE0CB',
    marginTop: 10,
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },

  background: {
    backgroundColor: '#F8EDED',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    marginTop: 50,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    backgroundColor: '#B3886B',
  },


})

class TagPickerScreen extends Component {
    state = {
      data: [],
      isLoading: true,
    }

    componentDidMount() {
      this.setupData()
    }

    onPress = data => this.setState({ data })


    setupData = () => {
      let myData = []
      this.props.dog.tags.forEach((element) => {
        myData = [...myData, { label: element }]
      })
      this.setState({ data: myData, isLoading: false })
    }


    render() {
      return (
        <Container>
          <Content style={styles.background}>

            {this.state.isLoading
                    && (
                    <View style={styles.loading}>
                      <Spinner />
                    </View>
                    )
                    }
            {
                        !this.state.isLoading
                        && (
                        <View style={styles.radioButtonsContainer}>
                          <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
                          <Button
                            block
                            style={styles.button}
                            onPress={() => {
                              this.props.onSave(this.state.data.find(e => e.selected).value)
                            }}
                          >
                            <Text>
                                Save tags
                            </Text>
                          </Button>
                        </View>
                        )
                    }


          </Content>
        </Container>
      )
    }
}


export default TagPickerScreen
