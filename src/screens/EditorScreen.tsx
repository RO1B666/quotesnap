import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {StorageService} from '../services/StorageService';
import {Colors, Spacing, Typography} from '../theme/theme';

interface EditorScreenProps {
  imageUri: string | null;
  onBack: () => void;
}

const {width} = Dimensions.get('window');

export const EditorScreen: React.FC<EditorScreenProps> = ({imageUri, onBack}) => {
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState(Colors.white);
  const [fontSize, setFontSize] = useState(24);
  const [isSaving, setIsSaving] = useState(false);

  const colors = [
    Colors.white,
    Colors.black,
    Colors.primary,
    Colors.secondary,
    '#FFEB3B', // Yellow
    '#F44336', // Red
    '#4CAF50', // Green
  ];

  const fontSizes = [18, 24, 32, 40, 48];

  const handleSave = async () => {
    if (!imageUri || !text.trim()) return;

    setIsSaving(true);
    try {
      const success = await StorageService.saveQuote(imageUri, text);
      if (success) {
        onBack();
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!imageUri) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          disabled={isSaving || !text.trim()}
          style={[styles.saveButton, (!text.trim() || isSaving) && styles.disabledButton]}>
          <Text style={styles.saveText}>{isSaving ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{uri: imageUri}} style={styles.previewImage}>
            <View style={styles.overlay}>
              <TextInput
                style={[styles.overlayInput, {color: textColor, fontSize: fontSize}]}
                placeholder="Tap to write your quote..."
                placeholderTextColor="rgba(255,255,255,0.7)"
                multiline
                value={text}
                onChangeText={setText}
                autoFocus
              />
            </View>
          </ImageBackground>
        </View>

        <View style={styles.controls}>
          <Text style={styles.label}>Text Color</Text>
          <View style={styles.colorRow}>
            {colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorPicker,
                  {backgroundColor: color},
                  textColor === color && styles.selectedColor,
                ]}
                onPress={() => setTextColor(color)}
              />
            ))}
          </View>

          <Text style={styles.label}>Font Size</Text>
          <View style={styles.sizeRow}>
            {fontSizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizePicker,
                  fontSize === size && styles.selectedSize,
                ]}
                onPress={() => setFontSize(size)}>
                <Text style={[styles.sizeText, fontSize === size && styles.selectedSizeText]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    paddingTop: Spacing.xl,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: Spacing.sm,
  },
  backText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  saveText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  imageContainer: {
    width: width,
    height: width,
    backgroundColor: Colors.black,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  overlayInput: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
  },
  controls: {
    padding: Spacing.lg,
  },
  label: {
    ...Typography.body,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  colorRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  colorPicker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: Colors.primary,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  sizePicker: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedSize: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sizeText: {
    ...Typography.body,
    fontSize: 14,
  },
  selectedSizeText: {
    color: Colors.white,
  },
});
