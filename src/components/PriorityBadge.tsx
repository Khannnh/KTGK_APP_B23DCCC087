import {StyleSheet, Text, View} from 'react-native';
import type {Priority} from '../types/task';
import {colors, fontSize, radius, spacing} from '../theme';

type PriorityBadgeProps = {
  priority: Priority;
};

export default function PriorityBadge({priority}: PriorityBadgeProps) {
  return (
    <View style={[styles.badge, {backgroundColor: colors.priority[priority]}]}>
      <Text style={styles.label}>{priority}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  label: {
    color: colors.card,
    fontSize: fontSize.caption,
    fontWeight: '600',
  },
});