import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { T } from '../tokens';
import { Mono } from '../components/Mono';
import { Gauge } from '../components/Gauge';
import { HudButton } from '../components/HudButton';
import { RootStackParamList } from '../navigation/types';
import { WORKOUTS } from '../data/workouts';

type Props = NativeStackScreenProps<RootStackParamList, 'Exercise'>;

export function ExerciseScreen({ route, navigation }: Props) {
  const { workoutId, exerciseIdx } = route.params;
  const workout = WORKOUTS.find(w => w.id === workoutId) ?? WORKOUTS[0];
  const ex = workout.exercises[exerciseIdx] ?? workout.exercises[0];

  const [currentSet, setCurrentSet] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const [reps, setReps] = useState(typeof ex.reps === 'number' ? ex.reps : 8);
  const [weight, setWeight] = useState(typeof ex.load === 'number' ? ex.load : 0);
  const [pulse, setPulse] = useState(118);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setElapsed(e => e + 1);
      setPulse(p => Math.max(95, Math.min(168, p + (Math.random() * 6 - 2.5))));
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  // Pulse dot animation
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.4, duration: 750, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 750, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');
  const totalSets = typeof ex.sets === 'number' ? ex.sets : 4;
  const isLast = currentSet >= totalSets;

  const handleLogSet = () => {
    if (!isLast) {
      setCurrentSet(s => s + 1);
      setElapsed(0);
      navigation.navigate('Rest', {
        workoutId,
        exerciseIdx,
        setIdx: currentSet,
        totalSets,
      });
    } else {
      const nextIdx = exerciseIdx + 1;
      if (nextIdx < workout.exercises.length) {
        navigation.replace('Exercise', { workoutId, exerciseIdx: nextIdx });
      } else {
        navigation.replace('Summary', { workoutId });
      }
    }
  };

  return (
    <View style={s.container}>
      {/* Top bar */}
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.replace('Main')} activeOpacity={0.7}>
          <Mono size={10} color={T.textDim}>× EXIT</Mono>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Animated.View style={[s.liveDot, { transform: [{ scale: pulseAnim }] }]} />
          <Mono size={10} color={T.accent}>LIVE · SET {currentSet}/{totalSets}</Mono>
        </View>
        <Mono size={10}>EX {String(exerciseIdx + 1).padStart(2, '0')}/{String(workout.exercises.length).padStart(2, '0')}</Mono>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Exercise name */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <Mono size={9}>// CURRENT MOVEMENT</Mono>
          <Text style={s.exName}>
            {ex.name}<Text style={{ color: T.accent }}>.</Text>
          </Text>
        </View>

        {/* TUT Gauge */}
        <View style={{ alignItems: 'center', paddingVertical: 16 }}>
          <Gauge value={Math.min(1, elapsed / 45)} size={220} stroke={4}>
            <Mono size={9} style={{ marginBottom: 6 }}>TIME · UNDER · TENSION</Mono>
            <Text style={s.timer}>
              {mm}<Text style={{ color: T.accent }}>:</Text>{ss}
            </Text>
            <Mono size={9} color={running ? T.ok : T.warn} style={{ marginTop: 8 }}>
              {running ? '● CAPTURING' : '❚❚ PAUSED'}
            </Mono>
          </Gauge>
        </View>

        {/* Telemetry */}
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', gap: 6 }}>
          <TelemetryCell label="PULSE" value={String(Math.round(pulse))} unit="BPM" live pulseAnim={pulseAnim} />
          <TelemetryCell label="PWR" value="412" unit="W" />
          <TelemetryCell label="RPE" value="7.5" unit="/10" />
        </View>

        {/* Set log */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Mono size={9}>// SET LOG</Mono>
          <View style={s.setLog}>
            {Array.from({ length: totalSets }).map((_, i) => {
              const done = i < currentSet - 1;
              const active = i === currentSet - 1;
              return (
                <View
                  key={i}
                  style={[
                    s.setRow,
                    i < totalSets - 1 && { borderBottomWidth: 1, borderBottomColor: T.line },
                    active && { backgroundColor: 'rgba(255,106,26,0.06)' },
                  ]}
                >
                  <Mono size={11} color={active ? T.accent : done ? T.text : T.textMuted}>
                    #{i + 1}
                  </Mono>
                  <Text style={[s.setData, { color: done || active ? T.text : T.textMuted }]}>
                    {done ? `${ex.load}${typeof ex.load === 'number' ? ' kg' : ''}` : active ? `${weight} kg` : '— kg'}
                  </Text>
                  <Text style={[s.setData, { color: done || active ? T.text : T.textMuted }]}>
                    {done ? `${ex.reps} reps` : active ? `${reps} reps` : '— reps'}
                  </Text>
                  <View style={{ width: 14, alignItems: 'flex-end' }}>
                    {done && (
                      <Svg width={14} height={14} viewBox="0 0 24 24" stroke={T.ok} strokeWidth={3} fill="none">
                        <Path d="M4 12l6 6L20 6" />
                      </Svg>
                    )}
                    {active && <View style={s.activeDot} />}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Adjusters */}
        <View style={{ paddingHorizontal: 20, marginTop: 14, flexDirection: 'row', gap: 8 }}>
          <Adjuster label="WEIGHT" value={weight} unit="kg" step={2.5} onChange={setWeight} />
          <Adjuster label="REPS" value={reps} unit="" step={1} onChange={setReps} />
        </View>
        <View style={{ height: 8 }} />
      </ScrollView>

      {/* Bottom actions */}
      <View style={s.footer}>
        <HudButton variant="ghost" onPress={() => setRunning(r => !r)} style={{ flex: 1 }}>
          {running ? 'Pause' : 'Resume'}
        </HudButton>
        <HudButton onPress={handleLogSet} style={{ flex: 2 }}>
          {isLast ? 'Complete Exercise' : 'Log Set & Rest'} →
        </HudButton>
      </View>
    </View>
  );
}

function TelemetryCell({
  label, value, unit, live, pulseAnim,
}: {
  label: string; value: string; unit: string; live?: boolean; pulseAnim?: Animated.Value;
}) {
  return (
    <View style={ts.cell}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {live && pulseAnim && (
          <Animated.View style={[ts.liveDot, { transform: [{ scale: pulseAnim }] }]} />
        )}
        <Mono size={8}>{label}</Mono>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 4 }}>
        <Text style={ts.value}>{value}</Text>
        <Mono size={8}>{unit}</Mono>
      </View>
    </View>
  );
}

function Adjuster({
  label, value, unit, step, onChange,
}: {
  label: string; value: number; unit: string; step: number; onChange: (v: number) => void;
}) {
  return (
    <View style={adj.wrap}>
      <Mono size={8}>{label}</Mono>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
        <TouchableOpacity
          onPress={() => onChange(Math.max(0, value - step))}
          activeOpacity={0.7}
          style={adj.btn}
        >
          <Text style={adj.btnText}>−</Text>
        </TouchableOpacity>
        <Text style={adj.val}>
          {value}<Text style={{ color: T.textDim, fontSize: 11 }}>{unit}</Text>
        </Text>
        <TouchableOpacity onPress={() => onChange(value + step)} activeOpacity={0.7} style={adj.btn}>
          <Text style={adj.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: T.line,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: T.accent },
  exName: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 26,
    color: T.text,
    letterSpacing: -0.7,
    marginTop: 4,
    lineHeight: 28,
  },
  timer: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 56,
    color: T.text,
    letterSpacing: -2,
    lineHeight: 60,
  },
  setLog: {
    marginTop: 8,
    backgroundColor: T.panel,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: T.line,
    overflow: 'hidden',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  setData: {
    flex: 1,
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 13,
  },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: T.accent },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: T.line,
    flexDirection: 'row',
    gap: 8,
  },
});

const ts = StyleSheet.create({
  cell: {
    flex: 1,
    padding: 10,
    backgroundColor: T.panel,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: T.line,
  },
  liveDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: T.accent },
  value: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: T.text,
  },
});

const adj = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 10,
    backgroundColor: T.panel,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: T.line,
  },
  btn: {
    width: 30,
    height: 30,
    backgroundColor: T.bg,
    borderWidth: 1,
    borderColor: T.line,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 18,
    color: T.accent,
  },
  val: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 22,
    color: T.text,
  },
});
