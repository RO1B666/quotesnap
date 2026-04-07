# QuoteSnap Bare React Native CLI Repo

QuoteSnap is a non-Expo React Native MVP for Australian tradies. This repo includes:

- quoting flow
- jobs, customers, follow-ups, pricebook, templates, settings
- utility calculators and measuring tools
- image capture / gallery selection wiring
- recommended on-site tools inside quote logic
- branded assets and seeded demo data

## Stack

- React Native 0.84
- React 19.2.3
- Async Storage
- react-native-image-picker

## Quick start

1. Install Node 22.11+ and Android Studio.
2. From the project root run `npm install`.
3. Start Metro with `npm start`.
4. In another terminal run `npm run android`.

## Android notes

- Package name: `com.quotesnap`
- Main component name: `QuoteSnap`
- The Android folder is included.
- A debug keystore is included for local debug builds.

## Important limitation from this handoff

This environment could not compile a real APK, so this repo is build-ready source rather than a precompiled APK. Open it on a machine with Android Studio / Android SDK and it should be the correct shape for a standard bare React Native Android build.

## Imaging permissions

The manifest includes camera and photo permissions commonly used for image picking.

## Suggested next upgrades

- real authentication
- live PDF quote export
- backend sync
- push notifications
- production icons / splash / store assets
