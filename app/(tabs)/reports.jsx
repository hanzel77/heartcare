import React, {useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import useUserReports from '@/hooks/useUserReports';
import LoadingScreen from '@/components/LoadingScreen';
import useAuthState from '@/hooks/useAuthState';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function Reports() {
    const { user, loading } = useAuthState();

    const { reports, loading: userLoading, error, refetch } = useUserReports(user ? user.uid: null);

    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [user])
    );

    if (loading || userLoading) {
        return (
            <LoadingScreen />
        );
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error.message}</Text>;
    }

    const handleAddPredict = ()=>{
        router.push('/predict')
    }

    return (
        <View style={styles.container}>
            {reports.length > 0 ? (
                <FlatList
                    data={reports}
                    keyExtractor={(item) => item.id}
                    renderItem={({item})=>(
                        <View style={styles.reportItem}>
                            <Text style={styles.reportTitle}>Prediction: {item.report_prediction == 0 ? "No Heart Disease": "Heart Disease"}</Text>
                            <Text style={styles.reportDate}>Date: {item.report_date}</Text>
                            <Text style={styles.reportDetails}>{Math.round(item.report_probability*100)}% chance of Heart Disease</Text>
                        </View>
                    )}
                />
            ) : (<View>
                <Text style={styles.emptyText}>No reports found for this user.</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddPredict}>
                    <Text style={styles.addButtonText}>Do a Prediction</Text>
                </TouchableOpacity>
            </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    loadingText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    reportItem: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    reportDate: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    reportDetails: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    emptyText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
    }, 
    addButton: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
