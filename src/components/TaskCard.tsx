import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {Task} from '../types/task';
import {colors, fontSize, radius, shadow, spacing} from '../theme';
import {isOverdue} from '../utils/date';
import Checkbox from './Checkbox';
import PriorityBadge from './PriorityBadge';

type TaskCardProps = {
  task: Task;
  onPress: () => void;
  onLongPress?: () => void;
  onToggle: () => void;
};

export default function TaskCard({
  task,
  onPress,
  onLongPress,
  onToggle,
}: TaskCardProps) {
  const overdue = isOverdue(task);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      onLongPress={onLongPress}
      style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.content}>
        <Checkbox
          checked={task.done}
          onPress={onToggle}
          accessibilityLabel={
            task.done ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'
          }
        />
        <View style={styles.details}>
          <Text
            style={[styles.title, task.done && styles.doneTitle]}
            numberOfLines={2}>
            {task.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {task.category} · Hạn: {task.dueDate}
          </Text>
          <View style={styles.badges}>
            <PriorityBadge priority={task.priority} />
            {overdue ? <Text style={styles.overdue}>Quá hạn</Text> : null}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow,
  },
  pressed: {
    opacity: 0.8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  details: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.body,
    fontWeight: '700',
  },
  doneTitle: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.caption,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  overdue: {
    color: colors.danger,
    fontSize: fontSize.caption,
    fontWeight: '600',
  },
});