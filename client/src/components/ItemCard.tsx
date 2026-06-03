import { View, Text, TouchableOpacity } from 'react-native';
import { Item } from '../types/evaluation';
import { useTheme } from '../styles/theme';
import { createItemCardStyles } from '../styles/styles';

interface ItemCardProps {
  item: Item;
  onPress?: () => void;
}

export default function ItemCard({ item, onPress }: ItemCardProps) {
  const theme = useTheme();
  const styles = createItemCardStyles(theme);

  const calculateItemScore = () => {
    let totalWeight = 0;
    let weightedScore = 0;
    item.criteria.forEach(criterion => {
      totalWeight += criterion.weight;
      weightedScore += criterion.score * (criterion.weight / 100);
    });
    return totalWeight > 0 ? Math.round(weightedScore * 10) / 10 : 0;
  };

  const completedCriteria = item.criteria.filter(c => c.score > 0).length;

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
          <Text style={styles.weightText}> Valor del item: {item.weight}%</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.criteriaCount}>
          {completedCriteria}/{item.criteria.length} criterios evaluados
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text.primary }}>
          Puntuación: {calculateItemScore()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
