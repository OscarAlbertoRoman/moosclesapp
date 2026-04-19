import React from 'react';
import { View } from 'react-native';
import { T } from '../tokens';
import { Mono } from './Mono';

interface HudDividerProps {
  label?: string;
  color?: string;
  marginVertical?: number;
}

export function HudDivider({ label, color = T.line, marginVertical = 0 }: HudDividerProps) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginVertical,
    }}>
      <View style={{ flex: 1, height: 1, backgroundColor: color }} />
      {label && <Mono size={9} color={T.textMuted}>{label}</Mono>}
      <View style={{ flex: 1, height: 1, backgroundColor: color }} />
    </View>
  );
}
