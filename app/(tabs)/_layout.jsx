import React, { useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Provider } from 'react-native-paper';
import HeaderProfile from '@/components/HeaderProfile';
import { app } from '@/FirebaseConfig'
import { getAuth, signOut } from 'firebase/auth';

export default function TabLayout() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const router = useRouter();

    const auth = getAuth(app)

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleLogout = () => {
        setDropdownVisible(false);
        signOut(auth).then(()=>{
            router.push('/login');
        }).catch((error)=>{
            alert(error);
        });
    };

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                <Tabs screenOptions={{ tabBarActiveTintColor: '#dc3454' }}>
                    <Tabs.Screen
                        name="articles"
                        options={{
                            title: 'Articles',
                            tabBarIcon: ({ color }) => <Ionicons name="medkit-outline" size={24} color={color} />,
                            headerRight: () => <HeaderProfile toggleDropdown={toggleDropdown} handleLogout={handleLogout} dropdownVisible={dropdownVisible} />
                        }}
                    />
                    <Tabs.Screen
                        name="reports"
                        options={{
                            title: 'Reports',
                            tabBarIcon: ({ color }) => <Ionicons name="document-text-outline" size={24} color={color} />,
                            headerRight: ()=><HeaderProfile toggleDropdown={toggleDropdown} handleLogout={handleLogout} dropdownVisible={dropdownVisible}/>
                        }}
                    />
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Home',
                            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
                            headerRight: () => <HeaderProfile toggleDropdown={toggleDropdown} handleLogout={handleLogout} dropdownVisible={dropdownVisible} />
                        }}
                    />
                    <Tabs.Screen
                        name="predict"
                        options={{
                            title: 'Predict',
                            tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />,
                            headerRight: () => <HeaderProfile toggleDropdown={toggleDropdown} handleLogout={handleLogout} dropdownVisible={dropdownVisible} />
                        }}
                    />
                    <Tabs.Screen
                        name="emergency-contacts"
                        options={{
                            title: 'Emergency Contacts',
                            tabBarIcon: ({ color }) => <Ionicons name="call-outline" size={24} color={color} />,
                            headerRight: () => <HeaderProfile toggleDropdown={toggleDropdown} handleLogout={handleLogout} dropdownVisible={dropdownVisible} />
                        }}
                    />
                </Tabs>
            </View>
        </Provider>
    );
}


