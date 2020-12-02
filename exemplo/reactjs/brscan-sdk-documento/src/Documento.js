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
		<div id="documentoContainer" class="documentoContainer">
			<div id="selecaoDocumentoContainer" class="selecaoDocumentoContainer">

			<div id="selecaoDocumento" class="selecaoDocumento">
				<div id="selecaoDocumentoTipo" class="selecaoDocumentoTipo">
				<h1>
					Selecione o tipo de<br/>documento.
				</h1>
		
				<div class="selecaoDocumentoTipoContainer">
		
					<div id="selecaoDocumentoBotoes" class="selecaoDocumentoBotoes">
		
					</div>
		
				</div>
				</div>
		
				<div id="selecaoDocumentoLado" class="selecaoDocumentoLado">
		
				<h1 class="textoDocumentoLado" id="textoDocumentoLado">
		
				</h1>
		
				<div class="botaoAcaoRetornarSelecaoDocumento" id="botaoAcaoRetornarSelecaoDocumento">
					<img src="documento/img/IconLeft.png"/>
				</div>
		
				<div class="selecaoDocumentoBotoes">
		
					<div id="selecaoDocumentoFrente" class="selecaoDocumentoTipoBotao">
					<img class="iconeDoc" id="iconeFrente" src=""/>
					<p class="selecaoDocumentoTipoTexto">FOTO DA FRENTE</p>
					</div>
		
		
					<div id="selecaoDocumentoVerso" class="selecaoDocumentoTipoBotao">
					<div class="selecaoDocumentoTipoLinha">
					</div>
		
					<img class="iconeDoc" id="iconeVerso" src=""/>
					<p class="selecaoDocumentoTipoTexto">FOTO DO VERSO</p>
					</div>
		
					<div id="selecaoDocumentoFrenteVerso" class="selecaoDocumentoTipoBotao">
					<div class="selecaoDocumentoTipoLinha">
					</div>
		
					<img class="iconeDoc" id="iconeFrenteVerso" src=""/>
					<p class="selecaoDocumentoTipoTexto">FRENTE E VERSO</p>
					</div>
		
					<div id="selecaoDocumentoCnhDigital" class="selecaoDocumentoTipoBotao">
					<img class="iconeDoc" id="iconeCnhDigital" src=""/>
					<p class="selecaoDocumentoTipoTexto">CNH DIGITAL</p>
					</div>
		
					<div id="ladoCPF" class="ladoCPF">
		
					<div class="selecaoDocumentoTipoLinha">
					</div>
		
					<div id="selecaoDocumentoCPF" class="selecaoDocumentoTipoBotao">
						<img class="iconeDoc" id="iconeCPF" src="documento/img/IconCPF.png"/>
						<p class="selecaoDocumentoTipoTexto">CPF</p>
					</div>
		
					</div>
		
				</div>
		
				</div>
		
			</div>
		
			<div id="botaoAcaoEnviar" class="botaoAcao documentoBotaoAcao documentoBotaoAcaoEnviar"><p id="textoBotaoAcaoTutorial" class="textoBotaoAcaoEnviar">ENVIAR</p></div>
		</div>
		
		<div id="selecaoDocumentoReview" class="selecaoDocumentoReview">
		</div>
		
		<div id="upload" class="uploadContainer">
		
			<div id="uploadManual" class="uploadManualContainer">
			<input class="hidden" id="docFileInput" type="file" accept="image/jpeg" />
		
			<div id="uploadManualButton" class="uploadManualButton centralizado">
				<img src="documento/img/IconGallery.png"/>
				<p class="corBranco">Escolher arquivo</p>
			</div>
		
			<div id="uploadManualCancelar" class="uploadManualCancelar">
				<img src="documento/img/IconFechar.png" />
			</div>
		
			</div>
		
			<div id="uploadAutomatico" class="uploadAutomatico">
			<div data-role="page" id="capturescreen" class="capturescreen">
		
			</div>
		
			<div id="uploadAutomaticoCancelar" class="uploadManualCancelar">
				<img src="documento/img/IconFechar.png" />
			</div>
		
			</div>
		</div>
		
		<div id="documentoEmAnalise" class="documentoEmAnalise">
			<div class="centralizado textCenter">
			<img src="documento/img/IconEmAnalise.png"/>
			<p><b>Em análise</b></p>
			<p>Aguarde um instante</p>
			</div>
		</div>
		
		<div id="docReview" class="docReview">
			<div class="textCenter docPadding">
			<img id="reviewImagem" src="" class="reviewImagem"/>
			</div>
		
			<div class="reviewImagemText">
			<p><b class="corBranco">Revisar foto.</b></p>
			<p class="corBranco">A foto está nítida e bem iluminada?<br/>Lembre-se que não pode ter reflexo.</p>
			</div>
		
			<div class="reviewImagemBotoes">
			<div id="botaoAcaoTirarOutra" class="botaoAcaoReview"><p class="textoBotaoAcaoReview">TIRAR OUTRA</p></div>
			<div id="botaoAcaoFicouBoa" class="botaoAcaoReview botaoAcaoReviewRight"><p class="textoBotaoAcaoReviewPreto">FICOU BOA</p></div>
			</div>
		
		</div>
				
		<div id="docErro" class="docErro">
			<div class="centralizado textCenter">
			<img src="documento/img/DocError.png"/>
			<p><b class="corPreto">Atenção</b></p>
			<p class="corPreto" id="docErroText"></p>
			</div>
		
			<div id="botaoAcaoTentarCapturarNovamente" class="documentoBotaoAcao"><p class="textoBotaoAcao centralizado">TENTAR NOVAMENTE</p></div>
		</div>
		
		<div id="documentoRotacioneAparelho" class="documentoRotacioneAparelho">
			<div class="centralizado textCenter">
			<img src="documento/img/DocumentoErroRotacione.png"/>
			<p>Rotacione seu aparelho para a vertical</p>
			</div>
		</div>
		
		<div id="documentoResultado" class="documentoResultado">
			<div class="centralizado textCenter">
			<img id="selfieImagemResultado" src="documento/img/DocIconSucesso.png"/>
		
			<p><b>Pronto!</b></p>
			<p>Sua foto foi registrada com sucesso.</p>
			</div>
		
			<div id="botaoAcarFinalizarDocumento" class="botaoAcao"><p class="textoBotaoAcao centralizado">FINALIZAR</p></div>
		</div>
				
		</div>
	</div>
  	);
}

export default DocumentoView;
