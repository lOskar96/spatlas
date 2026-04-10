import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'styled-components/native'

const Login = () => {
  return (
    <Container>
      <Text>Login</Text>
    </Container>
  )
}

export default Login

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`
