import { View, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import InputTitle from "./InputTitle";

export default function InputPicker({ title, selectedValue, onValueChange, children }) {
    return (
        <View style={styles.container}>
            <InputTitle text={title} />
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={onValueChange}
            >
                {children}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: 'white', // Light background color
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});
