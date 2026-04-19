import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { T } from '../tokens';

interface MarkProps {
  size?: number;
  color?: string;
}

export function MoosclesMark({ size = 48, color = T.accent }: MarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Outer hex */}
      <Path
        d="M32 3L57 17.5V46.5L32 61L7 46.5V17.5L32 3Z"
        fill="transparent"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Inner tick hex */}
      <Path
        d="M32 11L50 21.5V42.5L32 53L14 42.5V21.5L32 11Z"
        stroke={color}
        strokeOpacity={0.35}
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      {/* M pulse */}
      <Path
        d="M16 40 L22 40 L26 24 L32 36 L38 24 L42 40 L48 40"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* Corner dots */}
      <Circle cx="32" cy="3" r="1.5" fill={color} />
      <Circle cx="32" cy="61" r="1.5" fill={color} />
    </Svg>
  );
}

interface LogoProps {
  size?: number;
  color?: string;
  accent?: string;
}

export function MoosclesLogo({ size = 28, color = T.text, accent = T.accent }: LogoProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <MoosclesMark size={size * 1.3} color={accent} />
      <Text style={{
        fontFamily: 'SpaceGrotesk_700Bold',
        fontSize: size * 0.75,
        letterSpacing: -0.5,
        color,
        lineHeight: size,
      }}>
        <Text style={{ color }}>MOO</Text>
        <Text style={{ color: accent }}>/</Text>
        <Text style={{ color }}>SCLES</Text>
      </Text>
    </View>
  );
}
