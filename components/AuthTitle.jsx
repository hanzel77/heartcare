import { StyleSheet, Text } from "react-native";


export default function AuthTitle({children}){
    return(
        <Text style={styles.title}>{children}</Text>
    )
} 

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#dc3545',
        fontWeight: 'bold',
    },
});