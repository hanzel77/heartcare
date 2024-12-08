import { View, StyleSheet} from 'react-native';

export default function AuthContainer( {children} ){
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },
})
