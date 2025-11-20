import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { fullToolbar } from '../editorConfig';

export default function ApplicativoItem({
	item,
	onUpdate,
	onDelete,
	highlight,
}) {
	const [editing, setEditing] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	// Campi editor ricco
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

	/** Salvataggio modifiche */
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

	/** Evidenziazione ricerca */
	function applyHighlight(text) {
		if (!highlight || !text) return text;
		const regex = new RegExp(`(${highlight})`, 'gi');
		return text.replace(regex, `<mark>$1</mark>`);
	}

	/** Conferma eliminazione */
	function handleDeleteConfirmed() {
		onDelete(item.id);
		setConfirmDelete(false);
	}

	return (
		<div className='app-item'>
			{/* =======================
          POPUP ELIMINAZIONE
      ======================== */}
			{confirmDelete && (
				<div className='delete-popup-backdrop'>
					<div className='delete-popup'>
						<h3>Eliminare applicativo?</h3>
						<p>
							Sei sicuro di voler eliminare
							<strong> {item.nome}</strong>?
						</p>

						<div className='actions'>
							<button className='btn' onClick={() => setConfirmDelete(false)}>
								Annulla
							</button>
							<button className='btn danger' onClick={handleDeleteConfirmed}>
								Elimina
							</button>
						</div>
					</div>
				</div>
			)}

			{/* =======================
           MODIFICA (con Quill)
      ======================== */}
			{editing ? (
				<div className='edit-view card'>
					<h3 className='form-title'>Modifica applicativo</h3>

					<label>Nome applicativo</label>
					<input value={nome} onChange={(e) => setNome(e.target.value)} />

					<div className='multi-fields'>
						<div className='desc-block'>
							<label>Informazioni generali</label>
							<ReactQuill
								theme='snow'
								value={generali}
								onChange={setGenerali}
								modules={fullToolbar}
							/>
						</div>

						<div className='desc-block'>
							<label>Hostnames ed IP</label>
							<ReactQuill
								theme='snow'
								value={hostnames}
								onChange={setHostnames}
								modules={fullToolbar}
							/>
						</div>

						<div className='desc-block'>
							<label>Portali e Siti</label>
							<ReactQuill
								theme='snow'
								value={portali}
								onChange={setPortali}
								modules={fullToolbar}
							/>
						</div>

						<div className='desc-block'>
							<label>Certificati</label>
							<ReactQuill
								theme='snow'
								value={certificati}
								onChange={setCertificati}
								modules={fullToolbar}
							/>
						</div>

						<div className='desc-block'>
							<label>Strumenti dell'applicazione</label>
							<ReactQuill
								theme='snow'
								value={strumenti}
								onChange={setStrumenti}
								modules={fullToolbar}
							/>
						</div>
					</div>

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
				// =======================
				// VISUALIZZAZIONE
				// =======================
				<div className='view-view'>
					<div className='title-row'>
						<h3
							dangerouslySetInnerHTML={{
								__html: applyHighlight(item.nome),
							}}
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

					<div className='desc-multi'>
						{item.descrizione.generali && (
							<div className='desc-block'>
								<h4>Informazioni generali</h4>
								<div
									className='html-view'
									dangerouslySetInnerHTML={{
										__html: applyHighlight(item.descrizione.generali),
									}}
								/>
							</div>
						)}

						{item.descrizione.hostnames && (
							<div className='desc-block'>
								<h4>Hostnames ed IP</h4>
								<div
									className='html-view'
									dangerouslySetInnerHTML={{
										__html: applyHighlight(item.descrizione.hostnames),
									}}
								/>
							</div>
						)}

						{item.descrizione.portali && (
							<div className='desc-block'>
								<h4>Portali e Siti</h4>
								<div
									className='html-view'
									dangerouslySetInnerHTML={{
										__html: applyHighlight(item.descrizione.portali),
									}}
								/>
							</div>
						)}

						{item.descrizione.certificati && (
							<div className='desc-block'>
								<h4>Certificati</h4>
								<div
									className='html-view'
									dangerouslySetInnerHTML={{
										__html: applyHighlight(item.descrizione.certificati),
									}}
								/>
							</div>
						)}

						{item.descrizione.strumenti && (
							<div className='desc-block'>
								<h4>Strumenti dell'applicazione</h4>
								<div
									className='html-view'
									dangerouslySetInnerHTML={{
										__html: applyHighlight(item.descrizione.strumenti),
									}}
								/>
							</div>
						)}
					</div>

					<div className='actions'>
						<button className='btn primary' onClick={() => setEditing(true)}>
							Modifica
						</button>

						<button
							className='btn danger'
							onClick={() => setConfirmDelete(true)}
						>
							Elimina
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
