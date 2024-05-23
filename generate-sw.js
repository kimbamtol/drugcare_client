// generate-sw.js
const fs = require('fs');
const path = require('path');

const env = process.env;

const templateFilePath = path.resolve(__dirname, 'public/firebase-messaging-sw.template.js');
const outputFilePath = path.resolve(__dirname, 'public/firebase-messaging-sw.js');

fs.readFile(templateFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading template file:', err);
        return;
    }

    let result = data
        .replace(/FIREBASE_API_KEY/g, env.NEXT_PUBLIC_FIREBASE_API_KEY)
        .replace(/FIREBASE_AUTH_DOMAIN/g, env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
        .replace(/FIREBASE_PROJECT_ID/g, env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
        .replace(/FIREBASE_STORAGE_BUCKET/g, env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
        .replace(/FIREBASE_MESSAGING_SENDER_ID/g, env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)
        .replace(/FIREBASE_APP_ID/g, env.NEXT_PUBLIC_FIREBASE_APP_ID)
        .replace(/FIREBASE_MEASUREMENT_ID/g, env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID);

    fs.writeFile(outputFilePath, result, 'utf8', (err) => {
        if (err) {
            console.error('Error writing output file:', err);
        } else {
            console.log('Service worker generated successfully.');
        }
    });
});
