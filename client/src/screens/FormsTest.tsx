import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../styles/theme';
import { createGlobalStyles } from '../styles/styles';
import { spacing, typography } from '../styles/theme';
import StageCard from '../components/StageCard';
import ItemCard from '../components/ItemCard';
import CriterionCard from '../components/CriterionCard';
import { MOCK_EVALUATION } from '../constants/mockData';
import { Evaluation, Criterion } from '../types/evaluation';

export default function FormsTest() {
  const theme = useTheme();
  const globalStyles = createGlobalStyles(theme);
  const [evaluation, setEvaluation] = useState<Evaluation>(MOCK_EVALUATION);

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

  const allCriteria = evaluation.stages
    .flatMap(stage => stage.items)
    .flatMap(item => item.criteria);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView contentContainerStyle={globalStyles.scrollContent}>
        {/* Título de la pantalla */}
        <View style={{ marginBottom: spacing.lg }}>
          <Text style={{ ...typography.h1, color: theme.text.primary }}>
            Prueba de Componentes QEye
          </Text>
          <Text style={{ ...typography.body, color: theme.text.secondary, marginTop: spacing.xs }}>
            {evaluation.projectName}
          </Text>
        </View>

        {/* Sección: StageCards */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={{ ...typography.h2, color: theme.text.primary, marginBottom: spacing.md }}>
            1. Tarjetas de Etapas (StageCard)
          </Text>
          {evaluation.stages.map(stage => (
            <StageCard key={stage.id} stage={stage} />
          ))}
        </View>

        {/* Sección: ItemCards */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={{ ...typography.h2, color: theme.text.primary, marginBottom: spacing.md }}>
            2. Tarjetas de Ítems (ItemCard)
          </Text>
          {evaluation.stages[0].items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </View>

        {/* Sección: CriterionCards */}
        <View style={{ marginBottom: spacing.lg }}>
          <Text style={{ ...typography.h2, color: theme.text.primary, marginBottom: spacing.md }}>
            3. Tarjetas de Criterios (CriterionCard) - ¡Interactivas!
          </Text>
          <Text style={{ ...typography.small, color: theme.text.secondary, marginBottom: spacing.md }}>
            Toca los botones de puntuación para probar la interacción
          </Text>
          {allCriteria.map(criterion => (
            <CriterionCard
              key={criterion.id}
              criterion={criterion}
              onUpdateScore={handleUpdateCriterionScore}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
