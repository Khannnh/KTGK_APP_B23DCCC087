import {useMemo, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import OptionPicker from '../components/OptionPicker';
import ProgressBar from '../components/ProgressBar';
import TaskCard from '../components/TaskCard';
import {useTasks} from '../context/TaskContext';
import {isOverdue, parseDate} from '../utils/date';
import {borderWidth, colors, fontSize, radius, spacing} from '../theme';
import type {Priority, RootStackParamList, Task} from '../types/task';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;
type StatusFilter = 'Tất cả' | 'Chưa xong' | 'Đã xong' | 'Quá hạn';
type SortMode = 'dueDate' | 'priority';

const statusOptions: readonly StatusFilter[] = [
  'Tất cả',
  'Chưa xong',
  'Đã xong',
  'Quá hạn',
];
const priorityOrder: Record<Priority, number> = {
  Cao: 0,
  'Trung bình': 1,
  Thấp: 2,
};

function compareDueDate(first: Task, second: Task): number {
  const firstDate =
    parseDate(first.dueDate)?.getTime() ?? Number.POSITIVE_INFINITY;
  const secondDate =
    parseDate(second.dueDate)?.getTime() ?? Number.POSITIVE_INFINITY;

  return firstDate - secondDate;
}

export default function TaskListScreen({navigation}: Props) {
  const {tasks, toggleDone, deleteTask, deleteCompleted} = useTasks();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Tất cả');
  const [sortMode, setSortMode] = useState<SortMode>('dueDate');
  const doneCount = tasks.filter(task => task.done).length;
  const visibleTasks = useMemo(() => {
    let result = tasks;

    if (statusFilter === 'Chưa xong') {
      result = result.filter(task => !task.done);
    } else if (statusFilter === 'Đã xong') {
      result = result.filter(task => task.done);
    } else if (statusFilter === 'Quá hạn') {
      result = result.filter(isOverdue);
    }

    const query = searchText.trim().toLowerCase();
    if (query) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(query),
      );
    }

    return [...result].sort((first, second) =>
      sortMode === 'dueDate'
        ? compareDueDate(first, second)
        : priorityOrder[first.priority] - priorityOrder[second.priority],
    );
  }, [tasks, statusFilter, searchText, sortMode]);

  const confirmDeleteTask = (taskId: string, title: string) => {
    Alert.alert('Xoá công việc', `Bạn có chắc muốn xoá "${title}" không?`, [
      {text: 'Huỷ', style: 'cancel'},
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => deleteTask(taskId),
      },
    ]);
  };

  const confirmDeleteCompleted = () => {
    Alert.alert(
      'Xoá công việc đã hoàn thành',
      `Xoá ${doneCount} việc đã hoàn thành?`,
      [
        {text: 'Huỷ', style: 'cancel'},
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: deleteCompleted,
        },
      ],
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.progress}>
        <Text style={styles.progressLabel}>
          Đã hoàn thành {doneCount}/{tasks.length} công việc
        </Text>
        <ProgressBar done={doneCount} total={tasks.length} />
      </View>
      <AppButton
        title="+ Thêm việc"
        onPress={() => navigation.navigate('TaskForm', {})}
      />
      <View style={styles.deleteCompletedButton}>
        <AppButton
          title="Xoá việc đã hoàn thành"
          variant="danger"
          disabled={doneCount === 0}
          onPress={confirmDeleteCompleted}
        />
      </View>
      <View style={styles.filters}>
        <TextInput
          accessibilityLabel="Tìm kiếm công việc"
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm theo tên công việc"
          placeholderTextColor={colors.textSecondary}
          returnKeyType="search"
          style={styles.searchInput}
        />
        <OptionPicker
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        <AppButton
          title={
            sortMode === 'dueDate'
              ? 'Sắp xếp: Hạn gần nhất'
              : 'Sắp xếp: Ưu tiên cao nhất'
          }
          variant="outline"
          onPress={() =>
            setSortMode(current =>
              current === 'dueDate' ? 'priority' : 'dueDate',
            )
          }
        />
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={visibleTasks}
        keyExtractor={task => task.id}
        ListEmptyComponent={
          <EmptyState
            message={
              tasks.length === 0
                ? 'Chưa có công việc nào.'
                : 'Không tìm thấy công việc phù hợp.'
            }
          />
        }
        renderItem={({item}) => (
          <TaskCard
            task={item}
            onPress={() =>
              navigation.navigate('TaskDetail', {taskId: item.id})
            }
            onLongPress={() => confirmDeleteTask(item.id, item.title)}
            onToggle={() => toggleDone(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  progress: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  progressLabel: {
    color: colors.textPrimary,
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  deleteCompletedButton: {
    marginTop: spacing.sm,
  },
  filters: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  searchInput: {
    minHeight: spacing.lg + spacing.md,
    borderWidth,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.card,
    color: colors.textPrimary,
    fontSize: fontSize.body,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  list: {
    flexGrow: 1,
    paddingTop: spacing.md,
  },
});