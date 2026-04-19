import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { T } from '../tokens';
import { Mono } from '../components/Mono';
import { Gauge } from '../components/Gauge';
import { HudButton } from '../components/HudButton';
import { Placeholder } from '../components/Placeholder';
import { TabParamList, RootStackParamList } from '../navigation/types';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Home'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

const READINESS_BARS = [0.9, 0.85, 0.6, 0.95, 0.7, 0.88, 0.82];

const PROGRAMS = [
  { name: 'Hypertrophy.Max', sub: '6-week · 4 days/wk', pct: 0.42, active: true },
  { name: 'Conditioning.Burn', sub: '4-week · metabolic', pct: 0.15 },
  { name: 'Mobility.Node', sub: 'daily · 12 min', pct: 0.78 },
];

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Mono size={9}>// 10:32 · WED 17</Mono>
          <Text style={s.title}>
            Athlete <Text style={{ color: T.accent }}>09</Text>
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <IconBtn>
            <Svg width={16} height={16} viewBox="0 0 24 24" stroke={T.text} strokeWidth={2} fill="none">
              <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />
            </Svg>
          </IconBtn>
          <IconBtn>
            <Svg width={16} height={16} viewBox="0 0 24 24" stroke={T.text} strokeWidth={2} fill="none">
              <Path d="M21 21l-4.3-4.3" />
              <Path d="M11 18a7 7 0 100-14 7 7 0 000 14z" />
            </Svg>
          </IconBtn>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Readiness HUD */}
        <View style={s.readinessCard}>
          <Gauge value={0.82} size={100} stroke={6}>
            <Text style={{ fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, color: T.accent, lineHeight: 26 }}>82</Text>
            <Mono size={8}>READINESS</Mono>
          </Gauge>
          <View style={{ flex: 1, gap: 6 }}>
            <Mono size={9} color={T.accent}>// STATUS</Mono>
            <Text style={s.readinessText}>Primed for{'\n'}high-intensity.</Text>
            <View style={{ flexDirection: 'row', height: 24, gap: 3, marginTop: 6 }}>
              {READINESS_BARS.map((v, i) => (
                <View key={i} style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <View style={{
                    width: '100%',
                    height: `${v * 100}%`,
                    backgroundColor: i === 6 ? T.accent : T.line,
                    borderRadius: 1,
                  }} />
                </View>
              ))}
            </View>
            <Mono size={8} color={T.textMuted}>7-DAY TREND</Mono>
          </View>
        </View>

        {/* Today's session */}
        <Mono size={9} style={{ marginTop: 20, marginBottom: 8 }}>// TODAY'S SESSION</Mono>
        <View style={s.heroCard}>
          <Placeholder height={140} label="HERO · PUSH DAY" accent style={{ borderRadius: 0 }} />
          <View style={{ padding: 16, gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <View>
                <Mono size={9} color={T.accent}>PHASE 02 · HYPERTROPHY</Mono>
                <Text style={s.sessionTitle}>
                  Upper Push<Text style={{ color: T.accent }}>.</Text>
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.duration}>
                  48<Text style={{ color: T.textDim, fontSize: 11 }}>min</Text>
                </Text>
                <Mono size={8}>EST. DURATION</Mono>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
              {['8 exercises', '24 sets', '6 280 kg total'].map(l => (
                <View key={l} style={s.tag}>
                  <Text style={s.tagText}>{l}</Text>
                </View>
              ))}
            </View>
            <HudButton
              onPress={() => navigation.navigate('Exercise', { workoutId: 'w1', exerciseIdx: 0 })}
              style={{ marginTop: 6 }}
            >
              ▶  Engage Session
            </HudButton>
          </View>
        </View>

        {/* Quick stats */}
        <View style={s.statsGrid}>
          <StatCell label="STREAK" value="14" unit="DAYS" />
          <StatCell label="VOLUME" value="42.8" unit="K KG" />
          <StatCell label="VO2" value="51" unit="ML/KG" />
        </View>

        {/* Programs */}
        <Mono size={9} style={{ marginTop: 8, marginBottom: 8 }}>// PROGRAMS</Mono>
        <View style={{ gap: 8 }}>
          {PROGRAMS.map(p => (
            <TouchableOpacity
              key={p.name}
              onPress={() => navigation.navigate('WorkoutDetail', { workoutId: 'w1' })}
              activeOpacity={0.8}
              style={[s.programRow, { borderColor: p.active ? T.accent : T.line }]}
            >
              <View style={[s.programIcon, { borderColor: T.line }]}>
                <View style={{
                  width: 14, height: 14,
                  backgroundColor: p.active ? T.accent : T.textMuted,
                  transform: [{ rotate: '45deg' }],
                }} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={s.programName}>{p.name}</Text>
                  <Mono size={10} color={p.active ? T.accent : T.textDim}>{Math.round(p.pct * 100)}%</Mono>
                </View>
                <Mono size={9} style={{ marginTop: 2 }}>{p.sub}</Mono>
                <View style={[s.progressBg, { marginTop: 6 }]}>
                  <View style={[s.progressFill, { width: `${p.pct * 100}%`, backgroundColor: p.active ? T.accent : T.textDim }]} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 8 }} />
      </ScrollView>
    </View>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <TouchableOpacity style={s.iconBtn} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
}

function StatCell({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <View style={s.statCell}>
      <Mono size={8}>{label}</Mono>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 4 }}>
        <Text style={s.statValue}>{value}</Text>
        <Mono size={8}>{unit}</Mono>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 22,
    color: T.text,
    marginTop: 2,
    letterSpacing: -0.5,
  },
  scroll: { paddingHorizontal: 20, paddingBottom: 16 },
  readinessCard: {
    backgroundColor: T.panel,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: T.line,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  readinessText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 16,
    color: T.text,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
  heroCard: {
    backgroundColor: T.panelHi,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: T.accent,
    overflow: 'hidden',
  },
  sessionTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 26,
    color: T.text,
    letterSpacing: -0.8,
    marginTop: 4,
    lineHeight: 28,
  },
  duration: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 18,
    color: T.text,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: T.bg,
    borderWidth: 1,
    borderColor: T.line,
    borderRadius: 3,
  },
  tagText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 10,
    color: T.textDim,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  statCell: {
    flex: 1,
    padding: 10,
    backgroundColor: T.panel,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: T.line,
  },
  statValue: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 22,
    color: T.text,
    letterSpacing: -0.5,
  },
  programRow: {
    padding: 14,
    backgroundColor: T.panel,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  programIcon: {
    width: 40,
    height: 40,
    backgroundColor: T.bg,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programName: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 14,
    color: T.text,
    letterSpacing: -0.2,
  },
  progressBg: {
    height: 2,
    backgroundColor: T.line,
    borderRadius: 1,
  },
  progressFill: {
    height: '100%',
    borderRadius: 1,
  },
  iconBtn: {
    width: 36,
    height: 36,
    backgroundColor: T.panel,
    borderWidth: 1,
    borderColor: T.line,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
