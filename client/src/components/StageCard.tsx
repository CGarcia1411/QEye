import { View, Text, TouchableOpacity } from 'react-native';
import { Stage } from '../types/evaluation';
import { useTheme } from '../styles/theme';
import { createStageCardStyles } from '../styles/styles';

interface StageCardProps {
  stage: Stage;
  onPress?: () => void;
}

export default function StageCard({ stage, onPress }: StageCardProps) {
  const theme = useTheme();
  const styles = createStageCardStyles(theme);

  const calculateStageProgress = () => {
    let totalCriteria = 0;
    let completedCriteria = 0;
    stage.items.forEach(item => {
      item.criteria.forEach(criterion => {
        totalCriteria++;
        if (criterion.score > 0) completedCriteria++;
      });
    });
    return totalCriteria > 0 ? Math.round((completedCriteria / totalCriteria) * 100) : 0;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{stage.name}</Text>
        <View style={styles.weightBadge}>
          <Text style={styles.weightText}>{stage.weight}%</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{stage.items.length} items</Text>
        <Text style={styles.metaText}>Progreso: {calculateStageProgress()}%</Text>
      </View>
    </TouchableOpacity>
  );
}
