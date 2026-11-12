import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

type Props = { label: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'danger' };

export default function ActionButton({ label, onPress, variant = 'primary' }: Props) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, styles[variant], pressed && styles.pressed]}>
      <Text style={[styles.text, variant === 'secondary' && styles.darkText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 50, paddingVertical: 14, paddingHorizontal: 20, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: colors.accent },
  secondary: { backgroundColor: '#E4E9DF' },
  danger: { backgroundColor: colors.danger },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  text: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  darkText: { color: colors.ink },
});
