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

appendElement("selfie/js/selfie_libs.js", "script");
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
            const selfie = new window.Selfie(
                // chave
                "",
    
                // div
                document.getElementById('selfieContainer'),
    
                // sucesso
                (selfie) => {
					window.escondeObj("selfieContainer")
					selfieSucesso(selfie);
					
                },
    
                // falha
                (erroId, mensagem) => {
                    window.escondeObj("selfieResultado");
                    selfieErro(erroId, mensagem);
                }
            );
    
            selfie.iniciaSelfie();
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
				<div id="tutorialSlider" style={{display: 'none'}}>
					<div className="selfieTutorial">
						<div className="item">
							<div className="tutorialIcone">
								<div><img src="selfie/img/SelfieIconIntro.png"/></div>
							</div>
							<div className="tutorialTexto">
								<h1>Olá,</h1>
								<p>Hora de tirar sua foto de identificação.<br/>Antes de começar, algumas dicas.</p>
							</div>
						</div>
						<div className="item">
							<div className="tutorialIcone">
								<div><img src="selfie/img/SelfieIconLuz.png"/></div>
							</div>
							<div className="tutorialTexto">
								<h1>Iluminação</h1>
								<p>Escolha um lugar com uma Iluminação adequada</p>
							</div>
						</div>
						<div className="item">
							<div className="tutorialIcone">
								<div><img src="selfie/img/SelfieIconAcessorios.png"/></div>
							</div>
							<div className="tutorialTexto">
								<h1>Evite utilizar acessórios</h1>
								<p>Óculos escuros, boné, chapéu ou máscara<br/>atrapalham o processo da captura.</p>
							</div>
						</div>
						<div className="item">
							<div className="tutorialIcone">
								<div><img src="selfie/img/SelfieIconEnquadramento.png"/></div>
							</div>
							<div className="tutorialTexto">
								<h1>Enquadre bem</h1>
								<p>Seu rosto deve estar bem<br/>no centro da tela</p>
							</div>
						</div>
					</div>
					<div id="botaoAcaoTutorial" className="botaoAcao"><p id="textoBotaoAcaoTutorial" className="textoBotaoAcao centralizado">AVANÇAR</p></div>
				</div>

				<div id="selfieWebcamParent" className="selfieWebcamParent">
					<div className="selfieWebcam">
						<div id="selfieContainerParent" className="selfieContainerParent">
							<video className="posicaoAbsolute" playsInline autoPlay muted></video>
							<canvas className="selfieCanvas"></canvas>
						</div>

						<div className="selfieMaskCanvas centralizado">
							<img className="selfieMaskCanvas centralizado" id="selfieMaskId" src="selfie/img/SelfieFrameMask.png"/>
							<img className="selfieMaskCanvas centralizado" id="selfieMaskIdDetails" src="selfie/img/SelfieFrameMaskDetails.png"/>
							<img className="selfieMaskCanvas centralizado" id="selfieMaskIdOval" src="selfie/img/SelfieFrameMaskOval.png"/>
						</div>
					</div>

					<div id="selfieAvisoContainer" className="webcamAviso"><p id="selfieTextoAviso">Aguarde ...</p></div>
					<div id="botaoAcaoCancelar" className="botaoAcaoCancelar"><img id="botaoAcaoCancelarImagem" src="selfie/img/IconFechar.png"/></div>
				</div>

				<div id="selfieRotacioneAparelho" className="selfieRotacioneAparelho">
					<div style={{textAlign: 'center'}} className="centralizado">
						<img style={{width: '50%', height: '50%'}} src="selfie/img/SelfieErroRotacione.png"/>
						<p>Rotacione seu aparelho para a vertical</p>
					</div>
				</div>

				<div id="selfieEmAnalise" className="selfieEmAnalise">
					<div style={{textAlign: 'center'}} className="centralizado">
						<img src="selfie/img/IconEmAnalise.png"/>
						<p><b>Em análise</b></p>
						<p>Aguarde um instante</p>
					</div>
				</div>

				<div id="selfieAlertaErro" className="selfieAlertaErro">
					<div style={{textAlign: 'center'}} className="centralizado">
						<img id="selfieAlertaErroImagem" src="selfie/img/IconFalha.png"/>
						<p><b id="selfieAlertaErroHeader">Atenção</b></p>
						<p id="selfieAlertaErroMensagem">...</p>
					</div>
					<div id="botaoAcaoTentarNovamente" className="botaoAcao"><p className="textoBotaoAcao centralizado">TENTAR NOVAMENTE</p></div>
				</div>
			</div>

			<div id="selfieResultado" className="selfieResultado">
				<div style={{textAlign: 'center'}} className="centralizado">
					<img id="selfieImagemResultado" style={{width: '50%', height: '50%'}} src=""/>

					<p><b>Pronto!</b></p>
					<p>Sua foto foi registrada com sucesso.</p>
				</div>

				<div id="botaoAcarFinalizarSelfie" className="botaoAcao"><p className="textoBotaoAcao centralizado">FINALIZAR</p></div>
			</div>

			<div id="loading" className="loading">
				<div className="centralizado">
					<img src="selfie/img/Loading.gif" />
				</div>
			</div>
    	</div>
  	);
}

export default SelfieView;
