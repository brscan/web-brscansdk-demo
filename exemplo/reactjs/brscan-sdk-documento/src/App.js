import React, {useState} from 'react';

import './App.css';

import DocumentoView from './Documento';

function App() {

  return (
    <div className="App">
      <DocumentoView
        documentoSucesso={(documentos) => {
          alert('Documentos recebidos com sucesso');
        }}
        documentoErro={(id, mensagem) => {
          alert("Atenção: " + mensagem);
        }} />
    </div>
  );
}

export default App;
