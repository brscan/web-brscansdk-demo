import React, { useEffect } from 'react';

const appendElement = (arquivo, elemento) => {
	const elm = document.createElement(elemento);

	if(elemento === "script") {
		elm.src = arquivo;
		elm.async = false;	
		document.body.appendChild(elm);
	}

	if(elemento === "link") {
		elm.setAttribute('rel', 'stylesheet');
		elm.setAttribute('type', 'text/css');
		elm.setAttribute('href', arquivo);
		document.getElementsByTagName('head')[0].appendChild(elm);
	}
}

const removeElement = (arquivo, element) => {
    let allsuspects=document.getElementsByTagName(element);
    for (let i=allsuspects.length; i>=0; i--){
	if (allsuspects[i] && allsuspects[i].getAttribute("src")!==null 
	&& allsuspects[i].getAttribute("src").indexOf(`${arquivo}`)            !== -1 ){
           allsuspects[i].parentNode.removeChild(allsuspects[i])
        }    
    }
}

appendElement("documento/js/common/polyfil.js", "script");
appendElement("documento/js/common/tinyslider.js", "script");

appendElement("documento/js/KfxWebSDK/KfxWebSDK.js", "script");
appendElement("documento/js/documento_data.js", "script");
appendElement("documento/js/documento.min.js", "script");

appendElement("documento/css/brscan-sdk-documento-fonts.css", "link");
appendElement("documento/css/brscan-sdk-documento.css", "link");
appendElement("documento/css/tiny-slider-styles.css", "link");
appendElement("documento/css/tiny-slider.css", "link");

appendElement("documento/js/KfxWebSDK/CSS/KfxWebSDK.css", "link");

function DocumentoView(props) {
	const documentoSucesso = props.documentoSucesso;
	const documentoErro = props.documentoErro;

	useEffect(() => {
		window.addEventListener('load', carregaDocumento);

		return () => {
			window.removeEventListener('load', carregaDocumento)  
			removeDocumento();
		}

	}, []);
	
	const carregaDocumento = () => {
		try {
            let documento = new window.Documento(
				// incluir chave
				" ",
   
			 	document.getElementById("documentoContainer")
   	   		);
    
		   documento.iniciaDocumento((documentos) => {
			documentoSucesso(documentos);
		   },
		   (erroId, erro) => {
				documentoErro(erroId, erro)
		   });
        }
        catch(erro) {
        	console.log(erro);
		}
		
	}

	const removeDocumento = () => {
		removeElement("documento/js/common/getusermedia.js", "script");
		removeElement("documento/js/common/polyfil.js", "script");
		removeElement("documento/js/common/tinyslider.js", "script");

		removeElement("documento/js/KfxWebSDK/KfxWebSDK.js", "script");
		removeElement("documento/js/documento.js", "script");
		removeElement("documento/js/documento_data.js", "script");

		removeElement("documento/css/brscan-sdk-styles-fonts.css", "link");
		removeElement("documento/css/brscan-sdk-documento.css", "link");
		removeElement("documento/css/tiny-slider-styles.css", "link");
		removeElement("documento/css/tiny-slider.css", "link");
		removeElement("documento/js/KfxWebSDK/CSS/KfxWebSDK.css", "link");
	}

	return (
    <div className="App">        
		<div id="documentoContainer" className="documentoContainer">
		</div>
    </div>
  	);
}

export default DocumentoView;
