import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { T } from '../tokens';
import { Mono } from '../components/Mono';
import { Segment } from '../components/Segment';
import { Placeholder } from '../components/Placeholder';
import { TabParamList, RootStackParamList } from '../navigation/types';
import { WORKOUTS, WorkoutType } from '../data/workouts';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Workouts'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

const FILTERS = ['All', 'Strength', 'Cardio', 'Mobility'];

export function WorkoutsScreen({ navigation }: Props) {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? WORKOUTS
    : WORKOUTS.filter(w => w.type === (filter as WorkoutType));

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Mono size={9}>// LIBRARY</Mono>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <Text style={s.title}>Workouts</Text>
          <TouchableOpacity style={s.iconBtn} activeOpacity={0.7}>
            <Svg width={14} height={14} viewBox="0 0 24 24" stroke={T.text} strokeWidth={2.5} fill="none">
              <Path d="M12 5v14M5 12h14" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
        <Segment options={FILTERS} value={filter} onChange={setFilter} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.list} showsVerticalScrollIndicator={false}>
        {filtered.map((w) => (
          <TouchableOpacity
            key={w.id}
            onPress={() => navigation.navigate('WorkoutDetail', { workoutId: w.id })}
            activeOpacity={0.8}
            style={[s.card, { borderColor: w.active ? T.accent : T.line }]}
          >
            {w.active && (
              <View style={s.todayBadge}>
                <Text style={s.todayText}>TODAY</Text>
              </View>
            )}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Placeholder
                height={56}
                label={w.type.slice(0, 3).toUpperCase()}
                style={{ width: 56, flexShrink: 0, borderRadius: 3 }}
              />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Mono size={8}>{w.type.toUpperCase()} · {w.load.toUpperCase()}</Mono>
                <Text style={s.workoutName}>{w.name}</Text>
                <View style={{ flexDirection: 'row', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                  {w.tags.map(t => (
                    <View key={t} style={s.tag}>
                      <Text style={s.tagText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.duration}>
                  {w.durationMin}<Text style={{ color: T.textDim, fontSize: 10 }}>min</Text>
                </Text>
                <Mono size={8}>{w.exercises.length} EX</Mono>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 8 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    color: T.text,
    letterSpacing: -0.8,
  },
  list: { paddingHorizontal: 20, gap: 10 },
  card: {
    padding: 14,
    backgroundColor: T.panel,
    borderRadius: 4,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  todayBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: T.accent,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  todayText: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 9,
    letterSpacing: 1.5,
    color: T.bg,
  },
  workoutName: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 17,
    color: T.text,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: T.bg,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: T.line,
  },
  tagText: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 9,
    color: T.textDim,
  },
  duration: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 16,
    color: T.text,
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
