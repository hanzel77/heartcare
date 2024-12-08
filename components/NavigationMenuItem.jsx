import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";

export default function NavigationMenuItem({ nav_link, icon, text }) {
    return (
        <Link href={nav_link} style={styles.menuItem}>
            <View style={styles.menuItemContent}>
                <Ionicons name={icon} size={24} color="#ffffff" style={styles.icon} />
                <Text style={styles.menuText}>{text}</Text>
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        flex: 1,
        backgroundColor: '#dc3545',
        paddingVertical: 20,
        borderRadius: 10,
        marginHorizontal: 5,
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    menuItemContent: {
        width: '100%',  
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center', 
    },
    menuText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})