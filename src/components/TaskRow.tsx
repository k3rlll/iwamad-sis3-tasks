import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import type { Task } from '../data/tasks';
import { useTasks } from '../context/TasksContext';
import ActionButton from './ActionButton';
import { colors, layout } from '../theme';

type Props = { task: Task; index: number };

export default function TaskRow({ task, index }: Props) {
  const [confirming, setConfirming] = useState(false);
  const { deleteTask } = useTasks();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, { toValue: 1, duration: 300, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [progress]);

  return (
    <Animated.View style={{ opacity: progress, transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }] }}>
      {confirming ? (
        <View style={layout.card} accessibilityLiveRegion="polite">
          <Text style={styles.title}>Delete “{task.title}”?</Text>
          <Text style={layout.body}>This removes the task from your list.</Text>
          <ActionButton label="Delete task" variant="danger" onPress={() => deleteTask(task.id)} />
          <ActionButton label="Keep task" variant="secondary" onPress={() => setConfirming(false)} />
        </View>
      ) : (
        <Pressable accessibilityRole="button" accessibilityLabel={`Open ${task.title}`} accessibilityHint="Long-press to delete this task" onPress={() => router.push(`/tasks/${task.id}`)} onLongPress={() => setConfirming(true)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
          <View style={styles.number}><Text style={styles.numberText}>{String(index + 1).padStart(2, '0')}</Text></View>
          <View style={{ flex: 1, gap: 7 }}><Text style={styles.title}>{task.title}</Text><Text style={styles.notes} numberOfLines={2}>{task.notes || 'No notes. Tap to see this task.'}</Text></View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 100, padding: 18, gap: 14, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.line },
  pressed: { backgroundColor: colors.pressed, borderColor: colors.accent },
  number: { width: 34, height: 34, borderRadius: 12, backgroundColor: '#ECF1E8', alignItems: 'center', justifyContent: 'center' },
  numberText: { fontSize: 12, color: colors.accent, fontWeight: '700' },
  title: { color: colors.ink, fontSize: 17, fontWeight: '600', lineHeight: 24 },
  notes: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  arrow: { color: colors.accent, fontSize: 27 },
});
