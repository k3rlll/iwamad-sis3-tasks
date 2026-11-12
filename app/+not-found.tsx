import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { colors, layout } from '../src/theme';

export default function NotFoundScreen() {
  return (
    <View style={[layout.screen, layout.centered]}>
      <View style={layout.content}>
        <Text style={layout.eyebrow}>404 / WRONG TURN</Text>
        <Text style={layout.title}>Page not found</Text>
        <Text style={layout.body}>This page does not exist. Your task list is a good place to start again.</Text>
        <Link href="/" asChild>
          <Pressable accessibilityRole="link" style={{ minHeight: 50, borderRadius: 14, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
            {({ pressed }) => <View style={{ minHeight: 50, width: '100%', alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.6 : 1 }}><Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Back to tasks</Text></View>}
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
