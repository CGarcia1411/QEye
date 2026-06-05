import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../styles/theme';
import { createGlobalStyles } from '../styles/styles';
import { spacing, typography } from '../styles/theme';
import StageCard from '../components/StageCard';
import ItemCard from '../components/ItemCard';
import rubricTemplate from '../constants/rubricTemplate';
import { Evaluation } from '../types/evaluation';
import { calculateTotalEvaluationScores } from '../utils/evaluationCalculations';

export default function EvaluationForms() {
  const theme = useTheme();
  const globalStyles = createGlobalStyles(theme);
  const [evaluation, setEvaluation] = useState<Evaluation>(rubricTemplate);
  // Estado para controlar qué stage/item está expandido (null = ninguno)
  const [expandedStageId, setExpandedStageId] = useState<number | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  const handleUpdateCriterionScore = (criterionId: number, score: number) => {
    setEvaluation(prev => ({
      ...prev,
      updatedAt: new Date(),
      stages: prev.stages.map(stage => ({
        ...stage,
        items: stage.items.map(item => ({
          ...item,
          criteria: item.criteria.map(criterion =>
            criterion.id === criterionId
              ? { ...criterion, score }
              : criterion
          )
        }))
      }))
    }));
  };

  const handleToggleStage = (stageId: number) => {
    setExpandedStageId(prev => prev === stageId ? null : stageId);
    setExpandedItemId(null); // Cerrar items al cambiar de stage
  };

  const handleToggleItem = (itemId: number) => {
    setExpandedItemId(prev => prev === itemId ? null : itemId);
  };

  const totalScores = calculateTotalEvaluationScores(evaluation);

  const getTotalQualityColor = () => {
    if (totalScores.totalPercentage > 70) return theme.good;
    if (totalScores.totalPercentage >= 50) return theme.acceptable;
    return theme.deficient;
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView contentContainerStyle={globalStyles.scrollContent}>
        {/* Header con puntuación total */}
        <View style={{ 
          backgroundColor: theme.surface, 
          padding: 20, 
          borderRadius: 16, 
          marginBottom: 20,
          shadowColor: theme.shadow.color,
          shadowOpacity: theme.shadow.opacity,
          shadowRadius: theme.shadow.radius,
          shadowOffset: theme.shadow.offset,
          elevation: theme.shadow.elevation,
        }}>
          <Text style={[typography.h1, { color: theme.text.primary, marginBottom: 8 }]}>
            Evaluación QEye
          </Text>
          <Text style={[typography.body, { color: theme.text.secondary, marginBottom: 16 }]}>
            {evaluation.projectName}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={[typography.small, { color: theme.text.secondary, marginBottom: 4 }]}>
                Puntuación total
              </Text>
              <Text style={[typography.h1, { color: getTotalQualityColor(), fontSize: 36 }]}>
                {totalScores.totalPercentage}%
              </Text>
            </View>
            <View style={{
              backgroundColor: `${getTotalQualityColor()}20`,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 12,
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '800',
                color: getTotalQualityColor(),
              }}>
                {totalScores.qualityLabel}
              </Text>
            </View>
          </View>
        </View>

        {/* Lista de stages desplegables */}
        {evaluation.stages.map(stage => (
          <StageCard
            key={stage.id}
            stage={stage}
            isExpanded={expandedStageId === stage.id}
            onToggle={() => handleToggleStage(stage.id)}
          >
            {/* Items dentro del stage expandido */}
            <View style={{ paddingLeft: 16, paddingTop: 8 }}>
              {stage.items.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isExpanded={expandedItemId === item.id}
                  onToggle={() => handleToggleItem(item.id)}
                  onUpdateCriterionScore={handleUpdateCriterionScore}
                />
              ))}
            </View>
          </StageCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
