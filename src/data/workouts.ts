export type WorkoutType = 'Strength' | 'Cardio' | 'Mobility';
export type LoadLevel = 'low' | 'moderate' | 'heavy' | 'high';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number | string;
  load: number | string;
  restSeconds: number;
  tag?: 'primary' | 'finisher';
}

export interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  load: LoadLevel;
  durationMin: number;
  exercises: Exercise[];
  tags: string[];
  active?: boolean;
}

export const WORKOUTS: Workout[] = [
  {
    id: 'w1',
    name: 'Upper Push',
    type: 'Strength',
    load: 'heavy',
    durationMin: 48,
    active: true,
    tags: ['chest', 'shoulder', 'tri'],
    exercises: [
      { id: 'e1', name: 'Barbell Bench Press', sets: 4, reps: 6, load: 82, restSeconds: 150, tag: 'primary' },
      { id: 'e2', name: 'Incline DB Press', sets: 3, reps: 8, load: 28, restSeconds: 120, tag: 'primary' },
      { id: 'e3', name: 'Seated Shoulder Press', sets: 4, reps: 8, load: 22, restSeconds: 120 },
      { id: 'e4', name: 'Cable Fly', sets: 3, reps: 12, load: 18, restSeconds: 90 },
      { id: 'e5', name: 'Lateral Raise', sets: 3, reps: 12, load: 10, restSeconds: 60 },
      { id: 'e6', name: 'Rope Triceps Ext.', sets: 3, reps: 12, load: 24, restSeconds: 60 },
      { id: 'e7', name: 'Dips', sets: 3, reps: 'AMRAP', load: 'BW', restSeconds: 90 },
      { id: 'e8', name: 'Plank Hold', sets: 3, reps: '60s', load: '—', restSeconds: 45, tag: 'finisher' },
    ],
  },
  {
    id: 'w2',
    name: 'Lower Hinge',
    type: 'Strength',
    load: 'heavy',
    durationMin: 55,
    tags: ['posterior', 'glute'],
    exercises: [
      { id: 'e9', name: 'Romanian Deadlift', sets: 4, reps: 6, load: 110, restSeconds: 180, tag: 'primary' },
      { id: 'e10', name: 'Hip Thrust', sets: 4, reps: 10, load: 80, restSeconds: 120, tag: 'primary' },
      { id: 'e11', name: 'Bulgarian Split Squat', sets: 3, reps: 8, load: 30, restSeconds: 120 },
      { id: 'e12', name: 'Leg Curl', sets: 3, reps: 12, load: 45, restSeconds: 90 },
      { id: 'e13', name: 'Calf Raise', sets: 4, reps: 15, load: 60, restSeconds: 60 },
      { id: 'e14', name: 'Nordic Curl', sets: 3, reps: 5, load: 'BW', restSeconds: 120 },
      { id: 'e15', name: 'GHD Back Ext.', sets: 3, reps: 12, load: 'BW', restSeconds: 60, tag: 'finisher' },
    ],
  },
  {
    id: 'w3',
    name: 'Pull · Row',
    type: 'Strength',
    load: 'moderate',
    durationMin: 42,
    tags: ['back', 'bi'],
    exercises: [
      { id: 'e16', name: 'Weighted Pull-Up', sets: 4, reps: 5, load: 20, restSeconds: 150, tag: 'primary' },
      { id: 'e17', name: 'Barbell Row', sets: 4, reps: 6, load: 75, restSeconds: 150, tag: 'primary' },
      { id: 'e18', name: 'Seated Cable Row', sets: 3, reps: 10, load: 60, restSeconds: 90 },
      { id: 'e19', name: 'Face Pull', sets: 3, reps: 15, load: 20, restSeconds: 60 },
      { id: 'e20', name: 'EZ Bar Curl', sets: 3, reps: 10, load: 32, restSeconds: 60 },
      { id: 'e21', name: 'Hammer Curl', sets: 3, reps: 12, load: 14, restSeconds: 45 },
      { id: 'e22', name: 'Band Pull-Apart', sets: 3, reps: 20, load: 'BW', restSeconds: 45, tag: 'finisher' },
    ],
  },
  {
    id: 'w4',
    name: 'Metabolic Burn',
    type: 'Cardio',
    load: 'high',
    durationMin: 22,
    tags: ['full body'],
    exercises: [
      { id: 'e23', name: 'Kettlebell Swing', sets: 4, reps: 20, load: 24, restSeconds: 60, tag: 'primary' },
      { id: 'e24', name: 'Box Jump', sets: 4, reps: 8, load: 'BW', restSeconds: 60 },
      { id: 'e25', name: 'Battle Ropes', sets: 4, reps: '30s', load: 'BW', restSeconds: 45 },
      { id: 'e26', name: 'Burpee', sets: 3, reps: 10, load: 'BW', restSeconds: 60 },
      { id: 'e27', name: 'Sled Push', sets: 3, reps: '20m', load: 60, restSeconds: 90 },
      { id: 'e28', name: 'Jump Rope', sets: 3, reps: '60s', load: 'BW', restSeconds: 30, tag: 'finisher' },
    ],
  },
  {
    id: 'w5',
    name: 'Zone-2 Base',
    type: 'Cardio',
    load: 'low',
    durationMin: 60,
    tags: ['aerobic'],
    exercises: [
      { id: 'e29', name: 'Steady State Run', sets: 1, reps: '60min', load: 'BW', restSeconds: 0 },
    ],
  },
  {
    id: 'w6',
    name: 'Mobility Flow',
    type: 'Mobility',
    load: 'low',
    durationMin: 12,
    tags: ['recovery'],
    exercises: [
      { id: 'e30', name: 'Hip 90/90 Stretch', sets: 2, reps: '60s', load: 'BW', restSeconds: 30 },
      { id: 'e31', name: 'Thoracic Rotation', sets: 2, reps: '30s', load: 'BW', restSeconds: 20 },
      { id: 'e32', name: 'World\'s Greatest Stretch', sets: 2, reps: '45s', load: 'BW', restSeconds: 20 },
      { id: 'e33', name: 'Pigeon Pose', sets: 2, reps: '90s', load: 'BW', restSeconds: 30 },
      { id: 'e34', name: 'Ankle CARs', sets: 2, reps: 10, load: 'BW', restSeconds: 15 },
      { id: 'e35', name: 'Shoulder CARs', sets: 2, reps: 8, load: 'BW', restSeconds: 15 },
      { id: 'e36', name: 'Cat-Cow Flow', sets: 2, reps: '30s', load: 'BW', restSeconds: 15 },
      { id: 'e37', name: 'Child\'s Pose', sets: 2, reps: '60s', load: 'BW', restSeconds: 15 },
      { id: 'e38', name: 'Leg Swing', sets: 2, reps: 15, load: 'BW', restSeconds: 10, tag: 'finisher' },
    ],
  },
];
