import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { fullToolbar } from '../editorConfig';

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

	function handleSubmit(e) {
		e.preventDefault();

		if (!nome.trim()) return setError('Inserisci un nome valido.');
		if (!esercizio && !collaudo)
			return setError('Seleziona almeno una modalità.');

		const nuovo = {
			nome: nome.trim(),
			descrizione: { ...descrizione },
			esercizio,
			collaudo,
		};

		onAdd(nuovo);

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
		<div className='card add-card fullscreen-card'>
			<h2 className='card-title'>➕ Aggiungi Applicativo</h2>

			<form onSubmit={handleSubmit} className='form'>
				<label>
					Nome applicativo
					<input
						type='text'
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						placeholder='Es. MIRART, LIMA...'
					/>
				</label>

				<h3 className='subsection'>Informazioni aggiuntive</h3>

				<label>Informazioni generali</label>
				<ReactQuill
					theme='snow'
					modules={fullToolbar}
					value={descrizione.generali}
					onChange={(v) => setDescrizione((p) => ({ ...p, generali: v }))}
				/>

				<label>Hostnames ed IP</label>
				<ReactQuill
					theme='snow'
					modules={fullToolbar}
					value={descrizione.hostnames}
					onChange={(v) => setDescrizione((p) => ({ ...p, hostnames: v }))}
				/>

				<label>Portali e Siti</label>
				<ReactQuill
					theme='snow'
					modules={fullToolbar}
					value={descrizione.portali}
					onChange={(v) => setDescrizione((p) => ({ ...p, portali: v }))}
				/>

				<label>Certificati</label>
				<ReactQuill
					theme='snow'
					modules={fullToolbar}
					value={descrizione.certificati}
					onChange={(v) => setDescrizione((p) => ({ ...p, certificati: v }))}
				/>

				<label>Strumenti dell'applicazione</label>
				<ReactQuill
					theme='snow'
					modules={fullToolbar}
					value={descrizione.strumenti}
					onChange={(v) => setDescrizione((p) => ({ ...p, strumenti: v }))}
				/>

				<div className='toggle-row'>
					<label>
						<input
							type='checkbox'
							checked={esercizio}
							onChange={(e) => setEsercizio(e.target.checked)}
						/>
						Esercizio
					</label>

					<label>
						<input
							type='checkbox'
							checked={collaudo}
							onChange={(e) => setCollaudo(e.target.checked)}
						/>
						Collaudo
					</label>
				</div>

				{error && <p className='error'>{error}</p>}

				<button type='submit' className='btn-primary'>
					Aggiungi
				</button>
			</form>
		</div>
	);
}
