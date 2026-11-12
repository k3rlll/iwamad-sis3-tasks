import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TasksProvider } from '../src/context/TasksContext';
import { colors } from '../src/theme';

export const unstable_settings = { initialRouteName: 'index' };

export default function RootLayout() {
  return (
    <TasksProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerTransparent: false, headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.ink, headerShadowVisible: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" options={{ title: 'My tasks' }} />
        <Stack.Screen name="tasks/new" options={{ title: 'New task', presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="tasks/[id]" options={{ title: 'Task' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Page not found' }} />
      </Stack>
    </TasksProvider>
  );
}
