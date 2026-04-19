import React from 'react';
import { Text, TextStyle } from 'react-native';
import { T } from '../tokens';

interface MonoProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: TextStyle;
}

export function Mono({ children, size = 10, color, style }: MonoProps) {
  return (
    <Text style={[{
      fontFamily: 'JetBrainsMono_500Medium',
      fontSize: size,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      color: color || T.textDim,
    }, style]}>
      {children}
    </Text>
  );
}
