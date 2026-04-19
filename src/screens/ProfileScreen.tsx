import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { T } from '../tokens';
import { Mono } from '../components/Mono';
import { MoosclesMark } from '../components/Logo';

const METRICS = [
  { label: 'TOTAL VOL', value: '128.4K', unit: 'kg', delta: '+8.2%' },
  { label: 'SESSIONS', value: '17', unit: '', delta: '+3' },
  { label: 'AVG RPE', value: '7.8', unit: '/10', delta: '+0.4' },
  { label: 'RECOVERY', value: '86', unit: '%', delta: '+2%' },
];

const PRS = [
  { name: 'Bench Press', w: '82 kg', r: '× 6', pr: true },
  { name: 'Back Squat', w: '120 kg', r: '× 5', pr: false },
  { name: 'Deadlift', w: '150 kg', r: '× 3', pr: false },
  { name: 'OHP', w: '52 kg', r: '× 5', pr: false },
];

export function ProfileScreen() {
  const heatmap = useMemo(() => {
    return Array.from({ length: 84 }, () => Math.random());
  }, []);

  return (
    <View style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <Mono size={9}>// OPERATOR</Mono>
          <TouchableOpacity style={s.iconBtn} activeOpacity={0.7}>
            <Svg width={14} height={14} viewBox="0 0 24 24" stroke={T.text} strokeWidth={2} fill="none">
              <Circle cx="12" cy="12" r="3" />
              <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 9a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9z" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Profile block */}
        <View style={s.profileRow}>
          <View style={s.avatar}>
            <MoosclesMark size={44} color={T.accent} />
            <View style={s.levelBadge}>
              <Mono size={9} color={T.accent}>LVL 14</Mono>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>Athlete 09</Text>
            <Text style={s.email}>ath-09@mooscles.io · CET</Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
              {['HYPERTROPHY', 'INTERMEDIATE'].map(t => (
                <View key={t} style={s.badge}>
                  <Text style={s.badgeText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Metrics 2×2 */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Mono size={9}>// METRICS · 30D</Mono>
          <View style={s.metricsGrid}>
            {METRICS.map(m => (
              <MetricBlock key={m.label} {...m} />
            ))}
          </View>
        </View>

        {/* Personal records */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Mono size={9}>// PERSONAL_RECORDS</Mono>
            <Mono size={9} color={T.accent}>VIEW ALL ▸</Mono>
          </View>
          <View style={s.prTable}>
            {PRS.map(({ name, w, r, pr }, i) => (
              <View key={name} style={[s.prRow, i < PRS.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.line }]}>
                <Text style={s.prName}>{name}</Text>
                <Text style={s.prWeight}>{w}</Text>
                <Mono size={10}>{r}</Mono>
                {pr ? (
                  <View style={s.prBadge}><Text style={s.prBadgeText}>NEW</Text></View>
                ) : <View style={{ width: 24 }} />}
              </View>
            ))}
          </View>
        </View>

        {/* Activity heatmap */}
        <View style={{ paddingHorizontal: 20, marginTop: 16, paddingBottom: 20 }}>
          <Mono size={9}>// ACTIVITY · 12W</Mono>
          <View style={s.heatmap}>
            {heatmap.map((v, i) => {
              const bg = v > 0.75 ? T.accent
                : v > 0.5 ? 'rgba(255,106,26,0.55)'
                : v > 0.28 ? 'rgba(255,106,26,0.25)'
                : T.line;
              return <View key={i} style={[s.heatCell, { backgroundColor: bg }]} />;
            })}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            <Mono size={8}>FEB</Mono>
            <Mono size={8}>APR</Mono>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function MetricBlock({ label, value, unit, delta }: { label: string; value: string; unit: string; delta: string }) {
  const positive = delta.startsWith('+');
  return (
    <View style={mb.cell}>
      <Mono size={8}>{label}</Mono>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 4 }}>
        <Text style={mb.value}>{value}</Text>
        <Mono size={9}>{unit}</Mono>
      </View>
      <Mono size={9} color={positive ? T.ok : T.warn} style={{ marginTop: 4 }}>{delta}</Mono>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  profileRow: {
    paddingHorizontal: 20,
    paddingTop: 12,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    backgroundColor: T.panel,
    borderWidth: 1,
    borderColor: T.accent,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: T.bg,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: T.accent,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 22,
    color: T.text,
    letterSpacing: -0.6,
  },
  email: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 11,
    color: T.textDim,
    marginTop: 2,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: T.accent,
    borderRadius: 2,
  },
  badgeText: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 9,
    color: T.accent,
    letterSpacing: 1,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  prTable: {
    marginTop: 8,
    backgroundColor: T.panel,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: T.line,
    overflow: 'hidden',
  },
  prRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  prName: {
    flex: 1,
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 14,
    color: T.text,
  },
  prWeight: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 13,
    color: T.text,
  },
  prBadge: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: T.accent,
    borderRadius: 2,
  },
  prBadgeText: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 8,
    color: T.accent,
  },
  heatmap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginTop: 10,
  },
  heatCell: {
    width: '7%',
    aspectRatio: 1,
    borderRadius: 1,
  },
});

const mb = StyleSheet.create({
  cell: {
    width: '48.5%',
    padding: 12,
    backgroundColor: T.panel,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: T.line,
  },
  value: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 26,
    color: T.text,
    letterSpacing: -0.6,
    lineHeight: 28,
  },
});
