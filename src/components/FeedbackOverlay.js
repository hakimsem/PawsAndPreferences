import React from 'react';
import { Animated, Text } from 'react-native';
import styles from '../styles/appStyles';

export default function FeedbackOverlay({ feedbackText, fadeAnim }) {

  if (!feedbackText) return null;

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text style={styles.feedbackOverlay}>
        {feedbackText}
      </Text>
    </Animated.View>
  );
}