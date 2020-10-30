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
appendElement("selfie/js/common/pico.js", "script");
appendElement("selfie/js/common/tinyslider.js", "script");

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
				}
			);
        }
        catch(erro) {
            console.error(erro);
		}
		
	}

	const removeSelfie = () => {
		removeElement("selfie/js/selfie_libs.js", "script");
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
							<canvas id="selfieCanvas" className="selfieCanvas"></canvas>
						</div>
						<div className="selfieMaskCanvas centralizado">
							<img className="selfieMaskCanvas centralizado" id="selfieMaskId" src="selfie/img/SelfieFrameMask.png"/>
							<img className="selfieMaskCanvas centralizado" id="selfieMaskIdDetails" src="selfie/img/SelfieFrameMaskDetails.png"/>
							<img className="selfieMaskCanvas centralizado" id="selfieMaskIdOval" src="selfie/img/SelfieFrameMaskOval.png"/>
						</div>
					</div>
					<div id="selfieAvisoContainer" className="webcamAviso"><p id="selfieTextoAviso">Aguarde ...</p></div>
					<div id="selfieBotaoAcaoCancelar" className="selfieBotaoAcaoCancelar"><img id="botaoAcaoCancelarImagem" src="selfie/img/IconFechar.png"/></div>
				</div>

				<div id="selfieLoading" className="selfieLoading">
					<div className="centralizado">
						<img src="selfie/img/Loading.gif" />
					</div>
				</div>
			
			</div>
			
    	</div>
  	);
}

export default SelfieView;
