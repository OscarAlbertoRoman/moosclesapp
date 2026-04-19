import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path, Circle } from 'react-native-svg';
import { T } from '../tokens';
import { Mono } from '../components/Mono';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { WorkoutsScreen } from '../screens/WorkoutsScreen';
import { WorkoutDetailScreen } from '../screens/WorkoutDetailScreen';
import { ExerciseScreen } from '../screens/ExerciseScreen';
import { RestScreen } from '../screens/RestScreen';
import { SummaryScreen } from '../screens/SummaryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ id, focused }: { id: string; focused: boolean }) {
  const color = focused ? T.accent : T.textMuted;
  const icons: Record<string, React.ReactNode> = {
    Home: (
      <Svg width={20} height={20} viewBox="0 0 24 24" stroke={color} strokeWidth={2} fill="none">
        <Path d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2V10z" />
      </Svg>
    ),
    Workouts: (
      <Svg width={20} height={20} viewBox="0 0 24 24" stroke={color} strokeWidth={2} fill="none">
        <Path d="M6 4v16M18 4v16M2 8v8M22 8v8M6 12h12" />
      </Svg>
    ),
    Stats: (
      <Svg width={20} height={20} viewBox="0 0 24 24" stroke={color} strokeWidth={2} fill="none">
        <Path d="M3 20V10M10 20V4M17 20v-7" />
      </Svg>
    ),
    Profile: (
      <Svg width={20} height={20} viewBox="0 0 24 24" stroke={color} strokeWidth={2} fill="none">
        <Circle cx="12" cy="8" r="4" />
        <Path d="M4 21a8 8 0 0116 0" />
      </Svg>
    ),
  };

  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <View style={{ position: 'relative' }}>
        {icons[id]}
        {focused && (
          <View style={{
            position: 'absolute',
            bottom: -6,
            left: '50%',
            marginLeft: -2,
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: T.accent,
          }} />
        )}
      </View>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: T.bg,
          borderTopColor: T.line,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabel: ({ focused }) => (
          <Mono size={9} color={focused ? T.accent : T.textMuted}>{route.name}</Mono>
        ),
        tabBarIcon: ({ focused }) => <TabIcon id={route.name} focused={focused} />,
        tabBarActiveTintColor: T.accent,
        tabBarInactiveTintColor: T.textMuted,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
      <Tab.Screen name="Stats" component={ProfileScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
        <Stack.Screen
          name="Exercise"
          component={ExerciseScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="Rest"
          component={RestScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
