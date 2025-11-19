import React, { useEffect, useState } from 'react';
import AddApplicativo from './components/AddApplicativo';
import ApplicativiList from './components/ApplicativiList';

// servizi Firestore
import {
	getApplicativi,
	saveApplicativo,
	updateApplicativo,
	deleteApplicativo,
} from './services/applicativiService';

export default function App() {
	const [applicativi, setApplicativi] = useState([]);
	const [loading, setLoading] = useState(true);

	/** Carica dati dal DB all'avvio */
	useEffect(() => {
		async function load() {
			const dati = await getApplicativi();
			setApplicativi(dati);
			setLoading(false);
		}
		load();
	}, []);

	/** Salvataggio nuovo applicativo */
	const handleAdd = async (nuovo) => {
		const salvato = await saveApplicativo(nuovo); // DB
		setApplicativi((prev) => [salvato, ...prev]); // stato locale
	};

	/** Aggiornamento applicativo esistente */
	const handleUpdate = async (aggiornato) => {
		const res = await updateApplicativo(aggiornato.id, aggiornato); // DB

		setApplicativi((prev) =>
			prev.map((item) => (item.id === aggiornato.id ? res : item))
		);
	};
	/** Cancellazione applicativo */
	const handleDelete = async (id) => {
		await deleteApplicativo(id);
		setApplicativi((prev) => prev.filter((i) => i.id !== id));
	};
	return (
		<div className='app-root'>
			<header className='app-header'>
				<h1>Guida Interattiva</h1>
				<p>Gestisci i tuoi applicativi (Esercizio / Collaudo)</p>
			</header>

			<main className='app-main'>
				<section className='left'>
					<AddApplicativo onAdd={handleAdd} />
				</section>

				<section className='right'>
					{loading ? (
						<p>Caricamento...</p>
					) : (
						<ApplicativiList
							items={applicativi}
							onUpdate={handleUpdate}
							onDelete={handleDelete}
						/>
					)}
				</section>
			</main>

			<footer className='app-footer'>
				<small>© 2025 Guida Interattiva — React + Vite</small>
			</footer>
		</div>
	);
}
