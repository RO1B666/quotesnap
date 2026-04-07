# Android build notes

## Minimum environment

- Node 22.11 or newer
- JDK 17 recommended by React Native docs
- Android Studio with Android SDK

## Install

```bash
npm install
```

## Run debug

```bash
npm start
npm run android
```

## Build debug APK from Android Studio

Open the `android` folder or project root in Android Studio, let Gradle sync, then build the debug variant.

## Build from terminal

If your machine has a working Gradle wrapper / Android Studio setup:

```bash
cd android
./gradlew assembleDebug
```

The debug APK will be under `android/app/build/outputs/apk/debug/`.

## If image picker gives permission issues

Check runtime permissions on the device and verify camera/gallery access is allowed.
