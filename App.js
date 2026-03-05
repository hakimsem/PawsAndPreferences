import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList, TouchableOpacity, Animated, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FOOTER_HEIGHT = 90;
const positiveWords = ['Cute', 'Wonderful', 'Nice', 'Lovely', 'Adorable', 'Sweet'];
const negativeWords = ['Meh', 'Nope', 'Ugly', 'Boring', 'Nah', 'Bad'];

export default function App() {
  const [cats, setCats] = useState([]);
  const [likedCats, setLikedCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [swipeDir, setSwipeDir] = useState(null);
  const [flashDir, setFlashDir] = useState(null);
  const insets = useSafeAreaInsets();
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetchCats();
  }, []);

  const [feedbackText, setFeedbackText] = useState('');

  const fetchCats = async () => {
    try {
      const response = await fetch('https://cataas.com/api/cats?limit=100');
      const data = await response.json();

      const uniqueCats = Array.from(
        new Map(data.map(cat => [cat.id, cat])).values()
      );

      setCats(uniqueCats);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  };

  const onSwiped = (direction) => {
    setFlashDir(direction);
    setSwipeDir(null);

    setTimeout(() => {
      setFlashDir(null);
    }, 300);
  };

  const onSwipedRight = (index) => {
    const cat = cats[index];

    setLikedCats((prev) => {
      const exists = prev.find(c => c.id === cat.id);
      if (exists) return prev;
      return [...prev, cat];
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text>Finding kitties...</Text>
      </SafeAreaView>
    );
  }

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

  const handleSwiping = (x) => {
    if (flashDir) return;

    if (x > 50) {
      setSwipeDir('right');
    } else if (x < -50) {
      setSwipeDir('left');
    } else {
      setSwipeDir(null);
    }
  };

  const showSwipeFeedback = (direction) => {
    let pool = direction === 'right' ? positiveWords : negativeWords;

    const randomText = pool[Math.floor(Math.random() * pool.length)];

    setFeedbackText(randomText);

    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setFeedbackText('');
      }, 300);
    }, 700);
  };

  if (showSummary) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
        edges={['top', 'left', 'right']}
      >

        <Text style={styles.title}>Your Summary 📝</Text>

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Paws & Preferences 🐾</Text>

      <SafeAreaView
        style={[
          styles.swiperContainer,
          { paddingBottom: FOOTER_HEIGHT + insets.bottom + 20 }
        ]}
      >

        <Swiper
          cards={cats}
          renderCard={(card) => (
            <View style={styles.card}>
              <Image
                source={{ uri: `https://cataas.com/cat/${card.id}` }}
                style={styles.image}
              />
            </View>
          )}
          onSwipedLeft={() => {
            onSwiped('left');
            showSwipeFeedback('left');
          }}
          onSwipedRight={(index) => {
            onSwipedRight(index);
            onSwiped('right');
            showSwipeFeedback('right');
          }}
          onSwipedAll={() => setShowSummary(true)}
          onSwiping={handleSwiping}
          onDragReleased={() => setSwipeDir(null)}
          cardIndex={0}
          backgroundColor={'transparent'}
          stackSize={3}
        />

        {feedbackText !== '' && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.feedbackOverlay}>
              {feedbackText}
            </Text>
          </Animated.View>
        )}
      </SafeAreaView>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom }
        ]}
      >

        <View style={[
          styles.badge,
          styles.dislikeBadge,
          (swipeDir === 'left' || flashDir === 'left') && styles.dislikeGlow
        ]}>
          <Text style={[
            styles.dislikeText,
            (swipeDir === 'left' || flashDir === 'left') && styles.whiteText
          ]}>✕</Text>
        </View>

        <TouchableOpacity
          style={styles.favouriteButton}
          onPress={() => setShowSummary(true)}
        >
          <Text style={styles.favouriteText}>📝 Summary</Text>
        </TouchableOpacity>

        <View style={[
          styles.badge,
          styles.likeBadge,
          (swipeDir === 'right' || flashDir === 'right') && styles.likeGlow
        ]}>
          <Text style={[
            styles.likeText,
            (swipeDir === 'right' || flashDir === 'right') && styles.whiteText
          ]}>❤️</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  swiperContainer: {
    flex: 1,
    paddingBottom: FOOTER_HEIGHT + 40,
    overflow: 'hidden',
  },
  card: {
    flex: 0.7,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOpacity: 0.25,

    marginBottom: FOOTER_HEIGHT / 2,
    transform: [{ scale: 0.98 }],
  },
  backButtonBox: {
    marginTop: 10,
    marginLeft: 15,
    width: 90,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,

    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  favouriteButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  favouriteText: {
    fontWeight: '700',
    color: '#333',
  },
  summaryText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#555'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    resizeMode: 'cover',
  },
  thumbnail: {
    flex: 1,
    aspectRatio: 1,
    margin: 8,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    position: 'absolute',
    bottom: 0,

    width: '100%',

    paddingHorizontal: 30,
    paddingVertical: 12,

    zIndex: 10,
    elevation: 10,
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  dislikeBadge: { borderColor: '#FF4458' },
  likeBadge: { borderColor: '#17E3A1' },
  whiteText: { color: '#FFFFFF' },

  dislikeGlow: {
    backgroundColor: '#FF4458',
    shadowColor: '#FF4458',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    transform: [{ scale: 1.1 }],
  },
  likeGlow: {
    backgroundColor: '#17E3A1',
    shadowColor: '#17E3A1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    transform: [{ scale: 1.1 }],
  },
  dislikeText: {
    color: '#FF4458',
    fontWeight: '800',
  },
  likeText: {
    color: '#17E3A1',
    fontWeight: '800',
  },
  feedbackText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#444',
    marginBottom: 10,
    minHeight: 30,
  },
  feedbackOverlay: {
    bottom: 20,
    alignSelf: 'center',

    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',

    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,

    fontSize: 18,
    fontWeight: '700',
  },
  binButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  binText: {
    fontSize: 20,
  },
});