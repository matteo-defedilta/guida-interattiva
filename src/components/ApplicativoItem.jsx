import React, { useState } from 'react';

function EvidenziaTesto({ testo, query }) {
	if (!query) return <>{testo}</>;
	const regex = new RegExp(`(${query})`, 'gi');
	const parti = testo.split(regex);
	return (
		<>
			{parti.map((parte, i) =>
				regex.test(parte) ? (
					<span key={i} style={{ backgroundColor: 'yellow' }}>
						{parte}
					</span>
				) : (
					parte
				)
			)}
		</>
	);
}

export default function ApplicativoItem({ item, onUpdate, query }) {
	const [editing, setEditing] = useState(false);
	const [nome, setNome] = useState(item.nome);
	const [descrizione, setDescrizione] = useState(item.descrizione);
	const [esercizio, setEsercizio] = useState(item.esercizio);
	const [collaudo, setCollaudo] = useState(item.collaudo);

	function handleSave() {
		const updated = { ...item, nome, descrizione, esercizio, collaudo };
		onUpdate(updated);
		setEditing(false);
	}

	return (
		<div className='app-item'>
			{editing ? (
				<div className='edit-view'>
					<input value={nome} onChange={(e) => setNome(e.target.value)} />
					<textarea
						value={descrizione?.generali || ''}
						onChange={(e) =>
							setDescrizione({ ...descrizione, generali: e.target.value })
						}
					/>
					<div className='toggle-row small'>
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
					<div className='actions'>
						<button onClick={handleSave}>Salva</button>
						<button onClick={() => setEditing(false)}>Annulla</button>
					</div>
				</div>
			) : (
				<div className='view-view'>
					<div className='title-row'>
						<h3>
							<EvidenziaTesto testo={item.nome} query={query} />
						</h3>
						<div className='badges'>
							{item.esercizio && (
								<span className='badge esercizio'>Esercizio</span>
							)}
							{item.collaudo && (
								<span className='badge collaudo'>Collaudo</span>
							)}
						</div>
					</div>

					{item.descrizione && (
						<div className='desc-multi'>
							{item.descrizione.generali && (
								<div className='desc-block'>
									<h4>Informazioni generali</h4>
									<p>
										<EvidenziaTesto
											testo={item.descrizione.generali}
											query={query}
										/>
									</p>
								</div>
							)}
							{item.descrizione.hostnames && (
								<div className='desc-block'>
									<h4>Hostnames ed IP</h4>
									<p>
										<EvidenziaTesto
											testo={item.descrizione.hostnames}
											query={query}
										/>
									</p>
								</div>
							)}
							{item.descrizione.portali && (
								<div className='desc-block'>
									<h4>Portali e Siti</h4>
									<p>
										<EvidenziaTesto
											testo={item.descrizione.portali}
											query={query}
										/>
									</p>
								</div>
							)}
							{item.descrizione.certificati && (
								<div className='desc-block'>
									<h4>Certificati</h4>
									<p>
										<EvidenziaTesto
											testo={item.descrizione.certificati}
											query={query}
										/>
									</p>
								</div>
							)}
							{item.descrizione.strumenti && (
								<div className='desc-block'>
									<h4>Strumenti dell'applicazione</h4>
									<p>
										<EvidenziaTesto
											testo={item.descrizione.strumenti}
											query={query}
										/>
									</p>
								</div>
							)}
						</div>
					)}

					<div className='actions'>
						<button onClick={() => setEditing(true)}>Modifica</button>
					</div>
				</div>
			)}
		</div>
	);
}
