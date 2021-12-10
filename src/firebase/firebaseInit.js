import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {
  getFirestore,
  query,
  where,
  orderBy,
  collection,
  onSnapshot,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import moment from 'moment';
import firebaseConfig from './firebaseConfig';
import { massageData } from '../helper/massageMsg';

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = getFirestore();

export const createMsg = async (msg) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...msg,
      createdAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const subscribeMsg = (data, user) => {
  const q = query(
    collection(db, 'messages'),
    where('createdAt', '!=', null, orderBy('createdAt', 'desc'))
  );

  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.doc.data().createdAt?.seconds) {
        data.push({
          id: change.doc.id,
          ...change.doc.data(),
          createdAt: moment(change.doc.data().createdAt.seconds * 1000),
          user,
        });
      }
    });
    massageData(data);
    return data;
  });
};

export const getMsg = async () => {
  const q = query(
    collection(db, 'messages'),
    where('createdAt', '!=', null, orderBy('createdAt', 'desc'))
  );

  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      createdAt: moment(doc.data().createdAt.seconds * 1000),
    });
  });
  return data;
};

export default firebaseApp;
