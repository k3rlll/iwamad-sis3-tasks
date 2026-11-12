import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View, type TextInputInstance } from 'react-native';
import { router } from 'expo-router';
import { useHeaderHeight } from 'expo-router/react-navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '../../src/context/TasksContext';
import ActionButton from '../../src/components/ActionButton';
import { colors, layout } from '../../src/theme';

export default function NewTaskScreen() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const notesInput = useRef<TextInputInstance>(null);
  const { addTask } = useTasks();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  function save() {
    if (!addTask(title, notes)) {
      setError('Please enter a task title.');
      return;
    }
    router.dismissTo('/');
  }

  return (
    <KeyboardAvoidingView style={layout.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={headerHeight}>
      <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" contentContainerStyle={[layout.content, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <Text style={layout.eyebrow}>ONE SMALL STEP</Text>
        <Text style={layout.title}>What is next?</Text>
        <Text style={layout.body}>Give your task a clear title. A few notes can help you get started.</Text>
        <View style={{ gap: 10 }}>
          <Text style={styles.label}>Title</Text>
          <TextInput accessibilityLabel="Task title" value={title} onChangeText={(text) => { setTitle(text); setError(''); }} placeholder="e.g. Prepare the workshop demo" placeholderTextColor={colors.muted} style={[styles.input, error ? styles.invalid : undefined]} maxLength={100} returnKeyType="next" onSubmitEditing={() => notesInput.current?.focus()} submitBehavior="submit" autoFocus />
          {error ? <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
        </View>
        <View style={{ gap: 10 }}>
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput ref={notesInput} accessibilityLabel="Task notes" value={notes} onChangeText={setNotes} placeholder="A reminder for your future self" placeholderTextColor={colors.muted} style={[styles.input, styles.notes]} multiline maxLength={1000} returnKeyType="done" submitBehavior="submit" onSubmitEditing={save} textAlignVertical="top" />
        </View>
        <ActionButton label="Save task" onPress={save} />
        <ActionButton label="Cancel" variant="secondary" onPress={() => router.dismissTo('/')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 15, fontWeight: '600', color: colors.ink },
  input: { minHeight: 54, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, borderRadius: 14, padding: 16, fontSize: 16, color: colors.ink },
  notes: { minHeight: 130, lineHeight: 24 },
  invalid: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: 14, lineHeight: 21 },
});
