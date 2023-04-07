import { collection, doc, getDocs, query, where, setDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { getFirebase } from './firebase';
import type { Book } from '$types/index';

const { db } = getFirebase();

export async function getBooks(): Promise<Book[]> {
  const q = query(collection(db, "Books"));

  const res: Book[] = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data()
    console.log(doc.id, " => ", doc.data());
    res.push({
      id: data['id'],
      title: data['title'],
      author: data['author']
    })
  });
  console.log('res: ', res)
  return res
}

export async function setBooks(params: Book) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Books"), params);
  console.log("Document written with ID: ", docRef.id);
  // const docRef = await addDoc(doc(db, 'Books', 'cmwmxEzJjkCJKCM179xf'), params)
  return docRef
}
