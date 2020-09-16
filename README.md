# web-brscansdk-demo

O objetivo deste DEMO é dar uma visão técnica do processo teste de prova de vida, captura de selfie e captura do documento de identificação do cliente, suas dependências e seus meios de implementação em sistemas terceiros.

No manual, serão apresentadas as dependências necessárias para o correto funcionamento do componente, exemplos e orientações de como instanciar o processo dentro de uma aplicação e munir o consumidor com um fluxo que detalha todas as integrações que são realizadas durante este processo.

Todo o processo de captura não registra imagens no componente do cliente e são descartadas logo que enviadas para o fluxo de análise ou entregues ao consumidor.

Para o correto funcionamento do componente, o utilizador precisa estar conectado à internet com permissão de acesso ao BrFlow (https://www.brflow.com.br) e Liveness ( https://liveness.brscan.com.br). Todas as requisições são realizadas usando o protocolo HTTPS.

As soluções aqui apresentadas não se propõe à tratar tecnicamente documentos que originalmente não estejam em condições adequadas de captura (estado de conservação, envolvidos sob invólucros plásticos, etc.).

### Pré requisitos
	Os seguintes browsers são suportados pelos componentes:

- Chrome >= 52
- Safari >= 11
- Firefox >= 36
- Edge >= 12

	Os seguintes sistemas operacionais são suportados pelos componentes:

- Windows >= 8
- Mac OSX >= 10.0
- Android >= 5
- iOS >= 10

## As premissas para utilização dos componentes são:
- Para o uso dos componentes é necessário ter uma licença válida, gerada pela BrScan;
- Para a utilização dos componentes em modo mobile (smartphones e tablets) o aparelho deverá sempre estar no modo vertical;
- Um alerta é exibido em tela cheia ao usuário informando para rotacionar o aparelho caso ele se encontre na horizontal;
- Os componentes em HTML (div) deverão estar ocupando toda a tela do aparelho (width 100%, height 100%) para que os componentes possam ser posicionados corretamente nas várias resoluções disponíveis.

## Integração com o Componente de Captura de Selfie

As dependências e artefatos do componente devem ser importados no Header da página em HTML:

```html
<link rel="stylesheet" href="css/brscan-sdk-fonts.css">
<link rel="stylesheet" href="css/brscan-sdk-selfie.css">
<script src="js/libs/selfie_libs.js"></script>
<script src="js/Selfie.js"></script>
```
O componente deve ser inicializado com a seguinte chamada:

```javascript
var selfie = new Selfie(
     chave,
     document.getElementById('selfieContainer'),
        (selfie, dados) => {
	         console.log("Callback de sucesso");
        },
        (erroId, mensagem) => {
	         console.log("Callback contendo informações do erro");
         }
);

try {
   selfie.iniciaCaptura();
} catch(erro) {
   console.error(erro);
}
```

Para o funcionamento do script, é necessário existir um código pré-existente contendo o elemento em HTML (div) que irá suportar o componente de captura da Selfie.
```html
<div id="selfieContainer" class="selfieContainer">
   <video id="selfieVideo" playsinline autoplay muted></video>
   <canvas id="selfieCanvas"></canvas>
</div>
```
## Integração com o Componente de Captura de Documento

As dependências e artefatos do componente devem ser importados no Header da página em HTML.

```html
<link rel="stylesheet" href="css/brscan-sdk-fonts.css">
<link rel="stylesheet" href="css/brscan-sdk-documento.css">
<script src="js/libs/documento_libs.js"></script>
<script src="js/Documento.js"></script>
```
O componente deve ser inicializado com a seguinte chamada:
```javascript
var documento = new Documento(
   chave,
   document.getElementById(documentoContainer'),
   (arrayDocumentosBlob, dados) => {
	    console.log("Callback de sucesso");
   },
   (erroId, mensagem) => {
	    console.log("Callback contendo informações do erro");
    }
);

try {
   documento.iniciaCaptura();
} catch(erro) {
   console.error(erro);
}
```
Para o funcionamento do script, é necessário existir um código pré-existente contendo o elemento em HTML (div) que irá suportar o componente de captura da Selfie.

```html
<div id="documentoContainer" class="documentoContainer">
</div>
```
## Integração com o Componente Face Match

As dependências e artefatos do componente devem ser importados no Header da página em HTML:
```html
<script src="js/FaceMatch.js"></script>
```
O componente deve ser inicializado com a seguinte chamada:

```javascript
var faceMatch = new FaceMatch(
  chave,
  documentoBlob,
  selfieBlob,
  (dados) => {
	  console.log("Callback de sucesso");
  },
  (erroId, mensagem) => {
	  console.log("Callback contendo informações do erro");
  }
);

try {
   faceMatch.iniciaMatch();
} catch(erro) {
   console.error(erro);
}
```
