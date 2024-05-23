'use client';

import { useEffect } from 'react';
import { getFcmToken } from '../firebase';  // 올바른 경로로 수정

export default function ClientSideSetup() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        }

        const fetchFcmToken = async () => {
            const token = await getFcmToken();
            console.log('FCM Token:', token);
        };
        fetchFcmToken();
    }, []);

    return null;
}
