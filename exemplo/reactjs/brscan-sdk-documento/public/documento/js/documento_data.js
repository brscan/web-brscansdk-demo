var CONFIGURACAO_DOCUMENTOS = {
    documentoUnico: true,
    documentoCancelavel: false,
    documentoSemCPF: false,
    documentoSemReview: true,
    limiteDeTentativasAutomaticas: 0,
    timeOutCapturaAutomatica: 0,
    documentoPath: "documento/img",
    aceiteUploadManual: "image/jpeg,application/pdf",
    aceiteUploadManualCamera: true,
    somenteUploadManual: false,
    documentos :
    [
      {
          "nome" : "RG",
          "desc" : "USAR MEU RG",
          "desc_sel" : "Escolha como quer enviar o seu RG",
          "id": "rg",
          "icones" : {
              "frente" : "/IconRGFrente.png",
              "verso" : "/IconRGVerso.png",
              "frenteverso" : "/IconRGFrenteVerso.png"
          }
      },
      {
          "nome" : "CNH",
          "desc" : "USAR MINHA CNH",
          "desc_sel" : "Escolha como quer enviar a sua CNH",
          "id" : "cnh",
          "icones" : {
              "frente" : "/IconCNHFrente.png",
              "verso" : "/IconCNHVerso.png",
              "frenteverso" : "/IconCNHFrenteVerso.png"
          }
      },
      {
          "nome" : "OUTRO DOCUMENTO",
          "desc" : "OUTRO DOCUMENTO",
          "desc_sel" : "Escolha como quer enviar seu documento",
          "id" : "outro",
          "icones" : {
              "frente" : "/IconOutroDocFrente.png",
              "verso" : "/IconOutroDocVerso.png",
              "frenteverso" : "/IconOutroDocFrenteVerso.png"
          }
      }
    ]
  }
