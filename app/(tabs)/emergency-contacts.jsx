import useUserContacts from '@/hooks/useUserContacts';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput, Button, ActivityIndicator, Linking } from 'react-native';
import useAuthState from '@/hooks/useAuthState';
import LoadingScreen from '@/components/LoadingScreen';
import { api_link } from '@/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function EmergencyContacts() {
    const router = useRouter();
    const { user, loading } = useAuthState();
    const { userContacts: fetchedUserContacts, loading: contactsLoading } = useUserContacts(user ? user.uid : null);

    const [modalVisible, setModalVisible] = useState(false);
    const [newContactName, setNewContactName] = useState('');
    const [newContactPhone, setNewContactPhone] = useState('');
    const [saving, setSaving] = useState(false);
    const [userContacts, setUserContacts] = useState([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [loading, user]);

    useEffect(() => {
        if (fetchedUserContacts) {
            setUserContacts(fetchedUserContacts);
        }
    }, [fetchedUserContacts]);

    if (loading || contactsLoading) {
        return <LoadingScreen />;
    }

    const handleCall = (phone) => {
        Linking.openURL("tel: " + phone);
    };

    const handleAddContact = () => {
        setModalVisible(true);
    };

    const handleSaveContact = async () => {
        if (newContactName && newContactPhone) {
            setSaving(true);
            try {
                const response = await fetch(`${api_link}/emergency-contacts/${user.uid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: newContactName,
                        phone: newContactPhone,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    Alert.alert('Contact Added', `Name: ${newContactName}, Phone: ${newContactPhone}`);
                    setUserContacts((prevContacts) => [
                        ...prevContacts,
                        { id: result.id, name: newContactName, phone: newContactPhone }
                    ]);
                    setNewContactName('');
                    setNewContactPhone('');
                    setModalVisible(false);
                } else {
                    const errorData = await response.json();
                    Alert.alert('Error', errorData.error || 'Failed to add contact.');
                }
            } catch (error) {
                Alert.alert('Error', 'Something went wrong. Please try again.');
            } finally {
                setSaving(false);
            }
        } else {
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    const handleDeleteContact = async (contactId) => {

        Alert.alert(
            'Delete Contact',
            'Are you sure you want to delete this contact?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => handleDeleteContact(contactId) },
            ]
        );


        try {
            const response = await fetch(`${api_link}/emergency-contacts/${user.uid}/${contactId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                Alert.alert('Contact Deleted', 'The contact has been removed successfully.');
                // Remove the deleted contact from the state
                setUserContacts((prevContacts) => prevContacts.filter(contact => contact.id !== contactId));
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Failed to delete contact.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Emergency Contacts</Text>

            {userContacts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No emergency contacts added yet.</Text>
                </View>
            ) : (
                    <FlatList
                        data={userContacts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactName}>{item.name}</Text>
                                <Text style={styles.contactPhone}>{item.phone}</Text>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        style={styles.callButton}
                                        onPress={() => handleCall(item.phone)}
                                    >
                                        <Text style={styles.callButtonText}>Call</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDeleteContact(item.id)}
                                    >
                                        <Icon name="trash" size={20} color="#e74c3c" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

            )}

            <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
                <Text style={styles.addButtonText}>+ Add New Contact</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add New Contact</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={newContactName}
                            onChangeText={setNewContactName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            keyboardType="phone-pad"
                            value={newContactPhone}
                            onChangeText={setNewContactPhone}
                        />

                        <View style={styles.modalButtons}>
                            {saving ? (
                                <ActivityIndicator size="small" color="#3498db" />
                            ) : (
                                <Button title="Save" onPress={handleSaveContact} />
                            )}
                            <Button
                                title="Cancel"
                                color="red"
                                onPress={() => {
                                    if (!saving) setModalVisible(false);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    contactItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
    },
    contactPhone: {
        fontSize: 16,
        color: '#666',
        marginVertical: 5,
    },
    callButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,

    },
    callButton: {
        flex: 0.9,
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    deleteButton: {
        flex: 0.1,
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',

    },
});
