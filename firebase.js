// DRUGCARE_CLIENT/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBe6FveuA-2cUArXLNS6jVxDQjeraHPAAQ",
    authDomain: "drug-a3da8.firebaseapp.com",
    projectId: "drug-a3da8",
    storageBucket: "drug-a3da8.appspot.com",
    messagingSenderId: "1024950698087",
    appId: "1:1024950698087:web:aab9f0e4e2cd9b381e14c2",
    measurementId: "G-J5PS5H6L9R"
};

let messaging;

if (typeof window !== 'undefined') {
    if (!getApps().length) {
        initializeApp(firebaseConfig);
    }
    messaging = getMessaging(getApp());

    // 서비스 워커 등록
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then((registration) => {
                console.log('Service Worker registration successful with scope:', registration.scope);
            }).catch((err) => {
                console.log('Service Worker registration failed:', err);
            });
    }
}

export const getFcmToken = async () => {
    try {
        if (!messaging) throw new Error('Firebase messaging is not initialized');
        const currentToken = await getToken(messaging, { vapidKey: 'BAMeCRtrCQ_0J0myNY9PShlafJtFJT7Jw8_n1C6JJM-N2fzUnDfx04D2U9bvjXGN-V5-huBUqxpLxJtH4tjHrHA' });
        if (currentToken) {
            console.log('FCM token:', currentToken);
            return currentToken;
        } else {
            console.log('No registration token available. Request permission to generate one.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while retrieving token. ', error);
        return null;
    }
};

export const onMessageListener = () => new Promise((resolve) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
        resolve(payload);
    });
});
