import { FlatList, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '../src/context/TasksContext';
import ActionButton from '../src/components/ActionButton';
import TaskRow from '../src/components/TaskRow';
import { layout } from '../src/theme';

export default function TasksScreen() {
  const { tasks } = useTasks();
  const insets = useSafeAreaInsets();
  return (
    <View style={layout.screen}>
      <FlatList
        data={tasks}
        keyExtractor={(task) => String(task.id)}
        contentContainerStyle={[layout.content, { paddingBottom: Math.max(insets.bottom, 24) }]}
        ListHeaderComponent={<View style={{ gap: 14, paddingBottom: 4 }}>
          <Text style={layout.eyebrow}>CAMPUS / PERSONAL</Text>
          <Text style={layout.title}>Make room for{ '\n' }what matters.</Text>
          <Text style={layout.body}>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} on your list. One step at a time.</Text>
          <ActionButton label="+ New task" onPress={() => router.push('/tasks/new')} />
          <Text style={[layout.body, { fontSize: 13 }]}>Tap to view. Long-press a task to delete it.</Text>
        </View>}
        renderItem={({ item, index }) => <TaskRow task={item} index={index} />}
        ListEmptyComponent={<View style={layout.card}><Text style={[layout.title, { fontSize: 22 }]}>A little breathing room.</Text><Text style={layout.body}>No tasks yet. Add a task when you are ready.</Text></View>}
      />
    </View>
  );
}
