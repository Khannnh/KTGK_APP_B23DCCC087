export const colors = {
  primary: '#4F46E5',
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  danger: '#EF4444',
  success: '#22C55E',
  disabled: '#CBD5E1',
  priority: {
    Cao: '#EF4444',
    'Trung bình': '#F59E0B',
    Thấp: '#22C55E',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
} as const;

export const borderWidth = 1;

export const fontSize = {
  caption: 13,
  body: 16,
  title: 20,
} as const;

export const shadow = {
  elevation: 3,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 4,
} as const;