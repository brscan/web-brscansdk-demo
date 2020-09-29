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

appendElement("documento/js/documento_libs.js", "script");
appendElement("documento/js/KfxWebSDK/KfxWebSDK.js", "script");
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
			window.removeEventListener('load', removeDocumento)  
		}

	}, []);
	
	const carregaDocumento = () => {
		try {
            var documento = new window.Documento(
				//chave
				"  ",
   
			 document.getElementById("documentoContainer"),
   
			 (documentos) => {
				 console.log("documentoc all back", documentos);
				documentoSucesso(documentos);
			 },
   
			 (erroId, mensagem) => {
			   documentoErro(erroId, mensagem);
   
			 }
		   );
    
		   documento.iniciaDocumento();
        }
        catch(erro) {
            console.error(erro);
		}
		
	}

	const removeDocumento = () => {
		removeElement("documento/js/documento_libs.js", "script");
		removeElement("documento/js/KfxWebSDK/KfxWebSDK.js", "script");
		removeElement("documento/js/documento.min.js", "script");

		removeElement("documento/css/brscan-sdk-styles-fonts.css", "link");
		removeElement("documento/css/brscan-sdk-documento.css", "link");
		removeElement("documento/css/tiny-slider-styles.css", "link");
		removeElement("documento/css/tiny-slider.css", "link");
		removeElement("documento/js/KfxWebSDK/CSS/KfxWebSDK.css", "link");
	}

	return (
        <div className="App">
            <div id="documentoContainer" className="documentoContainer">
				<div id="tutorialSlider" className="tutorialSlider">
				<div className="documentoTutorial">
					<div className="item">
					<div className="tutorialIcone">
						<div><img src="documento/img/DocInicioIcon.png"/></div>
					</div>
					<div className="tutorialTexto">
						<h1>Vamos lá!</h1>
						<p>Tenha seus documentos em mãos,<br/>RG ou CNH.</p>
					</div>
					</div>
					<div className="item">
					<div className="tutorialIcone">
						<div><img src="documento/img/DocIconLuz.png"/></div>
					</div>
					<div className="tutorialTexto">
						<h1>Escolha um local<br/>iluminado</h1>
						<p>Posicione seu documento em uma<br/>superfície lisa e, de preferência, escura.</p>
					</div>
					</div>

					<div className="item">
					<div className="tutorialIcone">
						<div><img src="documento/img/DocIconPlastico.png"/></div>
					</div>
					<div className="tutorialTexto">
						<h1>Retire o documento<br/>do plástico</h1>
					</div>
					</div>

					<div className="item">
					<div className="tutorialIcone">
						<div><img src="documento/img/DocIconFundoEstampado.png"/></div>
					</div>
					<div className="tutorialTexto">
						<h1>Evite fundos<br/>estampados</h1>
					</div>
					</div>

					<div className="item">
					<div className="tutorialIcone">
						<div><img src="documento/img/DocIconReflexo.png"/></div>
					</div>
					<div className="tutorialTexto">
						<h1>Evite reflexos no documento</h1>
					</div>
					</div>

					<div className="item">
					<div className="tutorialIcone">
						<div><img src="documento/img/DocIconFrenteDocumento.png"/></div>
					</div>
					<div className="tutorialTexto">
						<h1>Fotografe a frente do documento</h1>
						<p>Use o lado que possui sua foto.</p>
					</div>
					</div>

					<div className="item">
					<div className="tutorialIcone">
						<div><img src="documento/img/DocIconTrasDocumento.png"/></div>
					</div>
					<div className="tutorialTexto">
						<h1>Fotografe o verso do documento</h1>
						<p>Use o lado que não possui foto.</p>
					</div>
					</div>
				</div>

				<div id="botaoAcaoTutorial" className="botaoAcao"><p id="textoBotaoAcaoTutorial" className="textoBotaoAcao centralizado">AVANÇAR</p></div>
				</div>

				<div id="selecaoDocumentoContainer" className="selecaoDocumentoContainer">

					<div className="selecaoDocumento">
					<div className="selecaoDocumentoTipo">
						<h1>
							Selecione o tipo de<br/>documento.
						</h1>

						<div className="selecaoDocumentoTipoContainer">

						<div className="selecaoDocumentoBotoes">
							<div id="selecaoDocumentoTipoRG" className="selecaoDocumentoTipoBotao">
							<img src="documento/img/IconRG.png"/>
							<p className="selecaoDocumentoTipoTexto">USAR MEU RG</p>
							</div>

							<div className="selecaoDocumentoTipoLinha">
							<img src="documento/img/Line.png"/>
							</div>

							<div id="selecaoDocumentoTipoCNH" className="selecaoDocumentoTipoBotao">
							<img src="documento/img/IconCNH.png"/>
							<p className="selecaoDocumentoTipoTexto">USAR MINHA CNH</p>
							</div>
						</div>

						</div>
					</div>

					<div className="selecaoDocumentoLado">
						<div className="botaoAcaoRetornarSelecaoDocumento" id="botaoAcaoRetornarSelecaoDocumento">
						<img src="documento/img/IconLeft.png"/>
						</div>

						<h1 id="textoDocumentoLado">

						</h1>

						<div className="selecaoDocumentoBotoes">

						<div id="selecaoDocumentoFrente" className="selecaoDocumentoTipoBotao">
							<img className="iconeDoc" id="iconeFrente" src=""/>
							<p className="selecaoDocumentoTipoTexto">FOTO DA FRENTE</p>
						</div>

						<div className="selecaoDocumentoTipoLinha">
							<img src="documento/img/Line.png"/>
						</div>

						<div id="selecaoDocumentoVerso" className="selecaoDocumentoTipoBotao">
							<img className="iconeDoc" id="iconeVerso" src=""/>
							<p className="selecaoDocumentoTipoTexto">FOTO DO VERSO</p>
						</div>

						<div className="selecaoDocumentoTipoLinha">
							<img className="selecaoDocumentoLinha" src="documento/img/Line.png"/>
						</div>

						<div id="selecaoDocumentoFrenteVerso" className="selecaoDocumentoTipoBotao">
							<img className="iconeDoc" id="iconeFrenteVerso" src=""/>
							<p className="selecaoDocumentoTipoTexto">FRENTE E VERSO</p>
						</div>

						</div>

					</div>

					</div>

					<div id="botaoAcaoEnviar" className="botaoAcao botaoAcaoEnviar"><p id="textoBotaoAcaoTutorial" className="textoBotaoAcaoEnviar centralizado corPreto">ENVIAR</p></div>
				</div>

				<div id="selecaoDocumentoReview" className="selecaoDocumentoReview">
				<h1>teste</h1>
				</div>

				<div id="upload" className="uploadContainer">

				<div id="uploadManual" className="uploadManualContainer">
					<input className="hidden" id="docFileInput" type="file" accept=".jpg,.jpeg,.png" />

					<div id="uploadManualButton" className="uploadManualButton centralizado">
					<img src="documento/img/IconGallery.png"/>
					<p className="corBranco">Escolher arquivo</p>
					</div>

					<div id="uploadManualCancelar" className="uploadManualCancelar">
					<img src="documento/img/IconFechar.png" />
					</div>

				</div>

				<div id="uploadAutomatico" className="uploadAutomatico">
					<div data-role="page" id="capturescreen" className="capturescreen">
					<div id="ID_CAMERA_DIV" className="ID_CAMERA_DIV">

					</div>
					</div>
				</div>

				<div id="uploadAutomaticoCancelar" className="uploadManualCancelar">
					<img src="documento/img/IconFechar.png" />
				</div>
				</div>

				<div id="documentoEmAnalise" className="documentoEmAnalise">
				<div className="centralizado textCenter">
					<img src="documento/img/IconEmAnalise.png"/>
					<p><b>Em análise</b></p>
					<p>Aguarde um instante</p>
				</div>
				</div>


				<div id="docReview" className="docReview">
				<div className="textCenter docPadding">
					<img id="reviewImagem" src="" className="reviewImagem"/>
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
					<img src="documento/img/DocError.png"/>
					<p><b className="corPreto">Atenção</b></p>
					<p className="corPreto" id="docErroText"></p>
				</div>

				<div id="botaoAcaoTentarCapturarNovamente" className="botaoAcao"><p className="textoBotaoAcao centralizado">TENTAR NOVAMENTE</p></div>
				</div>

				<div id="documentoRotacioneAparelho" className="documentoRotacioneAparelho">
				<div className="centralizado textCenter">
					<img src="documento/img/DocumentoErroRotacione.png"/>
					<p>Rotacione seu aparelho para a vertical</p>
				</div>
				</div>

				<div id="documentoResultado" className="documentoResultado">
				<div className="centralizado textCenter">
					<img id="selfieImagemResultado" src="documento/img/DocIconSucesso.png"/>

					<p><b>Pronto!</b></p>
					<p>Sua foto foi registrada com sucesso.</p>
				</div>

				<div id="botaoAcarFinalizarDocumento" className="botaoAcao"><p className="textoBotaoAcao centralizado">FINALIZAR</p></div>
				</div>

				<div id="loadingInit" className="loadingInit">
						<div className="centralizado">
							<img src="documento/img/Loading.gif" />
						</div>
					</div>
				</div>

		</div>

  	);
}

export default DocumentoView;
