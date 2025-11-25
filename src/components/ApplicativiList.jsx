import React, { useState } from 'react';
import ApplicativoItem from './ApplicativoItem';

export default function ApplicativiList({ items, onUpdate, onDelete }) {
	const [tab, setTab] = useState('esercizio');
	const [query, setQuery] = useState('');

	const filtered = items.filter((i) => {
		if (tab === 'esercizio' && !i.esercizio) return false;
		if (tab === 'collaudo' && !i.collaudo) return false;

		if (!query.trim()) return true;

		const q = query.toLowerCase();
		const d = i.descrizione || {};

		const matchNome = i.nome.toLowerCase().includes(q);
		const matchFields = Object.values(d).some(
			(val) => val && val.toLowerCase().includes(q)
		);

		return matchNome || matchFields;
	});

	return (
		<div className='card list-card'>
			<h2 className='card-title'>📋 Applicativi</h2>

			<input
				type='text'
				placeholder='🔍 Cerca per nome, IP, certificati...'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className='search-input'
			/>

			<div className='tabs'>
				<button
					className={tab === 'esercizio' ? 'active' : ''}
					onClick={() => setTab('esercizio')}
				>
					Esercizio
				</button>
				<button
					className={tab === 'collaudo' ? 'active' : ''}
					onClick={() => setTab('collaudo')}
				>
					Collaudo
				</button>
				<button
					className={tab === 'tutti' ? 'active' : ''}
					onClick={() => setTab('tutti')}
				>
					Tutti
				</button>
			</div>

			{filtered.length === 0 ? (
				<p className='empty'>Nessun applicativo trovato.</p>
			) : (
				<div className='list'>
					{filtered.map((item) => (
						<ApplicativoItem
							key={item.id}
							item={item}
							onUpdate={onUpdate}
							onDelete={onDelete}
							highlight={query}
						/>
					))}
				</div>
			)}
		</div>
	);
}
