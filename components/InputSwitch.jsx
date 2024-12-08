import {View, Text, StyleSheet, Switch} from 'react-native';
import InputTitle from './InputTitle';

export default function InputSwitch({title, description, value, onValueChange}){
    return(
        <View style={styles.inputGroupSwitch}>
            <View style={styles.labelContainer}>
                <InputTitle text={title}/>
                <Text style={styles.helperText}>{description}</Text>
            </View>
            <Switch value={value} onValueChange={onValueChange} />
        </View>
    )
}

const styles = StyleSheet.create({
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
    labelContainer: {
        flex: 1,
    },
})