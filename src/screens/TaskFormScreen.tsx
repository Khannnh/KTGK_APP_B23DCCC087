import {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import FormField from '../components/FormField';
import OptionPicker from '../components/OptionPicker';
import {useTasks} from '../context/TaskContext';
import {formatDate, formatDateInput, getToday} from '../utils/date';
import {validateDueDate, validateTitle} from '../utils/validate';
import {colors, fontSize, spacing} from '../theme';
import type {
  Category,
  Priority,
  RootStackParamList,
  Task,
} from '../types/task';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;

const categories: readonly Category[] = [
  'Học tập',
  'Công việc',
  'Sức khoẻ',
  'Cá nhân',
];
const priorities: readonly Priority[] = ['Cao', 'Trung bình', 'Thấp'];

export default function TaskFormScreen({navigation, route}: Props) {
  const taskId = route.params.taskId;
  const isEditing = taskId !== undefined;
  const {tasks, addTask, updateTask} = useTasks();
  const task = isEditing ? tasks.find(item => item.id === taskId) : undefined;

  const [title, setTitle] = useState(task?.title ?? '');
  const [note, setNote] = useState(task?.note ?? '');
  const [category, setCategory] = useState<Category>(
    task?.category ?? 'Học tập',
  );
  const [priority, setPriority] = useState<Priority>(
    task?.priority ?? 'Trung bình',
  );
  const [dueDate, setDueDate] = useState(
    task?.dueDate ?? formatDate(getToday()),
  );
  const [titleError, setTitleError] = useState('');
  const [dueDateError, setDueDateError] = useState('');

  useEffect(() => {
    navigation.setOptions({title: isEditing ? 'Sửa việc' : 'Thêm việc'});
  }, [isEditing, navigation]);

  useEffect(() => {
    if (!task) {
      return;
    }

    setTitle(task.title);
    setNote(task.note);
    setCategory(task.category);
    setPriority(task.priority);
    setDueDate(task.dueDate);
  }, [task]);

  const handleSave = () => {
    const nextTitleError = validateTitle(title);
    const nextDueDateError = validateDueDate(dueDate, !isEditing);
    setTitleError(nextTitleError);
    setDueDateError(nextDueDateError);

    if (nextTitleError || nextDueDateError || (isEditing && !task)) {
      return;
    }

    const data: Omit<Task, 'id' | 'done'> = {
      title: title.trim(),
      note: note.trim(),
      category,
      priority,
      dueDate,
    };

    if (taskId) {
      updateTask(taskId, data);
    } else {
      addTask(data);
    }

    navigation.goBack();
  };

  if (isEditing && !task) {
    return (
      <View style={styles.missingTask}>
        <Text style={styles.missingTaskText}>Không tìm thấy công việc.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardAvoidingView}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <FormField
          label="Tên việc"
          value={title}
          onChangeText={value => {
            setTitle(value);
            if (titleError) {
              setTitleError(validateTitle(value));
            }
          }}
          error={titleError}
          placeholder="Nhập tên công việc"
          returnKeyType="next"
        />
        <FormField
          label="Ghi chú (không bắt buộc)"
          value={note}
          onChangeText={setNote}
          placeholder="Thêm ghi chú"
          multiline
          textAlignVertical="top"
          style={styles.noteInput}
        />
        <View style={styles.optionSection}>
          <Text style={styles.sectionLabel}>Danh mục</Text>
          <OptionPicker
            options={categories}
            value={category}
            onChange={setCategory}
          />
        </View>
        <View style={styles.optionSection}>
          <Text style={styles.sectionLabel}>Mức ưu tiên</Text>
          <OptionPicker
            options={priorities}
            value={priority}
            onChange={setPriority}
          />
        </View>
        <FormField
          label="Ngày đến hạn"
          value={dueDate}
          onChangeText={value => {
            setDueDate(formatDateInput(value));
            if (dueDateError) {
              setDueDateError(
                validateDueDate(formatDateInput(value), !isEditing),
              );
            }
          }}
          error={dueDateError}
          keyboardType="numeric"
          placeholder="dd/mm/yyyy"
          maxLength={10}
        />
        <AppButton title="Lưu" onPress={handleSave} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: spacing.md,
  },
  optionSection: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  sectionLabel: {
    color: colors.textPrimary,
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  noteInput: {
    minHeight: spacing.lg * 3,
  },
  missingTask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  missingTaskText: {
    color: colors.textSecondary,
    fontSize: fontSize.body,
    textAlign: 'center',
  },
});
