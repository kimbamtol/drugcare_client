importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBe6FveuA-2cUArXLNS6jVxDQjeraHPAAQ",
    authDomain: "drug-a3da8.firebaseapp.com",
    projectId: "drug-a3da8",
    storageBucket: "drug-a3da8.appspot.com",
    messagingSenderId: "1024950698087",
    appId: "1:1024950698087:web:aab9f0e4e2cd9b381e14c2",
    measurementId: "G-J5PS5H6L9R"
};

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
