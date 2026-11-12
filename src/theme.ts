import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F4F5EF',
  surface: '#FFFFFF',
  ink: '#20352C',
  muted: '#59695F',
  accent: '#275D45',
  pressed: '#DCE9DE',
  line: '#D9DED5',
  danger: '#A02B2B',
};

export const layout = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: '100%', maxWidth: 680, alignSelf: 'center', padding: 24, gap: 20 },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  title: { color: colors.ink, fontSize: 32, fontWeight: '700', lineHeight: 39 },
  body: { color: colors.muted, fontSize: 16, lineHeight: 25 },
  card: { padding: 22, gap: 12, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  centered: { flex: 1, justifyContent: 'center' },
});
