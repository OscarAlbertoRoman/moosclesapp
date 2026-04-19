import { Workout } from '../data/workouts';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  WorkoutDetail: { workoutId: string };
  Exercise: { workoutId: string; exerciseIdx: number };
  Rest: { workoutId: string; exerciseIdx: number; setIdx: number; totalSets: number };
  Summary: { workoutId: string };
};

export type TabParamList = {
  Home: undefined;
  Workouts: undefined;
  Stats: undefined;
  Profile: undefined;
};
