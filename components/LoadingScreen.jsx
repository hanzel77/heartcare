import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export default function LoadingScreen(){
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#dc3545" />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        color: '#6c757d',
    },
});