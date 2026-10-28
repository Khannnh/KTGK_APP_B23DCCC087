import {StyleSheet, Text, Pressable, type PressableProps} from 'react-native';
import {borderWidth, colors, fontSize, radius, spacing} from '../theme';

type AppButtonProps = {
  title: string;
  onPress: PressableProps['onPress'];
  variant?: 'primary' | 'danger' | 'outline';
  disabled?: boolean;
};

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}>
      <Text
        style={[
          styles.title,
          variant === 'outline' && styles.outlineTitle,
          disabled && styles.disabledTitle,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  outline: {
    backgroundColor: colors.card,
    borderColor: colors.primary,
    borderWidth,
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    color: colors.card,
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  outlineTitle: {
    color: colors.primary,
  },
  disabledTitle: {
    color: colors.textSecondary,
  },
});