var CONFIGURACAO_DOCUMENTOS = {
    documentoUnico: true,
    documentoSemCPF: false,
    documentoPath: "documento/img",
    documentos :
    [
      {
          "nome" : "RG",
          "desc" : "USAR MEU RG",
          "desc_sel" : "Escolha como quer enviar o seu RG",
          "id": "rg",
          "icones" : {
              "frente" : "documento/img/IconRGFrente.png",
              "verso" : "documento/img/IconRGVerso.png",
              "frenteverso" : "documento/img/IconRGFrenteVerso.png"
          }
      },
      {
          "nome" : "CNH",
          "desc" : "USAR MINHA CNH",
          "desc_sel" : "Escolha como quer enviar a sua CNH",
          "id" : "cnh",
          "icones" : {
              "frente" : "documento/img/IconCNHFrente.png",
              "verso" : "documento/img/IconCNHVerso.png",
              "frenteverso" : "documento/img/IconCNHFrenteVerso.png"
          }
      },
      {
          "nome" : "OUTRO DOCUMENTO",
          "desc" : "OUTRO DOCUMENTO",
          "desc_sel" : "Escolha como quer enviar outro documento",
          "id" : "outro",
          "icones" : {
              "frente" : "documento/img/IconOutroDocFrente.png",
              "verso" : "documento/img/IconOutroDocVerso.png",
              "frenteverso" : "documento/img/IconOutroDocFrenteVerso.png"
          }
  
      }
    ]
  }