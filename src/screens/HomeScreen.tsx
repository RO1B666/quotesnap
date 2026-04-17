import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {StorageService, SavedQuote} from '../services/StorageService';
import {Colors, Spacing, Typography} from '../theme/theme';

interface HomeScreenProps {
  onSelectImage: (uri: string) => void;
}

const {width} = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_SIZE = (width - Spacing.lg * 2 - Spacing.md) / COLUMN_COUNT;

export const HomeScreen: React.FC<HomeScreenProps> = ({onSelectImage}) => {
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    const quotes = await StorageService.getQuotes();
    setSavedQuotes(quotes);
  };

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets[0]?.uri) {
      onSelectImage(result.assets[0].uri);
    }
  };

  const handleTakePick = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets[0]?.uri) {
      onSelectImage(result.assets[0].uri);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Quote', 'Are you sure you want to delete this quote?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await StorageService.deleteQuote(id);
          loadQuotes();
        },
      },
    ]);
  };

  const renderItem = ({item}: {item: SavedQuote}) => (
    <View style={styles.quoteItem}>
      <Image source={{uri: item.uri}} style={styles.quoteImage} />
      <View style={styles.quoteOverlay}>
         <Text numberOfLines={2} style={styles.quoteText}>{item.text}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QuoteSnap</Text>
        <Text style={styles.subtitle}>Capture & Create</Text>
      </View>

      <FlatList
        data={savedQuotes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No saved quotes yet.</Text>
            <Text style={styles.emptySubtext}>Start by creating your first one!</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handlePickImage}>
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleTakePick}>
          <Text style={styles.primaryButtonText}>Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  listContent: {
    padding: Spacing.lg,
  },
  quoteItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: Spacing.xs,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  quoteImage: {
    width: '100%',
    height: '100%',
  },
  quoteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: Spacing.sm,
  },
  quoteText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: Colors.white,
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    ...Typography.h2,
    color: Colors.textSecondary,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.text,
  },
  primaryButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});
