import 'dotenv/config'

export default ({ config }) => ({
  ...config,
  expo: {
    name: 'spatlas',
    slug: 'spatlas',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/spatlas-icon.png',
    scheme: 'spatlas',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    ios: {
      bundleIdentifier: 'com.oscarm.spatlas',
      supportsTablet: true,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },

    android: {
      package: 'com.oscarm.spatlas',
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/spatlas-icon.png.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },

    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
    },

    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-logo.png',
          imageWidth: 260,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      [
        'react-native-maps',
        {
          iosGoogleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
          androidGoogleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    extra: {
      authBaseUrl: process.env.AUTH_BASE_URL,
      coreBaseUrl: process.env.CORE_BASE_URL,
      router: {},
      eas: {
        projectId: 'd18dc9c4-b417-4346-b1d1-7ba4d587273e',
      },
    },
  },
})
