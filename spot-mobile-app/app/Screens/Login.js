import React, { Component } from 'react'
import {
  Button, Container, Content, Text,
} from 'native-base'
import { Grid } from 'react-native-easy-grid'
import Row from 'react-native-easy-grid/Components/Row'
import FitImage from 'react-native-fit-image'

import { StyleSheet } from 'react-native'
import { login } from '../api/routes'

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },

  screen: {
    padding: 10,
    backgroundColor: '#F8EDED',
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
  },

  description: {
    marginTop: 5,
    fontSize: 14,
  },

  fitImage: {
    // marginLeft: 20,
    marginTop: 50,
    width: 200,
    height: 300,
  },

  button: {
    marginTop: 100,
    backgroundColor: '#B3886B',
  },
})


export default class Login extends Component {
    login = async () => {
      const userInfo = await login()
      this.props.afterLogin(userInfo)
    }

    render() {
      return (
        <Container>
          {/* <DefaultHeader/> */}
          <Content contentContainerStyle={{ flex: 1 }} style={styles.screen}>
            <Grid style={{ alignItems: 'center' }}>
              <Row>

                <FitImage
                  source={require('../../images/splash.png')}
                  style={styles.fitImage}
                />
              </Row>
              <Row>
                <Button
                  primary
                  block
                  onPress={this.login}
                  style={styles.button}
                >
                  <Text>
                    {' '}
                      Login With Facebook
                    {' '}
                  </Text>
                </Button>
              </Row>
            </Grid>
          </Content>
        </Container>
      )
    }
}
