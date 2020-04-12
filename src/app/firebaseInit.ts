import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// https://github.com/zeit/next.js/issues/1999
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth: firebase.auth.Auth = firebase.app().auth();
const db: firebase.firestore.Firestore = firebase.firestore();
const storage: firebase.storage.Storage = firebase.storage();
const storageRef: firebase.storage.Reference = storage.ref();

export { firebase, auth, db, storage, storageRef };
