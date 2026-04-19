import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { T } from '../tokens';

interface GaugeProps {
  value?: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function Gauge({
  value = 0.6,
  size = 120,
  stroke = 6,
  color = T.accent,
  track = T.line,
  children,
  style,
}: GaugeProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clampedValue = Math.min(1, Math.max(0, value));
  const dashOffset = c * (1 - clampedValue);

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Svg
        width={size}
        height={size}
        style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}
      >
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>{children}</View>
    </View>
  );
}
