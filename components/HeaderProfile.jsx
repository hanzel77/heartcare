import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import { Link } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function HeaderProfile({toggleDropdown, handleLogout, dropdownVisible}){

    return (
        <View style={styles.headerRightContainer}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.profileIcon}>
                <Ionicons name="person-circle-outline" size={36} color="#dc3545" />
            </TouchableOpacity>
            {dropdownVisible && (
                <View style={styles.dropdown}>
                    <Link href="/profile" style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Profile</Text>
                    </Link>
                    <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    headerRightContainer: {
        position: 'relative', 
    },
    profileIcon: {
        padding: 5,
        marginEnd: 5,
    },
    dropdown: {
        position: 'absolute',
        top: 50, 
        right: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000, 
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dropdownText: {
        fontSize: 16,
        color: '#343a40',
    },
});