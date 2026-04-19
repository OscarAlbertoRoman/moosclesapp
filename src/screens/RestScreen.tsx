import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Circle } from 'react-native-svg';
import { T } from '../tokens';
import { Mono } from '../components/Mono';
import { Gauge } from '../components/Gauge';
import { HudButton } from '../components/HudButton';
import { RootStackParamList } from '../navigation/types';
import { WORKOUTS } from '../data/workouts';

type Props = NativeStackScreenProps<RootStackParamList, 'Rest'>;

export function RestScreen({ route, navigation }: Props) {
  const { workoutId, exerciseIdx, setIdx, totalSets } = route.params;
  const workout = WORKOUTS.find(w => w.id === workoutId) ?? WORKOUTS[0];
  const ex = workout.exercises[exerciseIdx] ?? workout.exercises[0];
  const duration = typeof ex.restSeconds === 'number' && ex.restSeconds > 0 ? ex.restSeconds : 90;

  const [left, setLeft] = useState(duration);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || left <= 0) return;
    const timer = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(timer);
  }, [left, paused]);

  useEffect(() => {
    if (left <= 0) {
      navigation.replace('Exercise', { workoutId, exerciseIdx });
    }
  }, [left]);

  const pct = 1 - left / duration;
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  const nextEx = workout.exercises[exerciseIdx] ?? workout.exercises[0];

  return (
    <View style={s.container}>
      {/* Decorative rings */}
      <View style={s.ringsWrap} pointerEvents="none">
        {[1, 1.3, 1.65].map((scale, i) => (
          <View
            key={i}
            style={[s.ring, {
              width: 260 * scale,
              height: 260 * scale,
              borderRadius: 130 * scale,
              opacity: 0.18 - i * 0.05,
            }]}
          />
        ))}
      </View>

      {/* Header */}
      <View style={s.header}>
        <Mono size={9}>// RECOVERY_NODE</Mono>
        <Mono size={9} color={T.accent}>SET {setIdx}/{totalSets} COMPLETE</Mono>
      </View>

      {/* Gauge */}
      <View style={s.center}>
        <Mono size={10} style={{ marginBottom: 8 }}>REST</Mono>
        <Gauge value={pct} size={260} stroke={3}>
          <Text style={s.timer}>
            {mm}<Text style={{ color: T.accent }}>:</Text>{ss}
          </Text>
          <Mono size={10} style={{ marginTop: 10 }}>
            {paused ? '❚❚ PAUSED' : 'BREATHE · RESET'}
          </Mono>
        </Gauge>

        {/* Next up */}
        <View style={{ marginTop: 28, alignItems: 'center', maxWidth: 260 }}>
          <Mono size={9} color={T.accent}>NEXT</Mono>
          <Text style={s.nextName}>
            {nextEx.name} · Set {setIdx + 1}
          </Text>
          <Text style={s.nextLoad}>
            {nextEx.load}{typeof nextEx.load === 'number' ? ' kg' : ''} × {nextEx.reps} reps
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={s.footer}>
        <HudButton variant="ghost" onPress={() => setLeft(l => l + 15)} style={{ flex: 1 }}>+15s</HudButton>
        <HudButton variant="dark" onPress={() => setPaused(p => !p)} style={{ flex: 1 }}>
          {paused ? 'Resume' : 'Pause'}
        </HudButton>
        <HudButton
          onPress={() => navigation.replace('Exercise', { workoutId, exerciseIdx })}
          style={{ flex: 1.5 }}
        >
          Skip ▸
        </HudButton>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.bg,
    position: 'relative',
  },
  ringsWrap: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: T.accent,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  timer: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 72,
    color: T.text,
    letterSpacing: -3,
    lineHeight: 76,
  },
  nextName: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: T.text,
    letterSpacing: -0.5,
    marginTop: 4,
    textAlign: 'center',
  },
  nextLoad: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 12,
    color: T.textDim,
    marginTop: 4,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    gap: 8,
    zIndex: 2,
  },
});
