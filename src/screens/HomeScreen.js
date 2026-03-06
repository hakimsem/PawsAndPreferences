import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList, TouchableOpacity, Animated, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/appStyles';
import useCats from '../hooks/useCats';
import SummaryScreen from './SummaryScreen';

const FOOTER_HEIGHT = 90;
const positiveWords = ['Cute', 'Wonderful', 'Nice', 'Lovely', 'Adorable', 'Sweet'];
const negativeWords = ['Meh', 'Nope', 'Ugly', 'Boring', 'Nah', 'Bad'];

export default function HomeScreen() {
  const { cats, loading } = useCats();
  const [likedCats, setLikedCats] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [swipeDir, setSwipeDir] = useState(null);
  const [flashDir, setFlashDir] = useState(null);
  const insets = useSafeAreaInsets();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [feedbackText, setFeedbackText] = useState('');

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
    <SummaryScreen
      likedCats={likedCats}
      setLikedCats={setLikedCats}
      setShowSummary={setShowSummary}
      insets={insets}
    />
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