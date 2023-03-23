


import useThemeColors from '../hooks/useThemeColors';
import React, { useState } from 'react'
import { Alert, StyleSheet, View, Button, TextInput } from 'react-native'
import { supabase } from '../api/InitSupabse';
import { outerContainer } from '../themes/shared';
import AppButton from '../components/AppButton';


export default function LoginScreen() {
  const colors = useThemeColors();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View  style={[
        outerContainer.container,
        { backgroundColor: colors.background }
    ]}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <AppButton disabled={loading} onPress={() => signInWithEmail()}>Login</AppButton>
      </View>
      <View style={styles.verticallySpaced}>
      <AppButton disabled={loading} onPress={() => signUpWithEmail()}>Sign up</AppButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 10,
    padding: 10
  },
  verticallySpaced: {
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})

