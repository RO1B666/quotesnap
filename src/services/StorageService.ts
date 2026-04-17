import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@quotesnap_saved_quotes';

export interface SavedQuote {
  id: string;
  uri: string;
  text: string;
  createdAt: number;
}

export const StorageService = {
  getQuotes: async (): Promise<SavedQuote[]> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to get quotes', e);
      return [];
    }
  },

  saveQuote: async (uri: string, text: string): Promise<boolean> => {
    try {
      const newQuote: SavedQuote = {
        id: Date.now().toString(),
        uri,
        text,
        createdAt: Date.now(),
      };
      const existing = await StorageService.getQuotes();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newQuote, ...existing]));
      return true;
    } catch (e) {
      console.error('Failed to save quote', e);
      return false;
    }
  },

  deleteQuote: async (id: string): Promise<void> => {
    try {
      const existing = await StorageService.getQuotes();
      const filtered = existing.filter(q => q.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error('Failed to delete quote', e);
    }
  }
};
