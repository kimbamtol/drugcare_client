// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


// Firebase 초기화
let messaging = null;
if (typeof window !== 'undefined') {
    const app = initializeApp(firebaseConfig);
    // Firebase Messaging이 지원되는 환경인지 확인합니다.
    isSupported().then((supported) => {
        if (supported) {
            messaging = getMessaging(app);
        } else {
            console.warn('Firebase Messaging is not supported in this environment.');
        }
    });
}

export const getFcmToken = async () => {
    if (!messaging) {
        console.error('FCM is not supported in this environment.');
        return null;
    }

    try {
        const currentToken = await getToken(messaging, { vapidKey: 'BAMeCRtrCQ_0J0myNY9PShlafJtFJT7Jw8_n1C6JJM-N2fzUnDfx04D2U9bvjXGN-V5-huBUqxpLxJtH4tjHrHA' });
        if (currentToken) {
            return currentToken;
        } else {
            console.log('No registration token available. Request permission to generate one.');
            return null;
        }
    } catch (err) {
        console.error('An error occurred while retrieving token. ', err);
        return null;
    }
};
