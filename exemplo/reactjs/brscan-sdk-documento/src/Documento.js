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
    
		   documento.iniciaDocumento(
			(documentos) => {
				documentoSucesso(documentos);
		   	},

			(erroId, erro) => {
					documentoErro(erroId, erro)
			},

			// ESCONDE TUTORIAL
			false,

			// CALLBACK SELECAO DE DOCUMENTO
			(tipo, lado, documento) => {
				console.log(tipo, lado, documento);
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
			<div id="selecaoDocumentoContainer" className="selecaoDocumentoContainer">

			<div id="selecaoDocumento" className="selecaoDocumento">
				<div id="selecaoDocumentoTipo" className="selecaoDocumentoTipo">
				<h1>
					Selecione o tipo de<br/>documento.
				</h1>
		
				<div className="selecaoDocumentoTipoContainer">
		
					<div id="selecaoDocumentoBotoes" className="selecaoDocumentoBotoes">
		
					</div>
		
				</div>
				</div>
		
				<div id="selecaoDocumentoLado" className="selecaoDocumentoLado">
		
				<h1 className="textoDocumentoLado" id="textoDocumentoLado">
		
				</h1>
		
				<div className="botaoAcaoRetornarSelecaoDocumento" id="botaoAcaoRetornarSelecaoDocumento">
					<img alt="" src="documento/img/IconLeft.png"/>
				</div>
		
				<div className="selecaoDocumentoBotoes">
		
					<div id="selecaoDocumentoFrente" className="selecaoDocumentoTipoBotao">
					<img alt="" className="iconeDoc" id="iconeFrente" src=""/>
					<p className="selecaoDocumentoTipoTexto">FOTO DA FRENTE</p>
					</div>
		
					<div id="selecaoDocumentoVerso" className="selecaoDocumentoTipoBotao">
						<div className="selecaoDocumentoTipoLinha">
					</div>
		
					<img alt="" alt="" className="iconeDoc" id="iconeVerso" src=""/>
					<p className="selecaoDocumentoTipoTexto">FOTO DO VERSO</p>
					</div>
		
					<div id="selecaoDocumentoFrenteVerso" className="selecaoDocumentoTipoBotao">
					<div className="selecaoDocumentoTipoLinha">
					</div>
		
					<img alt="" className="iconeDoc" id="iconeFrenteVerso" src=""/>
					<p className="selecaoDocumentoTipoTexto">FRENTE E VERSO</p>
					</div>
		
					<div id="selecaoDocumentoCnhDigital" className="selecaoDocumentoTipoBotao">
					<img alt="" className="iconeDoc" id="iconeCnhDigital" src=""/>
					<p className="selecaoDocumentoTipoTexto">CNH DIGITAL</p>
					</div>
		
					<div id="ladoCPF" className="ladoCPF">
		
					<div className="selecaoDocumentoTipoLinha">
					</div>
		
					<div id="selecaoDocumentoCPF" className="selecaoDocumentoTipoBotao">
						<img alt="" className="iconeDoc" id="iconeCPF" src="documento/img/IconCPF.png"/>
						<p className="selecaoDocumentoTipoTexto">CPF</p>
					</div>
		
					</div>
		
				</div>
		
				</div>
		
			</div>
		
			<div id="botaoAcaoEnviar" className="botaoAcao documentoBotaoAcao documentoBotaoAcaoEnviar"><p id="textoBotaoAcaoTutorial" className="textoBotaoAcaoEnviar">ENVIAR</p></div>
		</div>
		
		<div id="selecaoDocumentoReview" className="selecaoDocumentoReview">
		</div>
		
		<div id="upload" className="uploadContainer">
		
			<div id="uploadManual" className="uploadManualContainer">
			<input className="hidden" id="docFileInput" type="file" accept="image/jpeg" />
		
			<div id="uploadManualButton" className="uploadManualButton centralizado">
				<img alt="" src="documento/img/IconGallery.png"/>
				<p className="corBranco">Escolher arquivo</p>
			</div>
		
			<div id="uploadManualCancelar" className="uploadManualCancelar">
				<img alt="" src="documento/img/IconFechar.png" />
			</div>
		
			</div>
		
			<div id="uploadAutomatico" className="uploadAutomatico">
			<div data-role="page" id="capturescreen" className="capturescreen">
				<div id="ID_CAMERA_DIV" className="ID_CAMERA_DIV">
              
			  </div>
			</div>
		
			<div id="uploadAutomaticoCancelar" className="uploadManualCancelar">
				<img alt="" src="documento/img/IconFechar.png" />
			</div>
		
			</div>
		</div>
		
		<div id="documentoEmAnalise" className="documentoEmAnalise">
			<div className="centralizado textCenter">
			<img alt="" src="documento/img/IconEmAnalise.png"/>
			<p><b>Em análise</b></p>
			<p>Aguarde um instante</p>
			</div>
		</div>
		
		<div id="docReview" className="docReview">
			<div className="textCenter docPadding">
			<img alt="" id="reviewImagem" src="" className="reviewImagem"/>
			</div>
		
			<div className="reviewImagemText">
			<p><b className="corBranco">Revisar foto.</b></p>
			<p className="corBranco">A foto está nítida e bem iluminada?<br/>Lembre-se que não pode ter reflexo.</p>
			</div>
		
			<div className="reviewImagemBotoes">
			<div id="botaoAcaoTirarOutra" className="botaoAcaoReview"><p className="textoBotaoAcaoReview">TIRAR OUTRA</p></div>
			<div id="botaoAcaoFicouBoa" className="botaoAcaoReview botaoAcaoReviewRight"><p className="textoBotaoAcaoReviewPreto">FICOU BOA</p></div>
			</div>
		
		</div>
				
		<div id="docErro" className="docErro">
			<div className="centralizado textCenter">
			<img alt="" src="documento/img/DocError.png"/>
			<p><b className="corPreto">Atenção</b></p>
			<p className="corPreto" id="docErroText"></p>
			</div>
		
			<div id="botaoAcaoTentarCapturarNovamente" className="documentoBotaoAcao"><p className="textoBotaoAcao centralizado">TENTAR NOVAMENTE</p></div>
		</div>
		
		<div id="documentoRotacioneAparelho" className="documentoRotacioneAparelho">
			<div className="centralizado textCenter">
			<img alt="" src="documento/img/DocumentoErroRotacione.png"/>
			<p>Rotacione seu aparelho para a vertical</p>
			</div>
		</div>
		
		<div id="documentoResultado" className="documentoResultado">
			<div className="centralizado textCenter">
			<img alt="" id="selfieImagemResultado" src="documento/img/DocIconSucesso.png"/>
		
			<p><b>Pronto!</b></p>
			<p>Sua foto foi registrada com sucesso.</p>
			</div>
		
			<div id="botaoAcarFinalizarDocumento" className="botaoAcao"><p className="textoBotaoAcao centralizado">FINALIZAR</p></div>
		</div>
				
		</div>
	</div>
  	);
}

export default DocumentoView;
