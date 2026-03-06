import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/appStyles';

export default function SummaryScreen({
  likedCats,
  setLikedCats,
  setShowSummary,
  insets
}) {

  const clearFavourites = () => {
    Alert.alert(
      "Clear favourites?",
      "All favourite cats will be removed.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes, delete",
          style: "destructive",
          onPress: () => setLikedCats([])
        }
      ]
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
      edges={['top', 'left', 'right']}
    >

      <View style={{ alignItems: 'center', paddingTop: 20 }}>
        <Text style={styles.title}>Your Summary 📝</Text>
      </View>

      <Text style={styles.summaryText}>
        You liked {likedCats.length} cats ❤️
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>

        <TouchableOpacity
          style={styles.backButtonBox}
          onPress={() => setShowSummary(false)}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.binButton}
          onPress={clearFavourites}
        >
          <Text style={styles.binText}>🗑️</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={likedCats}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: insets.bottom + 80,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: `https://cataas.com/cat/${item.id}` }}
            style={styles.thumbnail}
          />
        )}
      />

    </SafeAreaView>
  );
}