import React, { useState, useEffect } from 'react';
import AddApplicativo from './components/AddApplicativo';
import ApplicativiList from './components/ApplicativiList';
import { db } from './firebaseConfig';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';

export default function App() {
	const [applicativi, setApplicativi] = useState([]);
	const [showAdd, setShowAdd] = useState(false);

	/* =========================
      FIREBASE — CARICA DATI
     ========================= */
	useEffect(() => {
		async function load() {
			const snap = await getDocs(collection(db, 'applicativi'));
			const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
			setApplicativi(list);
		}
		load();
	}, []);

	/* =========================
      AGGIUNGI
     ========================= */
	const handleAdd = async (nuovo) => {
		const ref = await addDoc(collection(db, 'applicativi'), nuovo);
		setApplicativi((prev) => [{ ...nuovo, id: ref.id }, ...prev]);
		setShowAdd(false);
	};

	/* =========================
      MODIFICA
     ========================= */
	const handleUpdate = async (updated) => {
		const docRef = doc(db, 'applicativi', updated.id);
		await updateDoc(docRef, updated);

		setApplicativi((prev) =>
			prev.map((i) => (i.id === updated.id ? updated : i))
		);
	};

	/* =========================
      ELIMINAZIONE
     ========================= */
	const handleDelete = async (id) => {
		await deleteDoc(doc(db, 'applicativi', id));
		setApplicativi((prev) => prev.filter((i) => i.id !== id));
	};

	return (
		<div className='app-root'>
			{/* HEADER */}
			<header className='app-header'>
				<h1>Guida Interattiva</h1>
				<p>Gestisci i tuoi applicativi (Esercizio / Collaudo)</p>
			</header>

			{/* =========================
          SEZIONE LISTA (default)
         ========================= */}
			{!showAdd && (
				<>
					<button
						className='btn-primary add-fullscreen-btn'
						onClick={() => setShowAdd(true)}
					>
						➕ Aggiungi Applicativo
					</button>

					<ApplicativiList
						items={applicativi}
						onUpdate={handleUpdate}
						onDelete={handleDelete}
					/>
				</>
			)}

			{/* =========================
          SEZIONE FULLSCREEN FORM
         ========================= */}
			{showAdd && (
				<div className='fullscreen-panel'>
					<button className='close-btn' onClick={() => setShowAdd(false)}>
						✖ Chiudi
					</button>

					<AddApplicativo onAdd={handleAdd} />
				</div>
			)}
		</div>
	);
}
