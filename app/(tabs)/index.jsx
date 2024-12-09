  import React, { useEffect } from 'react';
  import { View, Text, StyleSheet, ScrollView} from 'react-native';
  import { useRouter } from 'expo-router';
  import useUserData from '@/hooks/useUserData';
  import useAuthState from '@/hooks/useAuthState';
  import LoadingScreen from '@/components/LoadingScreen';
  import NavigationMenuItem from '@/components/NavigationMenuItem';
  import ApplicationLogo from '@/components/ApplicationLogo';

  export default function Home() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuthState();
    const { userData, loading: userLoading } = useUserData(user ? user.uid : null);


    useEffect(() => {
      if (!authLoading) {
        if (!user) {
          router.push('/login');
        }
      }
    }, [authLoading, user]);

    if (authLoading || userLoading) {
      return <LoadingScreen />;
    }

    if (user) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <ApplicationLogo/>
            <Text style={styles.title}>HeartCare</Text>
          </View>

          <View style={styles.userCard}>
            <Text style={styles.userName}>{userData[0].name || 'John Doe'}</Text>
            <Text style={styles.userDetail}>Email: {user.email}</Text>
            <Text style={styles.userDetail}>Age: {userData[0].age || 'N/A'}</Text>
            <Text style={styles.userDetail}>Height: {userData[0].height_cm || 'N/A'} cm</Text>
            <Text style={styles.userDetail}>Weight: {userData[0].weight_kg || 'N/A'} kg</Text>
          </View>

          {/* Navigation Menu */}
          <View style={styles.navMenuRow}>
            <NavigationMenuItem nav_link='/checkup' icon='medkit-outline' text='Check Up'/>
            <NavigationMenuItem nav_link='/reports' icon='document-text-outline' text='Reports'/>
          </View>

          <View style={styles.navMenuRow}>
            <NavigationMenuItem nav_link='/predict' icon='heart-outline' text='Heart Predict'/>
            <NavigationMenuItem nav_link='/emergency-contacts' icon='call-outline' text='Emergency'/>

          </View>
        </ScrollView>
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    loadingText: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
      color: '#6c757d',
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#dc3545',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#6c757d',
      textAlign: 'center',
      marginTop: 10,
    },
    userCard: {
      backgroundColor: '#ffffff',
      padding: 15,
      borderRadius: 10,
      color: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 20,
      alignItems: 'center',
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#343a40',
      marginBottom: 10,
    },
    userDetail: {
      fontSize: 16,
      color: '#6c757d',
      marginBottom: 5,
    },
    navMenuRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    menuItem: {
      flex: 1,
      backgroundColor: '#dc3545',
      paddingVertical: 20,
      borderRadius: 10,
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 8,
    },
    metrics: {
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#343a40',
    },
    metricCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    metricLabel: {
      fontSize: 16,
      color: '#6c757d',
    },
    metricValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#343a40',
    },
  });
