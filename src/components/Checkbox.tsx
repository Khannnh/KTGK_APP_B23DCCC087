import {Pressable, StyleSheet, Text} from 'react-native';
import {borderWidth, colors, fontSize, radius, spacing} from '../theme';

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
};

export default function Checkbox({
  checked,
  onPress,
  accessibilityLabel,
}: CheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{checked}}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({pressed}) => [
        styles.checkbox,
        checked ? styles.checked : styles.unchecked,
        pressed && styles.pressed,
      ]}>
      {checked ? <Text style={styles.checkmark}>✓</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: radius.sm,
    borderWidth,
  },
  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unchecked: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  checkmark: {
    color: colors.card,
    fontSize: fontSize.body,
    fontWeight: '700',
  },
});