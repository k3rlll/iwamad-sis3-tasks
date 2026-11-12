import { ScrollView, Text, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '../../src/context/TasksContext';
import ActionButton from '../../src/components/ActionButton';
import { layout } from '../../src/theme';

export default function TaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, deleteTask } = useTasks();
  const insets = useSafeAreaInsets();
  const task = tasks.find((item) => item.id === Number(id));

  if (!task) {
    return (
      <View style={[layout.screen, layout.centered]}>
        <Stack.Screen options={{ title: 'Task not found' }} />
        <View style={layout.content}>
          <Text style={layout.eyebrow}>TASK / MISSING</Text>
          <Text style={layout.title}>Task not found</Text>
          <Text style={layout.body}>No task with id {id}. It may have been deleted.</Text>
          <ActionButton label="Back to tasks" onPress={() => router.dismissTo('/')} />
        </View>
      </View>
    );
  }

  function removeTask() {
    deleteTask(Number(id));
    router.dismissTo('/');
  }

  return (
    <ScrollView style={layout.screen} contentContainerStyle={[layout.content, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      <Stack.Screen options={{ title: task.title }} />
      <Text style={layout.eyebrow}>TASK / {String(task.id).padStart(2, '0')}</Text>
      <Text style={layout.title}>{task.title}</Text>
      <View style={layout.card}>
        <Text style={[layout.eyebrow, { letterSpacing: 1 }]}>NOTES</Text>
        <Text style={layout.body}>{task.notes || 'No notes for this task.'}</Text>
      </View>
      <ActionButton label="Back to tasks" variant="secondary" onPress={() => router.dismissTo('/')} />
      <ActionButton label="Delete task" variant="danger" onPress={removeTask} />
      <Text style={[layout.body, { fontSize: 13 }]}>Tasks stay here while the app is open. Restarting restores your starter list.</Text>
    </ScrollView>
  );
}
