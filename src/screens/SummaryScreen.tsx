import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Path, Line, LinearGradient, Stop, Defs } from 'react-native-svg';
import { T } from '../tokens';
import { Mono } from '../components/Mono';
import { HudButton } from '../components/HudButton';
import { MoosclesMark } from '../components/Logo';
import { RootStackParamList } from '../navigation/types';
import { WORKOUTS } from '../data/workouts';

type Props = NativeStackScreenProps<RootStackParamList, 'Summary'>;

const MUSCLE_LOAD = [
  ['Chest', 0.92],
  ['Anterior Delt', 0.74],
  ['Triceps', 0.68],
  ['Core', 0.42],
] as [string, number][];

const HR_POINTS = '0,60 15,55 30,40 45,48 60,30 75,35 90,20 105,25 120,15 135,22 150,10 165,18 180,12 195,28 210,20 225,35 240,28 255,42 270,38 285,50 300,55';

export function SummaryScreen({ route, navigation }: Props) {
  const workout = WORKOUTS.find(w => w.id === route.params.workoutId) ?? WORKOUTS[0];

  return (
    <View style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Close */}
        <View style={s.topBar}>
          <Mono size={9}>// SESSION_CLOSED</Mono>
          <TouchableOpacity onPress={() => navigation.replace('Main')} activeOpacity={0.7}>
            <Mono size={11} color={T.textDim}>✕</Mono>
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={s.hero}>
          <View style={s.pill}>
            <View style={s.pillDot} />
            <Mono size={10} color={T.accent}>SESSION LOGGED</Mono>
          </View>
          <Text style={s.heroTitle}>
            {workout.name}{'\n'}<Text style={{ color: T.accent }}>complete.</Text>
          </Text>
          <Text style={s.heroSub}>17 apr · 10:32 → 11:21</Text>
        </View>

        {/* Stats 2×2 */}
        <View style={s.statsGrid}>
          <BigStat v="48:12" l="DURATION" />
          <BigStat v="6 280" l="KG TOTAL" accent />
          <BigStat v="24" l="SETS" />
          <BigStat v="142" l="REPS" />
        </View>

        {/* HR Trace */}
        <View style={s.hrCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Mono size={9}>// HR_TRACE</Mono>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Mono size={9}>AVG <Text style={{ color: T.text }}>138</Text></Mono>
              <Mono size={9}>MAX <Text style={{ color: T.accent }}>168</Text></Mono>
            </View>
          </View>
          <Svg viewBox="0 0 300 80" style={{ width: '100%', height: 80, marginTop: 10 }} preserveAspectRatio="none">
            <Defs>
              <LinearGradient id="hrg" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={T.accent} stopOpacity={1} />
                <Stop offset="100%" stopColor={T.accent} stopOpacity={0} />
              </LinearGradient>
            </Defs>
            {[20, 40, 60].map(y => (
              <Line key={y} x1="0" y1={y} x2="300" y2={y} stroke={T.line} strokeDasharray="2 3" />
            ))}
            <Path
              d={`M${HR_POINTS}`}
              fill="none"
              stroke={T.accent}
              strokeWidth={1.5}
            />
            <Path
              d={`M${HR_POINTS} L300,80 L0,80 Z`}
              fill="url(#hrg)"
              opacity={0.25}
            />
          </Svg>
        </View>

        {/* Muscle load */}
        <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
          <Mono size={9}>// MUSCLE_LOAD</Mono>
          <View style={{ gap: 6, marginTop: 8 }}>
            {MUSCLE_LOAD.map(([name, v]) => (
              <View key={name} style={s.muscleRow}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={s.muscleName}>{name}</Text>
                  <Mono size={10} color={v > 0.8 ? T.accent : T.textDim}>{Math.round(v * 100)}%</Mono>
                </View>
                <View style={s.muscleBarBg}>
                  <View style={[s.muscleBarFill, {
                    width: `${v * 100}%`,
                    backgroundColor: v > 0.8 ? T.accent : T.textDim,
                  }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Achievement */}
        <View style={s.achievement}>
          <MoosclesMark size={44} color={T.accent} />
          <View style={{ flex: 1 }}>
            <Mono size={9} color={T.accent}>NEW PR</Mono>
            <Text style={s.prTitle}>Bench Press · 82 kg × 6</Text>
            <Mono size={9} style={{ marginTop: 2 }}>+2.5 kg vs. last cycle</Mono>
          </View>
        </View>

        {/* Actions */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 32, flexDirection: 'row', gap: 8, marginTop: 4 }}>
          <HudButton variant="ghost" style={{ flex: 1 }}>Share</HudButton>
          <HudButton onPress={() => navigation.replace('Main')} style={{ flex: 2 }}>Return Home</HudButton>
        </View>
      </ScrollView>
    </View>
  );
}

function BigStat({ v, l, accent }: { v: string; l: string; accent?: boolean }) {
  return (
    <View style={[bs.cell, { borderColor: accent ? T.accent : T.line }]}>
      <Mono size={9}>{l}</Mono>
      <Text style={[bs.value, { color: accent ? T.accent : T.text }]}>{v}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hero: { paddingHorizontal: 20, paddingVertical: 24, alignItems: 'center' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: T.accent,
    borderRadius: 2,
  },
  pillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: T.accent },
  heroTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 44,
    color: T.text,
    letterSpacing: -1.5,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 46,
  },
  heroSub: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 12,
    color: T.textDim,
    marginTop: 8,
  },
  statsGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hrCard: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    backgroundColor: T.panel,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: T.line,
  },
  muscleRow: {
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: T.panel,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: T.line,
  },
  muscleName: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 11,
    color: T.text,
  },
  muscleBarBg: { height: 4, backgroundColor: T.bg, borderRadius: 2, overflow: 'hidden' },
  muscleBarFill: { height: '100%' },
  achievement: {
    margin: 20,
    marginTop: 16,
    marginBottom: 4,
    padding: 14,
    backgroundColor: 'rgba(255,106,26,0.08)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: T.accent,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  prTitle: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 15,
    color: T.text,
    marginTop: 2,
    letterSpacing: -0.3,
  },
});

const bs = StyleSheet.create({
  cell: {
    width: '48.5%',
    padding: 14,
    backgroundColor: T.panel,
    borderRadius: 4,
    borderWidth: 1,
  },
  value: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 30,
    letterSpacing: -1,
    marginTop: 4,
    lineHeight: 32,
  },
});
