import {StyleSheet, Text} from 'react-native'

export default function InputTitle({text}){
    return(
        <Text style={styles.label}>{text}</Text>
    )
}
const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 5,
    },
})