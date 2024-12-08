import AuthContainer from '@/components/AuthContainer';
import AuthInput from '@/components/AuthInput';
import AuthLink from '@/components/AuthLink';
import AuthTitle from '@/components/AuthTitle';
import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { app } from '@/FirebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { api_link } from '@/api';
import ApplicationLogo from '@/components/ApplicationLogo';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth(app)
    const router = useRouter();

    const  handleRegister = async () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password).then(()=>{
            const uid = auth.currentUser.uid;

            fetch(`${api_link}/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid,
                    name: name,
                    email: email,
                    password: password
                })
            })
            .then(response => console.log(response.json()))
            .catch(error => console.error(error));

            router.push('/');
        }).catch((error)=>{
            alert(error)
        }).finally(()=>{
            setLoading(false)
        })
    };

    return (
        <AuthContainer>
            <ApplicationLogo/>
            <AuthTitle style={{color: '#dc3454'}}>HeartCare Register</AuthTitle>
            <AuthInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
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
            {loading ? (<ActivityIndicator size={"small"} style={{margin: 28}}></ActivityIndicator>): (
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            )}
            <AuthLink href={"/login"}>
                Already have an account? Login here
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

export default Register;
