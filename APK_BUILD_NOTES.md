# QuoteSnap APK build status

A real APK could not be compiled inside this ChatGPT workspace because the local environment is missing required Android build tooling and the project bundle is incomplete for an offline build.

## Verified blockers in this upload

- `android/gradle/wrapper/gradle-wrapper.jar` is missing, so `./gradlew` cannot start.
- `node_modules/` is not included, so React Native dependencies are unavailable offline.
- Android SDK command-line build tools are not installed in this workspace.

## What was added

- `.github/workflows/build-apk.yml`

This workflow will:

1. install Node dependencies
2. install Android SDK packages
3. run a Gradle debug build
4. upload `app-debug.apk` as a downloadable GitHub Actions artifact

## How to get the APK

1. Upload this repo to GitHub.
2. Open the **Actions** tab.
3. Run **Build Android APK**.
4. Download the `quotesnap-debug-apk` artifact.

## Local fallback

On a PC with Android Studio installed:

```bash
npm install
cd android
gradle assembleDebug
```

The APK should end up at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```
