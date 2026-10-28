Project: React Native CLI (không Expo), TypeScript, tên PlannerApp.
Thư viện được dùng: @react-navigation/native, native-stack, react-native-screens,
react-native-safe-area-context, @react-native-async-storage/async-storage.
Cấm thư viện UI dựng sẵn (Paper, NativeBase...).
Quy tắc: mọi màu, spacing, radius, fontSize, shadow lấy từ src/theme; không hard-code.
Dùng StyleSheet.create, hạn chế style inline. Mỗi component/screen một file riêng.
Mọi UI text bằng tiếng Việt. Mọi thao tác xoá phải hỏi xác nhận bằng Alert.
Task: { id, title, note, category: 'Học tập'|'Công việc'|'Sức khoẻ'|'Cá nhân',
priority: 'Cao'|'Trung bình'|'Thấp', dueDate: 'dd/mm/yyyy', done: boolean }.
Cấu trúc thư mục: src/{theme,types,utils,data,storage,context,navigation,components,screens}.