import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useTasks} from '../context/TaskContext';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import TaskListScreen from '../screens/TaskListScreen';
import {colors, fontSize} from '../theme';
import type {RootStackParamList} from '../types/task';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const {loading, error} = useTasks();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.loading}>
          <Text style={styles.error}>
            Không thể tải dữ liệu. Vui lòng khởi động lại ứng dụng.
          </Text>
        </View>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: colors.primary},
            headerTintColor: colors.card,
            headerTitleStyle: {
              color: colors.card,
              fontSize: fontSize.title,
              fontWeight: '700',
            },
            contentStyle: {backgroundColor: colors.background},
          }}>
          <Stack.Screen
            name="TaskList"
            component={TaskListScreen}
            options={{title: 'Công việc'}}
          />
          <Stack.Screen
            name="TaskForm"
            component={TaskFormScreen}
            options={{title: 'Thêm công việc'}}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
            options={{title: 'Chi tiết công việc'}}
          />
        </Stack.Navigator>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.body,
    textAlign: 'center',
  },
});