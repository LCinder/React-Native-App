# Welcome to Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start --dev-client
   ```
   
If TCP error: 

   ```bash
   netstat -ano | findstr 5563
   taskkill /PID 2128 /F
   ```

3. Create APK
   ```bash
   eas build -p android --profile preview --local
   ```