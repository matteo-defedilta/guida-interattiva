import React, { useState } from 'react';

export default function AddApplicativo({ onAdd }) {
	const [nome, setNome] = useState('');
	const [descrizione, setDescrizione] = useState({
		generali: '',
		hostnames: '',
		portali: '',
		certificati: '',
		strumenti: '',
	});

	const [esercizio, setEsercizio] = useState(true);
	const [collaudo, setCollaudo] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');

		if (!nome.trim()) {
			setError('Inserisci un nome valido.');
			return;
		}
		if (!esercizio && !collaudo) {
			setError('Seleziona almeno una modalità (Esercizio o Collaudo).');
			return;
		}

		const nuovo = {
			nome: nome.trim(),
			descrizione: { ...descrizione },
			esercizio,
			collaudo,
			dataCreazione: new Date().toISOString(),
		};

		setLoading(true);
		await onAdd(nuovo); // l'ID arriva da Firestore
		setLoading(false);

		// reset form
		setNome('');
		setDescrizione({
			generali: '',
			hostnames: '',
			portali: '',
			certificati: '',
			strumenti: '',
		});
		setEsercizio(true);
		setCollaudo(false);
	}

	return (
		<div className='card add-card'>
			<h2 className='card-title'>➕ Aggiungi Applicativo</h2>

			<form onSubmit={handleSubmit} className='form'>
				<label>
					Nome Applicativo
					<input
						type='text'
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						placeholder='Es. [MIRART] [LIMA]'
					/>
				</label>

				<h3 className='subsection'>Informazioni aggiuntive</h3>

				<label>
					Informazioni generali
					<textarea
						value={descrizione.generali}
						onChange={(e) =>
							setDescrizione((prev) => ({ ...prev, generali: e.target.value }))
						}
						placeholder="Descrizione generale dell'applicativo..."
					/>
				</label>

				<label>
					Hostnames ed IP
					<textarea
						value={descrizione.hostnames}
						onChange={(e) =>
							setDescrizione((prev) => ({ ...prev, hostnames: e.target.value }))
						}
						placeholder='Esempio: app01.local, 192.168.1.10...'
					/>
				</label>

				<label>
					Portali e Siti
					<textarea
						value={descrizione.portali}
						onChange={(e) =>
							setDescrizione((prev) => ({ ...prev, portali: e.target.value }))
						}
						placeholder='Link o nomi dei portali correlati...'
					/>
				</label>

				<label>
					Certificati
					<textarea
						value={descrizione.certificati}
						onChange={(e) =>
							setDescrizione((prev) => ({
								...prev,
								certificati: e.target.value,
							}))
						}
						placeholder='Certificati SSL, scadenze, ecc...'
					/>
				</label>

				<label>
					Strumenti dell'applicazione
					<textarea
						value={descrizione.strumenti}
						onChange={(e) =>
							setDescrizione((prev) => ({ ...prev, strumenti: e.target.value }))
						}
						placeholder='Strumenti o componenti utilizzati...'
					/>
				</label>

				<div className='toggle-row'>
					<label>
						<input
							type='checkbox'
							checked={esercizio}
							onChange={(e) => setEsercizio(e.target.checked)}
						/>{' '}
						Esercizio
					</label>
					<label>
						<input
							type='checkbox'
							checked={collaudo}
							onChange={(e) => setCollaudo(e.target.checked)}
						/>{' '}
						Collaudo
					</label>
				</div>

				{error && <p className='error'>{error}</p>}

				<button type='submit' className='btn-primary' disabled={loading}>
					{loading ? 'Salvataggio...' : 'Aggiungi'}
				</button>
			</form>
		</div>
	);
}
