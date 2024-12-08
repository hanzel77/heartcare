import { View, Image, StyleSheet } from "react-native";
import icon from '@/assets/images/icon-no-text.png';

export default function ApplicationLogo() {
    return (
        <View style={styles.container}>
            <Image
                source={icon}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    logo: {
        width: 150,
        height: 150,
    },
});
