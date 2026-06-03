import { View, Text, TouchableOpacity } from 'react-native';
import { Item } from '../types/evaluation';
import { useTheme } from '../styles/theme';
import { createItemCardStyles } from '../styles/styles';
import { calculateItemScores } from '../utils/evaluationCalculations';

interface ItemCardProps {
  item: Item;
  onPress?: () => void;
}

export default function ItemCard({ item, onPress }: ItemCardProps) {
  const theme = useTheme();
  const styles = createItemCardStyles(theme);

  const getQualityColor = (percentage: number) => {
    if (percentage > 70) return theme.good;
    if (percentage >= 50) return theme.acceptable;
    return theme.deficient;
  };

  const { actualScore, maxScore, percentage, qualityLabel } = calculateItemScores(item);
  const completedCriteria = item.criteria.filter(c => c.score > 0).length;
  const qualityColor = getQualityColor(percentage);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.weightBadge}>
          <Text style={styles.weightText}>Valor: {item.weight}%</Text>
        </View>
      </View>

      <View style={[styles.metaRow, { marginBottom: 8 }]}>
        <Text style={styles.criteriaCount}>
          {completedCriteria}/{item.criteria.length} criterios evaluados
        </Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text.primary }}>
          Puntuación: {actualScore}/{maxScore}
        </Text>
        <View style={{
          backgroundColor: `${qualityColor}20`,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
        }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '700',
            color: qualityColor,
          }}>
            {qualityLabel} ({percentage}%)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
