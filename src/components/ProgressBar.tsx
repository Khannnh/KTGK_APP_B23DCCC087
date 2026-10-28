import {StyleSheet, View} from 'react-native';
import {colors, radius, spacing} from '../theme';

type ProgressBarProps = {
  done: number;
  total: number;
};

export default function ProgressBar({done, total}: ProgressBarProps) {
  const progress =
    total > 0 ? `${Math.min(100, Math.max(0, (done / total) * 100))}%` : '0%';

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: total,
        now: Math.min(total, Math.max(0, done)),
      }}
      style={styles.track}>
      <View style={[styles.fill, {width: progress}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: spacing.sm,
    overflow: 'hidden',
    borderRadius: radius.md,
    backgroundColor: colors.disabled,
  },
  fill: {
    height: '100%',
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
});