import { View, TextInput, StyleSheet } from "react-native"
import InputTitle from "./InputTitle"

export default function InputText({ title, placeholder, value, keyboardType, onChangeText}){
    return(
        <View style={styles.inputGroup}>
            <InputTitle text={title}/>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                placeholderTextColor="#C0C0C0"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 20,
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
        paddingVertical: 10,
    },
})