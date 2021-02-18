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

appendElement("selfie/js/common/getusermedia.js", "script");
appendElement("selfie/js/common/polyfil.js", "script");
appendElement("selfie/js/common/tinyslider.js", "script");

appendElement("selfie/js/tfjs.js", "script");
appendElement("selfie/js/tf-backend-wasm.js", "script");
appendElement("selfie/js/blazeface.js", "script");

appendElement("selfie/js/selfie_data.js", "script");
appendElement("selfie/js/selfie.min.js", "script");

appendElement("selfie/css/brscan-sdk-selfie-fonts.css", "link");
appendElement("selfie/css/brscan-sdk-selfie.css", "link");
appendElement("selfie/css/tiny-slider-styles.css", "link");
appendElement("selfie/css/tiny-slider.css", "link");

function SelfieView(props) {
	const selfieSucesso = props.selfieSucesso;
	const selfieErro = props.selfieErro;

	useEffect(() => {
		window.addEventListener('load', carregaSelfie);

		return () => {
			window.removeEventListener('load', removeSelfie)  
		}

	}, []);
	
	const carregaSelfie = () => {
		try {
            
			let selfie = new window.Selfie(
				// chave
				" ",
				
				// elemento div
				document.getElementById('selfieContainer')

			);
	
			selfie.iniciaSelfie(
				// sucesso
				(selfie) => {
					selfieSucesso(selfie);				
				},
	
				// falha
				(erroId, mensagem) => {
					selfieErro(erroId, mensagem);
				},

				// exibe tutorial
				false
			);
        }
        catch(erro) {
            console.error(erro);
		}
		
	}

	const removeSelfie = () => {
		removeElement("selfie/js/tfjs.js", "script");
		removeElement("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@2.7.0/dist/tf-backend-wasm.js", "script");
		removeElement("selfie/js/blazeface.js", "script");
		removeElement("selfie/js/selfie_data.js", "script");
		removeElement("selfie/js/selfie.min.js", "script");

		removeElement("selfie/css/brscan-sdk-selfie-fonts.css", "link");
		removeElement("selfie/css/brscan-sdk-selfie.css", "link");
		removeElement("selfie/css/tiny-slider-styles.css", "link");
		removeElement("selfie/css/tiny-slider.css", "link");
	}

	return (
        <div className="App">

<div id="selfieContainer" className="selfieContainer">
		<div id="selfieWebcamParent" className="selfieWebcamParent">
			<div className="selfieWebcam">
				<div id="selfieContainerParent" className="selfieContainerParent">
					<video className="posicaoAbsolute" playsInline autoPlay muted></video>
					<canvas id="selfieCanvas" className="selfieCanvas" width="640" height="480"></canvas>
				</div>
				<div className="selfieMaskCanvas semOverflow centralizado">
					<img alt="" className="selfieMaskCanvas centralizado" id="selfieMaskId" src="selfie/img/SelfieFrameMask.png"/>
					<img alt="" className="selfieMaskCanvas centralizado" id="selfieMaskIdDetails" src="selfie/img/SelfieFrameMaskDetails.png"/>
					<img alt="" className="selfieMaskCanvas centralizado" id="selfieMaskIdOval" src="selfie/img/SelfieFrameMaskOval.png"/>
				</div>
			</div>
			
			<div id="uploadManual" className="uploadManualContainer">  
				<input className="hidden" id="docFileInput" type="file" capture="user" accept="image/jpeg" />
		
				<div id="uploadManualButton" className="uploadManualButton centralizado">
					<img alt="" className="iconeDoc" src="selfie/img/IconGallery.png"/>
					<p className="corBranco">Escolher arquivo</p>
				</div>
			
				<div id="uploadManualCancelar" className="uploadManualCancelar">
					<img alt="" src="selfie/img/IconFechar.png" />
				</div>
			</div>
			
			<div id="documentoQuestaoTimeout" className="documentoQuestaoTimeout">
				<div className="centralizado textCenter">
				  <h1>Não foi possível capturar sua Selfie. Você será direcionado para capturar no aplicativo de câmera do seu aparelho.</h1>
				  <div>
					<b><p id="aceitaUploadManual">Ok</p></b> <b><p id="declinaUploadManual">Cancelar</p></b>
				  </div>
				</div>
			  </div>

			<div id="selfieAvisoContainer" className="webcamAviso"><p className="selfieTextoAviso" id="selfieTextoAviso">Aguarde ...</p></div>
			<div id="selfieBotaoAcaoCancelar" className="selfieBotaoAcaoCancelar"><img alt="" id="botaoAcaoCancelarImagem" src="selfie/img/IconFechar.png"/></div>
		</div>
	</div>
	
	<div id="selfieRotacioneAparelho" className="selfieRotacioneAparelho">
		<div className="centralizado alignCenter">
			<img alt="" src="selfie/img/SelfieErroRotacione.png"/>
			<p>Rotacione seu aparelho para a vertical</p>
		</div>
	</div>

	<div id="selfieEmAnalise" className="selfieEmAnalise">
		<div className="centralizado alignCenter">
			<img alt="" src="selfie/img/IconEmAnalise.png"/>
			<p><b>Em análise</b></p>
			<p>Aguarde um instante</p>
		</div>
	</div>

	<div id="selfieAlertaErro" className="selfieAlertaErro">
		<div className="centralizado alignCenter">
			<img alt="" id="selfieAlertaErroImagem" src="selfie/img/IconFalha.png"/>
			<p><b id="selfieAlertaErroHeader">Atenção</b></p>
			<p id="selfieAlertaErroMensagem">...</p>
		</div>
		<div id="botaoAcaoTentarNovamente" className="botaoAcao"><p className="selfieTextoBotaoAcao centralizado">TENTAR NOVAMENTE</p></div>
	</div>

	<div id="selfieLoading" className="selfieLoading">
		<div className="centralizado">
			<img alt="" src="selfie/img/Loading.svg" />
		</div>
	</div>
			
    	</div>
  	);
}

export default SelfieView;
