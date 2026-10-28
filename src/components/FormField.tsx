import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import {borderWidth, colors, fontSize, radius, spacing} from '../theme';

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function FormField({
  label,
  error,
  style,
  ...inputProps
}: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, error ? styles.inputError : null, style]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textPrimary,
    fontSize: fontSize.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
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
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.caption,
    marginTop: spacing.xs,
  },
});