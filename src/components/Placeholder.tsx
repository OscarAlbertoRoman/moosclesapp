import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { T } from '../tokens';

interface PlaceholderProps {
  height?: number;
  label?: string;
  accent?: boolean;
  style?: ViewStyle;
}

export function Placeholder({ height = 120, label = 'IMG', accent = false, style }: PlaceholderProps) {
  const color = accent ? T.accent : T.textMuted;
  return (
    <View style={[{
      height,
      backgroundColor: T.panelHi,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: T.line,
      alignItems: 'center',
      justifyContent: 'center',
    }, style]}>
      <Text style={{
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 10,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color,
      }}>
        {label}
      </Text>
    </View>
  );
}
