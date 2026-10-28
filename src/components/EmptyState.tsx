import {StyleSheet, Text, View} from 'react-native';
import {colors, fontSize, spacing} from '../theme';

type EmptyStateProps = {
  message: string;
};

export default function EmptyState({message}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  message: {
    color: colors.textSecondary,
    fontSize: fontSize.body,
    textAlign: 'center',
  },
});