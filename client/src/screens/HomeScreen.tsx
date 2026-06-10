import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme, spacing, radius, typography } from '../styles/theme';

// 👈 Reemplaza con tu tipo real cuando esté listo
type Item = {
  id: string;
  title: string;
  description?: string;
  isPublished: boolean;
};

// Datos de prueba para ver la pantalla
const MOCK_ITEMS: Item[] = [
  { id: '1', title: 'Evaluación ejemplo', description: 'Descripción de prueba', isPublished: true },
  { id: '2', title: 'Borrador ejemplo', isPublished: false },
];

const HomeScreen = () => {
  const theme = useTheme();
  const [items] = useState<Item[]>(MOCK_ITEMS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // 👈 reemplazar con fetch real
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={[styles.card, {
      backgroundColor: theme.surface,
      shadowColor: theme.shadow.color,
      shadowOpacity: theme.shadow.opacity,
      shadowRadius: theme.shadow.radius,
      shadowOffset: theme.shadow.offset,
      elevation: theme.shadow.elevation,
    }]}>
      <View style={styles.cardHeader}>
        <Text style={[typography.body, styles.cardTitle, { color: theme.text.primary }]}
          numberOfLines={1}>
          {item.title}
        </Text>
        <View style={[styles.badge, {
          backgroundColor: item.isPublished ? '#D1FAE5' : theme.divider,
        }]}>
          <Text style={[typography.label, { color: theme.text.primary }]}>
            {item.isPublished ? 'Publicado' : 'Borrador'}
          </Text>
        </View>
      </View>

      {item.description
        ? <Text style={[typography.small, { color: theme.text.secondary, marginBottom: spacing.xs }]}
            numberOfLines={2}>
            {item.description}
          </Text>
        : null}

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: theme.primarySoft }]}
          onPress={() => router.push(`/edit/${item.id}`)} // 👈 ajusta la ruta
        >
          <Text style={[typography.small, { color: theme.primary, fontWeight: '600' }]}>
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#FEF2F2' }]}
          onPress={() => {}} // 👈 lógica de eliminar cuando esté lista
        >
          <Text style={[typography.small, { color: theme.accent, fontWeight: '600' }]}>
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, {
        backgroundColor: theme.surface,
        borderBottomColor: theme.border,
      }]}>
        <View>
          <Text style={[typography.h1, { color: theme.accent }]}>Qeye</Text>
          <Text style={[typography.small, { color: theme.text.secondary, marginTop: 2 }]}>
            Mis evaluaciones
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.logoutBtn, { backgroundColor: '#FEE2E2' }]}
          onPress={() => router.replace('/login')} // 👈 ajusta la ruta
        >
          <Text style={[typography.small, { color: '#DC2626', fontWeight: '700' }]}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[typography.h3, { color: theme.text.secondary, marginBottom: spacing.sm }]}>
              Sin evaluaciones
            </Text>
            <Text style={[typography.small, styles.emptySubtitle, { color: theme.text.disabled }]}>
              Toca el botón + para crear tu primera evaluación
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={[styles.fab, {
          backgroundColor: theme.primary,
          shadowColor: theme.primary,
        }]}
        onPress={() => router.push('/form')} // 👈 ajusta la ruta
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 56,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  logoutBtn: {
    paddingVertical: spacing.xs + 7,
    paddingHorizontal: spacing.sm + spacing.xs,
    borderRadius: radius.sm,
  },
  list: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm + spacing.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    flex: 1,
    fontWeight: '700',
  },
  badge: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginLeft: spacing.sm,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptySubtitle: {
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '300',
  },
});

export default HomeScreen;