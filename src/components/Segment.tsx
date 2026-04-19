import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { T } from '../tokens';

interface SegmentProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function Segment({ options, value, onChange }: SegmentProps) {
  return (
    <View style={{
      flexDirection: 'row',
      padding: 3,
      backgroundColor: T.panel,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: T.line,
    }}>
      {options.map(o => (
        <TouchableOpacity
          key={o}
          onPress={() => onChange(o)}
          activeOpacity={0.8}
          style={{
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 4,
            backgroundColor: value === o ? T.panelHi : 'transparent',
            borderRadius: 3,
            borderWidth: value === o ? 1 : 0,
            borderColor: T.line,
            alignItems: 'center',
          }}
        >
          <Text style={{
            fontFamily: 'JetBrainsMono_500Medium',
            fontSize: 9,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: value === o ? T.text : T.textDim,
          }}>
            {o}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
