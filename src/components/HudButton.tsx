import React from 'react';
import { TouchableOpacity, Text, ViewStyle, View } from 'react-native';
import { T } from '../tokens';

type ButtonVariant = 'primary' | 'ghost' | 'dark';

interface HudButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

const variantBg: Record<ButtonVariant, string> = {
  primary: T.accent,
  ghost: 'transparent',
  dark: T.panelHi,
};

const variantBorder: Record<ButtonVariant, string> = {
  primary: T.accent,
  ghost: T.line,
  dark: T.line,
};

const variantTextColor: Record<ButtonVariant, string> = {
  primary: '#0B0D0F',
  ghost: T.text,
  dark: T.text,
};

export function HudButton({ children, onPress, variant = 'primary', style, icon }: HudButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 4,
        backgroundColor: variantBg[variant],
        borderWidth: 1,
        borderColor: variantBorder[variant],
      }, style]}
    >
      {icon && <View>{icon}</View>}
      <Text style={{
        fontFamily: 'SpaceGrotesk_600SemiBold',
        fontSize: 13,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: variantTextColor[variant],
      }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
