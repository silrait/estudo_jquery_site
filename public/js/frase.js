$('#botao-frase').click(fraseAleatoria)

$('#botao-frase-id').click(buscaFrase)

function buscaFrase() {
  let id = $('#frase-id').val()
  if (id && id >= 0 && id < 10) {
    getFrases({ id, dataHandler(data) {
        return data
      } })
  } else {
    alert('Número inválido')
  }
}

function getFrases({
  id = undefined,
  dataHandler = undefined
})
{
  $('#spinner').show()
  $.get({
    url: "http://localhost:3000/frases",
    data: (id) ? { id } : {},
    success(data) {
      var frase = $(".frase")
      var escolha = (dataHandler)? dataHandler(data) : showError()
      if(escolha){
        frase.text(escolha.texto)
        tempoInicial = escolha.tempo
        atualizaTamanhoFrase()
        reiniciaJogo()
      }
    },
    error: showError,
    complete() {
      $('#spinner').hide()
    }
  })
}

function showError(){
  $("erro").show(1500, () => {
    $(this).hide()
  })
  return undefined
}

function fraseAleatoria() {
  getFrases({
    dataHandler(data) {
      return data[Math.floor(Math.random() * (data.length - 1))]
    }
  })
}
