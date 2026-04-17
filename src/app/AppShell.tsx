import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {HomeScreen} from '../screens/HomeScreen';
import {EditorScreen} from '../screens/EditorScreen';
import {Colors} from '../theme/theme';

export type Screen = 'HOME' | 'EDITOR';

export const AppShell = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const navigateToEditor = (uri: string) => {
    setSelectedImage(uri);
    setCurrentScreen('EDITOR');
  };

  const navigateToHome = () => {
    setCurrentScreen('HOME');
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {currentScreen === 'HOME' ? (
          <HomeScreen onSelectImage={navigateToEditor} />
        ) : (
          <EditorScreen
            imageUri={selectedImage}
            onBack={navigateToHome}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
});
