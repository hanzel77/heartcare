import LoadingScreen from '@/components/LoadingScreen';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://newsapi.org/v2/everything?q=cardiovascular health&sortBy=popularity&apiKey=f8e7d57b059f4cd582162a1c6cba97b7');
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    function handleLink(url){
        Linking.openURL(url)
    }

    if (loading) {
        return (
            <LoadingScreen/>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Health Articles</Text>
            <FlatList
                data={articles['articles']}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.articleCard} onPress={()=>handleLink(item.url)}>
                        <Image source={{ uri: item.urlToImage || 'https://placehold.co/600x400' }} style={styles.articleImage} />
                        <Text style={styles.articleTitle}>{item.title}</Text>
                        <View style={styles.articleMeta}>
                            <Text style={styles.authorText}>By: {item.author}</Text>
                            <Text style={styles.dateText}>{formatDate(item.publishedAt)}</Text>
                        </View>
                        <Text style={styles.articleSummary}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 15,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    articleCard: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
    },
    articleImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    articleMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    authorText: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
    },
    dateText: {
        fontSize: 14,
        color: '#888',
    },
    articleSummary: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});
