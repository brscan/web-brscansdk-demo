import React, {useState} from 'react';
import logo from './logo.svg';

import './App.css';

import SelfieView from './Selfie';

function App() {
  const [selfie, setSelfie] = useState(null);

  return (
    <div className="App">
      { selfie ?
        <img src={selfie} />
      :
      <SelfieView
        selfieSucesso={(imagem) => {
          setSelfie(imagem);
        }}
        selfieErro={(id, mensagem) => {
          alert("Atenção: " + mensagem);
        }} />
      }
    </div>
  );
}

export default App;
