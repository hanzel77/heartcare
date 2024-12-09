import { api_link } from '@/api';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import useUserData from '@/hooks/useUserData';
import LoadingScreen from '@/components/LoadingScreen';
import useAuthState from '@/hooks/useAuthState';
import InputPicker from '@/components/InputPicker';
import InputText from '@/components/InputText';

export default function Predict() {
    const router = useRouter();
    const { user, loading } = useAuthState();

    const { userData, loading: userLoading, error } = useUserData(user ? user.uid : null);

    const [formData, setFormData] = useState({
        Age: '',
        Sex: '',
        "Height_(cm)": '',
        "Weight_(kg)": '',
        Smoking_History: '',
        Skin_Cancer: '',
        Other_Cancer: '',
        Diabetes: '',
        Arthritis: '',
        Depression: '',
        General_Health: '',
        Checkup: '',
        Exercise: '',
        Alcohol_Consumption: '',
        Fruit_Consumption: '',
        Green_Vegetables_Consumption: '',
        FriedPotato_Consumption: '',
    });

    useEffect(() => {
        if (userData) {
            setFormData((prevData) => ({
                ...prevData,
                Age: userData[0].age,
                Sex: userData[0].sex,
                "Height_(cm)": userData[0].height_cm,
                "Weight_(kg)": userData[0].weight_kg,
                Smoking_History: userData[0].smoking_history,
                Skin_Cancer: userData[0].skin_cancer,
                Other_Cancer: userData[0].other_cancer,
                Diabetes: userData[0].diabetes,
                Arthritis: userData[0].arthritis,
                Depression: userData[0].depression,
            }));
        }
    }, [userData]);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handlePredict = async () => {
        if (Object.values(formData).some(value => value === '' || value === 'unknown')) {
            Alert.alert('Error', 'Please fill out all fields.', [{ text: 'OK' }]);
            return;
        }

        try {
            const response = await fetch(`${api_link}/predict/${user.uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/reports');
            } else {
                Alert.alert('Error', `Error: ${data.message || 'Unable to process the prediction.'}`, [{ text: 'OK' }]);
            }
        } catch (error) {
            Alert.alert('Error', `Network Error: ${error.message}`, [{ text: 'OK' }]);
        }
    };

    const handleCompleteProfile = () => {
        router.push('/profile');
    };

    const isProfileIncomplete = () => {
        if (!userData || userData.length === 0) return true;

        const requiredFields = [
            'age', 'sex', 'height_cm', 'weight_kg',
            'smoking_history', 'skin_cancer',
            'other_cancer', 'diabetes',
            'arthritis', 'depression'
        ];
        
        console.log(userData[0])

        return requiredFields.some(field =>{
                const value = userData[0][field];
                return value === null || value === undefined || value === '';
            }
        )
    };

    if (loading || userLoading) {
        return (
            <LoadingScreen />
        );
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error.message}</Text>;
    }

    if (isProfileIncomplete()) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Complete Your Profile</Text>
                <Text style={styles.description}>
                    Please complete your profile to access health risk prediction.
                </Text>
                <TouchableOpacity
                    style={styles.completeProfileButton}
                    onPress={handleCompleteProfile}
                >
                    <Text style={styles.completeProfileButtonText}>Complete Profile</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Health Risk Prediction</Text>
            <Text style={styles.description}>
                Fill in the details below to predict your health risks. Ensure all fields are completed!
            </Text>



            <InputPicker selectedValue={formData.General_Health} onValueChange={(value) => handleChange('General_Health', value)} title="General Health">
                <Picker.Item label="Select Health Status" value="unknown" />
                <Picker.Item label="Poor" value="poor" />
                <Picker.Item label="Fair" value="fair" />
                <Picker.Item label="Good" value="good" />
                <Picker.Item label="Very Good" value="very_good" />
                <Picker.Item label="Excellent" value="excellent" />
            </InputPicker>



            <InputPicker selectedValue={formData.Checkup}
                style={styles.picker}
                onValueChange={(value) => handleChange('Checkup', value)} title={'Last Medical Checkup'}>
                <Picker.Item label="Select Checkup Time" value="unknown" />
                <Picker.Item label="Within the past year" value="within_1_year" />
                <Picker.Item label="Within the past 2 years" value="within_2_years" />
                <Picker.Item label="Within the past 5 years" value="within_5_years" />
                <Picker.Item label="5 or more years ago" value="5_or_more_years" />
                <Picker.Item label="Never" value="never" />
            </InputPicker>


            <InputText
                title="Exercise (times/week)"
                placeholder="Enter exercise frequency"
                value={formData.Exercise}
                keyboardType="numeric"
                onChangeText={(value) => handleChange('Exercise', value)}
            />

            <InputText
                title="Alcohol Consumption (times/week)"
                placeholder="Enter alcohol consumption frequency"
                value={formData.Alcohol_Consumption}
                keyboardType="numeric"
                onChangeText={(value) => handleChange('Alcohol_Consumption', value)}
            />

            <InputText
                title="Fruit Consumption (times/week)"
                placeholder="Enter fruit consumption frequency"
                value={formData.Fruit_Consumption}
                keyboardType="numeric"
                onChangeText={(value) => handleChange('Fruit_Consumption', value)}
            />

            <InputText
                title="Green Vegetables Consumption (times/week)"
                placeholder="Enter green vegetables consumption frequency"
                value={formData.Green_Vegetables_Consumption}
                keyboardType="numeric"
                onChangeText={(value) => handleChange('Green_Vegetables_Consumption', value)}
            />

            <InputText
                title="Fried Potato Consumption (times/week)"
                placeholder="Enter fried potato consumption frequency"
                value={formData.FriedPotato_Consumption}
                keyboardType="numeric"
                onChangeText={(value) => handleChange('FriedPotato_Consumption', value)}
            />

            <TouchableOpacity style={styles.predictButton} onPress={handlePredict}>
                <Text style={styles.predictButtonText}>Predict</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        lineHeight: 22,
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    picker: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    predictButton: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    predictButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    completeProfileButton: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    completeProfileButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
