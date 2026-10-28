import {Pressable, StyleSheet, Text, View} from 'react-native';
import {borderWidth, colors, fontSize, radius, spacing} from '../theme';

type OptionPickerProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export default function OptionPicker<T extends string>({
  options,
  value,
  onChange,
}: OptionPickerProps<T>) {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const selected = option === value;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{selected}}
            key={`${option}-${index}`}
            onPress={() => onChange(option)}
            style={({pressed}) => [
              styles.option,
              selected ? styles.selected : styles.unselected,
              pressed && styles.pressed,
            ]}>
            <Text
              style={[
                styles.label,
                selected ? styles.selectedLabel : styles.unselectedLabel,
              ]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    borderWidth,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  unselected: {
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: fontSize.body,
  },
  selectedLabel: {
    color: colors.card,
    fontWeight: '600',
  },
  unselectedLabel: {
    color: colors.textPrimary,
  },
});