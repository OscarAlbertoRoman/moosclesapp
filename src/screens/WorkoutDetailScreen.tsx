import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { T } from '../tokens';
import { Mono } from '../components/Mono';
import { HudButton } from '../components/HudButton';
import { HudDivider } from '../components/HudDivider';
import { Placeholder } from '../components/Placeholder';
import { RootStackParamList } from '../navigation/types';
import { WORKOUTS } from '../data/workouts';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutDetail'>;

export function WorkoutDetailScreen({ route, navigation }: Props) {
  const workout = WORKOUTS.find(w => w.id === route.params.workoutId) ?? WORKOUTS[0];

  return (
    <View style={s.container}>
      {/* Hero */}
      <View style={{ height: 200, position: 'relative' }}>
        <Placeholder
          height={200}
          label={`SESSION · ${workout.name.toUpperCase()}`}
          accent
          style={{ borderRadius: 0 }}
        />
        <View style={s.heroOverlay} />

        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn} activeOpacity={0.8}>
          <Svg width={14} height={14} viewBox="0 0 24 24" stroke={T.text} strokeWidth={2.5} fill="none">
            <Path d="M15 18l-6-6 6-6" />
          </Svg>
        </TouchableOpacity>

        {/* Title overlay */}
        <View style={s.heroTitle}>
          <Mono size={10} color={T.accent}>PHASE 02 · HYPERTROPHY · DAY 11/24</Mono>
          <Text style={s.heroName}>
            {workout.name}<Text style={{ color: T.accent }}>.</Text>
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Meta strip */}
        <View style={s.metaGrid}>
          {[
            ['TIME', `${workout.durationMin}'`],
            ['EX', String(workout.exercises.length)],
            ['SETS', '24'],
            ['KG', '6.3K'],
          ].map(([l, v]) => (
            <View key={l} style={s.metaCell}>
              <Text style={s.metaValue}>{v}</Text>
              <Mono size={8}>{l}</Mono>
            </View>
          ))}
        </View>

        {/* Target chips */}
        <View style={{ marginTop: 14 }}>
          <Mono size={9}>// TARGETS</Mono>
          <View style={{ flexDirection: 'row', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {['Chest', 'Anterior Delt', 'Triceps', 'Core'].map(t => (
              <View key={t} style={s.chip}>
                <Text style={s.chipText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        <HudDivider label="Exercise stack" marginVertical={16} />

        {/* Exercise list */}
        <View style={{ gap: 6 }}>
          {workout.exercises.map((ex, i) => (
            <View key={ex.id} style={s.exRow}>
              <View style={[s.exNum, { borderColor: ex.tag === 'primary' ? T.accent : T.line }]}>
                <Text style={[s.exNumText, { color: ex.tag === 'primary' ? T.accent : T.textDim }]}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.exName}>{ex.name}</Text>
                <Mono size={9} style={{ marginTop: 2 }}>
                  {ex.sets} × {ex.reps} · rest {formatRest(ex.restSeconds)}
                </Mono>
              </View>
              <Text style={s.exLoad}>{ex.load}{typeof ex.load === 'number' ? ' kg' : ''}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={s.footer}>
        <HudButton
          onPress={() => navigation.navigate('Exercise', { workoutId: workout.id, exerciseIdx: 0 })}
          style={{ width: '100%' }}
        >
          ▶  Initiate Session
        </HudButton>
      </View>
    </View>
  );
}

function formatRest(seconds: number): string {
  if (seconds === 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(11,13,15,0.5)',
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 14,
    width: 36,
    height: 36,
    backgroundColor: 'rgba(11,13,15,0.7)',
    borderWidth: 1,
    borderColor: T.line,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    position: 'absolute',
    bottom: 14,
    left: 20,
    right: 20,
  },
  heroName: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 34,
    color: T.text,
    letterSpacing: -1,
    marginTop: 4,
    lineHeight: 36,
  },
  scroll: { paddingHorizontal: 20, paddingBottom: 16 },
  metaGrid: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  metaCell: {
    flex: 1,
    padding: 8,
    backgroundColor: T.panel,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: T.line,
    alignItems: 'center',
  },
  metaValue: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 14,
    color: T.text,
    marginBottom: 2,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: T.accent,
    borderRadius: 2,
  },
  chipText: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: T.accent,
  },
  exRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: T.panel,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: T.line,
  },
  exNum: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
  },
  exNumText: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
  },
  exName: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 14,
    color: T.text,
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  exLoad: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    color: T.text,
    textAlign: 'right',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: T.line,
    backgroundColor: T.bg,
  },
});
