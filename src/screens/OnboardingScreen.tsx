import React, { useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView,
  Platform, ScrollView, StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { T } from '../tokens';
import { Mono } from '../components/Mono';
import { HudButton } from '../components/HudButton';
import { MoosclesLogo } from '../components/Logo';
import { RootStackParamList } from '../navigation/types';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'> };

export function OnboardingScreen({ navigation }: Props) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('ath-09@mooscles.io');
  const [code, setCode] = useState(['', '', '', '']);
  const refs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  const setDigit = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 3) refs[i + 1].current?.focus();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: T.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={s.header}>
          <MoosclesLogo size={22} />
          <Mono size={9}>v.026-17</Mono>
        </View>

        {step === 0 ? (
          <View style={s.content}>
            <Mono size={10} color={T.accent}>// INITIALIZE</Mono>
            <Text style={s.hero}>
              TRAIN{'\n'}LIKE A{'\n'}<Text style={{ color: T.accent }}>MACHINE.</Text>
            </Text>
            <Text style={s.subtitle}>
              Telemetry-grade training. Real-time form data, adaptive sets, zero fluff.
            </Text>

            <View style={{ marginTop: 'auto', gap: 12 }}>
              {/* Email input with brackets */}
              <View style={s.inputWrap}>
                {/* Corner brackets */}
                <View style={[s.corner, { top: -4, left: -4, borderTopWidth: 1.5, borderLeftWidth: 1.5 }]} />
                <View style={[s.corner, { top: -4, right: -4, borderTopWidth: 1.5, borderRightWidth: 1.5 }]} />
                <View style={[s.corner, { bottom: -4, left: -4, borderBottomWidth: 1.5, borderLeftWidth: 1.5 }]} />
                <View style={[s.corner, { bottom: -4, right: -4, borderBottomWidth: 1.5, borderRightWidth: 1.5 }]} />
                <View style={s.inputRow}>
                  <Mono size={10} color={T.accent}>ID</Mono>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={s.textInput}
                    placeholderTextColor={T.textMuted}
                  />
                </View>
              </View>

              <HudButton onPress={() => setStep(1)}>Connect →</HudButton>
              <View style={{ alignItems: 'center' }}>
                <Mono size={9}>
                  No account?{'  '}
                  <Text style={{ color: T.accent }}>Request access</Text>
                </Mono>
              </View>
            </View>
          </View>
        ) : (
          <View style={s.content}>
            <Mono size={10} color={T.accent}>// AUTHENTICATING</Mono>
            <Text style={[s.hero, { fontSize: 36, letterSpacing: -1.2 }]}>
              Biometric{'\n'}handshake
            </Text>
            <Mono size={12} color={T.textDim}>Code sent to {email}</Mono>

            {/* 4-digit code */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 32 }}>
              {code.map((v, i) => (
                <TextInput
                  key={i}
                  ref={refs[i]}
                  value={v}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={val => setDigit(i, val)}
                  style={[s.codeInput, { borderColor: v ? T.accent : T.line }]}
                />
              ))}
            </View>

            {/* Status checks */}
            <View style={{ gap: 8, marginTop: 24 }}>
              {[
                { label: 'Neural pattern ✓', ok: true },
                { label: 'Device signature ✓', ok: true },
                { label: 'Vitals sync · pending', ok: false },
              ].map((item, i) => (
                <View key={i} style={s.statusRow}>
                  <View style={[s.dot, { backgroundColor: item.ok ? T.ok : T.warn }]} />
                  <Mono size={11} color={T.textDim}>{item.label}</Mono>
                </View>
              ))}
            </View>

            <View style={{ marginTop: 'auto', flexDirection: 'row', gap: 10 }}>
              <HudButton variant="ghost" onPress={() => setStep(0)} style={{ flex: 1 }}>Back</HudButton>
              <HudButton onPress={() => navigation.replace('Main')} style={{ flex: 2 }}>Enter System</HudButton>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 40,
    gap: 16,
  },
  hero: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 52,
    lineHeight: 52 * 0.95,
    letterSpacing: -2,
    color: T.text,
    marginTop: 8,
  },
  subtitle: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 13,
    color: T.textDim,
    lineHeight: 20,
    maxWidth: 280,
  },
  inputWrap: {
    position: 'relative',
    padding: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: T.panel,
    borderWidth: 1,
    borderColor: T.line,
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: T.text,
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 13,
  },
  corner: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderColor: T.accent,
    zIndex: 1,
  },
  codeInput: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: T.panel,
    borderWidth: 1,
    borderRadius: 4,
    color: T.text,
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    textAlign: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: T.panel,
    borderWidth: 1,
    borderColor: T.line,
    borderRadius: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
