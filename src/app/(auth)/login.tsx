import { zodResolver } from '@hookform/resolvers/zod'
import { Tractor } from 'lucide-react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { useLogin } from '@/features/auth/api/authService'
import type { LoginFormValues } from '@/features/auth/types/auth'
import { loginSchema } from '@/features/auth/types/auth'

export default function Login() {
  const { mutate: login, isPending } = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })
  const [showPassword, setShowPassword] = React.useState(false)

  const onSubmit = (data: LoginFormValues) => {
    login(data)
  }

  return (
    <Container>
      <Content>
        <HeaderContainer>
          <IconBackground>
            <Tractor size={32} color="white" />
          </IconBackground>
          <TitleContainer>
            <BrandText>Spatlas</BrandText>
            <SubtitleText>Gestión Inteligente de Riego</SubtitleText>
          </TitleContainer>
        </HeaderContainer>

        <FormContainer>
          <Welcome>Bienvenido de nuevo</Welcome>
          <Description>
            Introduce tus credenciales para acceder a tu panel de control de agricultura
          </Description>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.username}
              />
            )}
          />
          {errors.username && <Error>{errors.username.message}</Error>}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledTextInput
                label="Contraseña"
                mode="outlined"
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.password}
              />
            )}
          />
          {errors.password && <Error>{errors.password.message}</Error>}

          <StyledButton
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
          >
            Iniciar Sesión
          </StyledButton>
        </FormContainer>
      </Content>
    </Container>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.loginBackground};
`

const Content = styled.View`
  justify-content: center;
  align-items: center;
  padding: 32px;
`

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  gap: 16px;
`

const IconBackground = styled.View`
  padding: 16px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 999px;
`

const TitleContainer = styled.View`
  flex-direction: column;
`

const BrandText = styled(Text)`
  font-size: 32px;
  font-family: 'Manrope-Bold';
  color: ${(props) => props.theme.text};
`

const SubtitleText = styled(Text)`
  font-size: 14px;
  color: ${(props) => props.theme.text};
  opacity: 0.7;
`

const Welcome = styled(Text)`
  font-size: 24px;
  font-family: 'Manrope-Bold';
  color: ${(props) => props.theme.text};
  margin-bottom: 3px;
`

const Description = styled(Text)`
  font-size: 14px;
  font-family: 'Manrope-Regular';
  color: ${(props) => props.theme.text};
  opacity: 0.7;
  margin-bottom: 20px;
`

const FormContainer = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.background};
`

const StyledTextInput = styled(TextInput)`
  background-color: transparent;
  margin-bottom: 20px;
`

const StyledButton = styled(Button)`
  margin-top: 10px;
  padding: 4px 0;
  border-radius: 12px;
  margin-bottom: 20px;
`

const Error = styled(Text)`
  color: ${(props) => props.theme.error};
  font-size: 12px;
`
