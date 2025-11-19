import { db } from '../firebaseConfig';
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	getDocs,
} from 'firebase/firestore';

const applicativiRef = collection(db, 'applicativi');

// SALVA NUOVO APPLICATIVO
export async function saveApplicativo(data) {
	const docRef = await addDoc(applicativiRef, data);
	return { id: docRef.id, ...data };
}

// AGGIORNA APPLICATIVO ESISTENTE
export async function updateApplicativo(id, data) {
	const docRef = doc(db, 'applicativi', id);
	await updateDoc(docRef, data);
	return { id, ...data };
}

// RECUPERA TUTTI GLI APPLICATIVI
export async function getApplicativi() {
	const snapshot = await getDocs(applicativiRef);
	return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
