import {StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import PriorityBadge from '../components/PriorityBadge';
import {useTasks} from '../context/TaskContext';
import {getRemainingText, isOverdue} from '../utils/date';
import {colors, fontSize, spacing} from '../theme';
import type {RootStackParamList} from '../types/task';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen({navigation, route}: Props) {
  const {tasks, toggleDone} = useTasks();
  const task = tasks.find(item => item.id === route.params.taskId);

  return (
    <View style={styles.container}>
      {task ? (
        <>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.detailGroup}>
            <Text style={styles.label}>Ghi chú</Text>
            <Text style={styles.detail}>
              {task.note || 'Không có ghi chú'}
            </Text>
          </View>
          <View style={styles.detailGroup}>
            <Text style={styles.label}>Danh mục</Text>
            <Text style={styles.detail}>{task.category}</Text>
          </View>
          <View style={styles.detailGroup}>
            <Text style={styles.label}>Mức ưu tiên</Text>
            <PriorityBadge priority={task.priority} />
          </View>
          <View style={styles.detailGroup}>
            <Text style={styles.label}>Ngày đến hạn</Text>
            <Text style={styles.detail}>{task.dueDate}</Text>
          </View>
          <View style={styles.detailGroup}>
            <Text style={styles.label}>Trạng thái</Text>
            <Text style={styles.detail}>
              {task.done ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
            </Text>
          </View>
          <View style={styles.detailGroup}>
            <Text style={styles.label}>Thời hạn</Text>
            <Text style={styles.detail}>{getRemainingText(task)}</Text>
            {isOverdue(task) ? (
              <Text style={styles.overdue}>Quá hạn</Text>
            ) : null}
          </View>
          <View style={styles.actions}>
            <AppButton
              title="Sửa"
              onPress={() =>
                navigation.navigate('TaskForm', {taskId: task.id})
              }
              variant="outline"
            />
            <AppButton
              title={
                task.done
                  ? 'Đánh dấu chưa hoàn thành'
                  : 'Đánh dấu hoàn thành'
              }
              onPress={() => toggleDone(task.id)}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.detail}>Không tìm thấy công việc.</Text>
          <AppButton title="Quay lại" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.title,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  detailGroup: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textPrimary,
    fontSize: fontSize.caption,
    fontWeight: '600',
  },
  detail: {
    color: colors.textSecondary,
    fontSize: fontSize.body,
  },
  overdue: {
    color: colors.danger,
    fontSize: fontSize.body,
    fontWeight: '700',
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});