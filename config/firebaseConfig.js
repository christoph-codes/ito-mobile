import Constants from 'expo-constants';
import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/analytics';
import 'firebase/auth';
import {
	FIREBASE_API_KEY2,
	FIREBASE_AUTHDOMAIN2,
	FIREBASE_DATABASE_URL2,
	FIREBASE_PROJECT_ID2,
	FIREBASE_STORAGE_BUCKET2,
	FIREBASE_MESSAGE_SENDER_ID2,
	FIREBASE_APP_ID2,
	FIREBASE_MEASUREMENT_ID2,
} from 'react-native-dotenv';

firebase.initializeApp({
	apiKey: FIREBASE_API_KEY2,
	authDomain: FIREBASE_AUTHDOMAIN2,
	databaseURL: FIREBASE_DATABASE_URL2,
	projectId: FIREBASE_PROJECT_ID2,
	storageBucket: FIREBASE_STORAGE_BUCKET2,
	messagingSenderId: FIREBASE_MESSAGE_SENDER_ID2,
	appId: FIREBASE_APP_ID2,
	measurementId: FIREBASE_MEASUREMENT_ID2,
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const analytics = firebase.analytics();

// Firebase Emulators Configuration
// eslint-disable-next-line no-undef
if (__DEV__) {
	const origin =
		Constants.manifest.debuggerHost?.split(':').shift() || 'localhost';
	console.log('origin', origin);
	auth.useEmulator(`http://${origin}:9099/`, { disableWarnings: true });
	firestore.useEmulator(origin, 8080);
}

export default firebase;
