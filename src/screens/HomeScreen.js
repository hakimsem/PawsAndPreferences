import React, { useState } from 'react';
import { Text, ActivityIndicator, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/appStyles';
import useCats from '../hooks/useCats';
import SummaryScreen from './SummaryScreen';
import CatSwiper from '../components/CatSwiper';
import FooterControls from '../components/FooterControls';
import FeedbackOverlay from '../components/FeedbackOverlay';

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

        <CatSwiper
  cats={cats}
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
/>

<FeedbackOverlay
  feedbackText={feedbackText}
  fadeAnim={fadeAnim}
/>
      </SafeAreaView>

      <FooterControls
  swipeDir={swipeDir}
  flashDir={flashDir}
  insets={insets}
  setShowSummary={setShowSummary}
/>
    </SafeAreaView>
  );
}