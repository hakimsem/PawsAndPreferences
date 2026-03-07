import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import styles from '../styles/appStyles';

export default function CatSwiper({
  cats,
  onSwipedLeft,
  onSwipedRight,
  onSwipedAll,
  onSwiping,
  onDragReleased
}) {

  return (
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
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
      onSwipedAll={onSwipedAll}
      onSwiping={onSwiping}
      onDragReleased={onDragReleased}
      cardIndex={0}
      backgroundColor={'transparent'}
      stackSize={3}
    />
  );
}