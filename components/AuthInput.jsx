import { StyleSheet, TextInput } from "react-native"

export default function AuthInput({...props}){
    return(
        <TextInput
            style={styles.input}
            {...props}
        />
    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});