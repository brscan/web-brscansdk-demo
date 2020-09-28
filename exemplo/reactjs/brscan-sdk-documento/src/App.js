import React, {useState} from 'react';

import './App.css';

import DocumentoView from './Documento';

function App() {
  const [documentos, setDocumentos] = useState(null);

  return (
    <div className="App">
      { documentos ? 
        documentos
      :
      <DocumentoView
        documentoSucesso={(documentos) => {
          setDocumentos(JSON.stringify(documentos));
        }}
        documentoErro={(id, mensagem) => {
          alert("Atenção: " + mensagem);
        }} />
      }
    </div>
  );
}

export default App;
