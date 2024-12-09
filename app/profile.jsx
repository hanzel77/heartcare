import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text,  Picker, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { app } from '@/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'expo-router';
import useUserData from '@/hooks/useUserData';
import { api_link } from '@/api';

import ProfileError from '@/components/ProfileError';
import LoadingScreen from '@/components/LoadingScreen';
import InputText from '@/components/InputText';
import InputPicker from '@/components/InputPicker';
import InputSwitch from '@/components/InputSwitch';

const EditProfile = () => {
    const auth = getAuth(app);
    const router = useRouter();


    const { userData, loading, error } = useUserData(auth.currentUser?.uid);

    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [smokingHistory, setSmokingHistory] = useState(false);
    const [alcoholConsumption, setAlcoholConsumption] = useState('');
    const [skinCancer, setSkinCancer] = useState(false);
    const [otherCancer, setOtherCancer] = useState(false);
    const [diabetes, setDiabetes] = useState(false);
    const [arthritis, setArthritis] = useState(false);
    const [depression, setDepression] = useState(false);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (userData) {
            setAge(userData[0].age?.toString() || '');
            setSex(userData[0].sex || 'unknown');
            setHeight(userData[0].height_cm?.toString() || '');
            setWeight(userData[0].weight_kg?.toString() || '');
            setSmokingHistory(userData[0].smoking_history || false);
            setAlcoholConsumption(userData[0].alcohol_consumption?.toString() || '');
            setSkinCancer(userData[0].skin_cancer || false);
            setOtherCancer(userData[0].other_cancer || false);
            setDiabetes(userData[0].diabetes || false);
            setArthritis(userData[0].arthritis || false);
            setDepression(userData[0].depression || false);
        }
    }, [userData]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch(`${api_link}/user/${auth.currentUser.uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    age: parseInt(age, 10),
                    sex,
                    height_cm: parseFloat(height),
                    weight_kg: parseFloat(weight),
                    smoking_history: smokingHistory,
                    alcohol_consumption: parseInt(alcoholConsumption, 10),
                    skin_cancer: skinCancer,
                    other_cancer: otherCancer,
                    diabetes,
                    arthritis,
                    depression,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save profile');
            }
            Alert.alert('Profile updated successfully!');
            router.push('/');
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Failed to update profile. Please try again.');
        } finally{
            setSaving(false);
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <ProfileError/>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>

            <InputText title='Age' placeholder='Enter your age' value={age} keyboardType="numeric" onChangeText={setAge}/>

            <InputText title='Weight' placeholder='Enter your weight' value={weight} keyboardType="numeric" onChangeText={setWeight} />

            <InputText title='Height' placeholder='Enter your height' value={height} keyboardType="numeric" onChangeText={setHeight} />

            <InputPicker selectedValue={sex} style={styles.picker} onValueChange={setSex} title="Sex">
                <Picker.Item label="Select Gender" value="unknown" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
            </InputPicker>

            <InputSwitch title='Smoking History' description='Has a history of smoking.' value={smokingHistory} onValueChange={setSmokingHistory}/>

            <InputSwitch
                title="Skin Cancer"
                description="Has a history of skin cancer."
                value={skinCancer}
                onValueChange={setSkinCancer}
            />

            <InputSwitch
                title="Other Cancer"
                description="Has a history of other types of cancer."
                value={otherCancer}
                onValueChange={setOtherCancer}
            />

            <InputSwitch
                title="Diabetes"
                description="Has a history of diabetes."
                value={diabetes}
                onValueChange={setDiabetes}
            />

            <InputSwitch
                title="Arthritis"
                description="Has a history of arthritis."
                value={arthritis}
                onValueChange={setArthritis}
            />

            <InputSwitch
                title="Depression"
                description="Has a history of depression."
                value={depression}
                onValueChange={setDepression}
            />

            <TouchableOpacity onPress={handleSave} style={styles.button} disabled={saving}>
                {saving ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Save Changes</Text>
                )}
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 20,
    },
    labelContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 5,
    },
    input: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        fontSize: 16,
        flex: 2,
    },
    picker: {
        flex: 1,
        marginLeft: 10,
    },
    inputGroupSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    helperText: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditProfile;
