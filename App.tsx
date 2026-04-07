import React from 'react';
import {StatusBar} from 'react-native';
import {AppShell} from './src/app/AppShell';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F7FB" />
      <AppShell />
    </>
  );
}
