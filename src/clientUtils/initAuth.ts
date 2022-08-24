import { init } from 'next-firebase-auth';

// Frontend and backend
const initAuth = () => {
  init({
    appPageURL: '/debug/authed',
    authPageURL: '/signin',
    cookies: {
      name: 'AppAuth',
      keys: [process.env.COOKIE_SECRET_CURRENT, process.env.COOKIE_SECRET_PREVIOUS],
      httpOnly: true,
      maxAge: 12 * 24 * 60 * 60 * 1000,
      overwrite: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
      signed: true,
    },
    debug: process.env.AUTH_DEBUG === 'true',
    firebaseAdminInitConfig: {
      credential: {
        clientEmail: <string>process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
          : undefined,
        projectId: <string>process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      },
      databaseURL: '',
    },
    firebaseClientInitConfig: {
      apiKey: <string>process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    },
    loginAPIEndpoint: '/api/auth/signin',
    logoutAPIEndpoint: '/api/auth/signout',
    onLoginRequestError: error => console.error(error),
    onLogoutRequestError: error => console.error(error),
    onTokenRefreshError: error => console.error(error),
    onVerifyTokenError: error => console.error(error),
    useFirebaseAdminDefaultCredential: false,
  });
};

export { initAuth };
