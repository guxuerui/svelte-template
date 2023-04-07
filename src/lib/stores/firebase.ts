// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, listAll } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATQQiRuBO8GoKEuB2vLbr6WoDThyd5bnw",
  authDomain: "svelte-practice-2c472.firebaseapp.com",
  projectId: "svelte-practice-2c472",
  storageBucket: "svelte-practice-2c472.appspot.com",
  messagingSenderId: "418911606976",
  appId: "1:418911606976:web:610ed169990452df207525",
  measurementId: "G-RRMHSGN66W"
};

let app: any;
export function getFirebase() {
  app = initializeApp(firebaseConfig);
  return { db: getFirestore(app) };
}
// const analytics = getAnalytics(app);

export function getFiles() {
  const storage = getStorage(
    app,
    "gs://svelte-practice-2c472.appspot.com"
  );
  // Create a reference under which you want to list
  const listRef = ref(storage, 'files/uid');
  console.log("[/Users/xueruigu/workspace/svelte-practice/src/lib/stores/firebase.ts:50] listRef = ", listRef)

  console.log(listAll)
  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      console.log(res)
      res.prefixes.forEach((folderRef) => {
        console.log('folderRef: ', folderRef)
      });
      res.items.forEach((itemRef) => {
        console.log('itemRef: ', itemRef)
        // All the items under listRef.
      });
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  return storage
}
