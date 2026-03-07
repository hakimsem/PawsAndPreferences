import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/appStyles';

export default function FooterControls({
  swipeDir,
  flashDir,
  insets,
  setShowSummary
}) {

  return (
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
  );
}