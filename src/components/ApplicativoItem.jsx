import React, { useState } from 'react';

export default function ApplicativoItem({ item, onUpdate, highlight }) {
	const [editing, setEditing] = useState(false);

	const [nome, setNome] = useState(item.nome);
	const [generali, setGenerali] = useState(item.descrizione?.generali || '');
	const [hostnames, setHostnames] = useState(item.descrizione?.hostnames || '');
	const [portali, setPortali] = useState(item.descrizione?.portali || '');
	const [certificati, setCertificati] = useState(
		item.descrizione?.certificati || ''
	);
	const [strumenti, setStrumenti] = useState(item.descrizione?.strumenti || '');

	const [esercizio, setEsercizio] = useState(item.esercizio);
	const [collaudo, setCollaudo] = useState(item.collaudo);

	// 🔧 Salva modifiche
	function handleSave() {
		const updated = {
			...item,
			nome,
			esercizio,
			collaudo,
			descrizione: {
				generali,
				hostnames,
				portali,
				certificati,
				strumenti,
			},
		};

		onUpdate(updated);
		setEditing(false);
	}

	// 🔦 Evidenzia testo (solo visualizzazione, non in edit)
	function applyHighlight(text) {
		if (!highlight) return text;
		const regex = new RegExp(`(${highlight})`, 'gi');
		return text.replace(regex, `<mark>$1</mark>`);
	}

	return (
		<div className='app-item'>
			{/* ===========================
			        🟦  MODIFICA
			    =========================== */}
			{editing ? (
				<div className='edit-view card'>
					<h3 className='form-title'>Modifica applicativo</h3>

					{/* Nome */}
					<label className='form-label'>Nome applicativo</label>
					<input
						className='input'
						value={nome}
						onChange={(e) => setNome(e.target.value)}
					/>

					{/* Sezione descrizione multipla */}
					<div className='multi-fields'>
						<div className='desc-block'>
							<label>Informazioni generali</label>
							<textarea
								className='textarea'
								value={generali}
								onChange={(e) => setGenerali(e.target.value)}
							/>
						</div>

						<div className='desc-block'>
							<label>Hostnames ed IP</label>
							<textarea
								className='textarea'
								value={hostnames}
								onChange={(e) => setHostnames(e.target.value)}
							/>
						</div>

						<div className='desc-block'>
							<label>Portali e Siti</label>
							<textarea
								className='textarea'
								value={portali}
								onChange={(e) => setPortali(e.target.value)}
							/>
						</div>

						<div className='desc-block'>
							<label>Certificati</label>
							<textarea
								className='textarea'
								value={certificati}
								onChange={(e) => setCertificati(e.target.value)}
							/>
						</div>

						<div className='desc-block'>
							<label>Strumenti dell'applicazione</label>
							<textarea
								className='textarea'
								value={strumenti}
								onChange={(e) => setStrumenti(e.target.value)}
							/>
						</div>
					</div>

					{/* Tabelle Esercizio & Collaudo */}
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

					<div className='actions'>
						<button className='btn primary' onClick={handleSave}>
							Salva
						</button>
						<button className='btn' onClick={() => setEditing(false)}>
							Annulla
						</button>
					</div>
				</div>
			) : (
				/* ===========================
				        🟩  VISUALIZZAZIONE
				    =========================== */
				<div className='view-view'>
					<div className='title-row'>
						<h3
							dangerouslySetInnerHTML={{ __html: applyHighlight(item.nome) }}
						/>

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
									<p
										dangerouslySetInnerHTML={{
											__html: applyHighlight(item.descrizione.generali),
										}}
									/>
								</div>
							)}

							{item.descrizione.hostnames && (
								<div className='desc-block'>
									<h4>Hostnames ed IP</h4>
									<p
										dangerouslySetInnerHTML={{
											__html: applyHighlight(item.descrizione.hostnames),
										}}
									/>
								</div>
							)}

							{item.descrizione.portali && (
								<div className='desc-block'>
									<h4>Portali e Siti</h4>
									<p
										dangerouslySetInnerHTML={{
											__html: applyHighlight(item.descrizione.portali),
										}}
									/>
								</div>
							)}

							{item.descrizione.certificati && (
								<div className='desc-block'>
									<h4>Certificati</h4>
									<p
										dangerouslySetInnerHTML={{
											__html: applyHighlight(item.descrizione.certificati),
										}}
									/>
								</div>
							)}

							{item.descrizione.strumenti && (
								<div className='desc-block'>
									<h4>Strumenti dell'applicazione</h4>
									<p
										dangerouslySetInnerHTML={{
											__html: applyHighlight(item.descrizione.strumenti),
										}}
									/>
								</div>
							)}
						</div>
					)}

					<div className='actions'>
						<button className='btn primary' onClick={() => setEditing(true)}>
							Modifica
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
