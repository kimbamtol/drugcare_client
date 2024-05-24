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

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch((err) => {
            console.log('Service worker registration failed, error:', err);
        });
}
