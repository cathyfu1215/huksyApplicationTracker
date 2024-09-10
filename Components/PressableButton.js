// a reusable button component that is not a tab button nor a save/cancel button

import React from 'react';
import { Pressable } from 'react-native';
import { View, Text } from 'react-native';
import styles from '../styleHelper.js';

function PressableButton({ children, pressedFunction, disabled = false }) {
  return (
    <Pressable
      onPress={disabled ? null : pressedFunction}
      style={({ pressed }) => [
        styles.button,
        { 
          backgroundColor: disabled ? 'grey' : (pressed ? 'yellow' : styles.button.backgroundColor),
          opacity: disabled ? 0.6 : 1
        }
      ]}
      android_ripple={{ color: 'yellow' }}
      disabled={disabled}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default PressableButton;
