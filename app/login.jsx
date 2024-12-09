import AuthContainer from '@/components/AuthContainer';
import AuthInput from '@/components/AuthInput';
import AuthLink from '@/components/AuthLink';
import AuthTitle from '@/components/AuthTitle';
import React, { useState } from 'react';
import {TouchableOpacity, Alert, ActivityIndicator, Text, StyleSheet} from 'react-native';
import { app } from '@/FirebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import ApplicationLogo from '@/components/ApplicationLogo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  
  const auth = getAuth(app)

  const handleLogin = async () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
      router.push('/');
    }).catch((e)=>{
      alert(e);
    }).finally(()=>{
      setLoading(false);
    })
  };

  return (
    <AuthContainer>
      <ApplicationLogo/>
      <AuthTitle>HeartCare Login</AuthTitle>
      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <AuthInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (<ActivityIndicator size={"small"} style={{ margin: 28 }}></ActivityIndicator>) : (
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableOpacity>
      )}
      <AuthLink href={"/register"}>
        Don't have an account? Register here!
      </AuthLink>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
})

export default Login;
