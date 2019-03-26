$('#botao-frase').click(fraseAleatoria)

function fraseAleatoria(){
  $('#spinner').show()
  $.get({
    url : "http://localhost:3000/frases",
    success(data){
      var frase = $(".frase")
      var escolha = data[ Math.floor(Math.random() * (data.length-1))]
      frase.text(escolha.texto)
      tempoInicial = escolha.tempo
      atualizaTamanhoFrase()
      reiniciaJogo()
    },
    error(){
      $("erro").show(1500, () => {
        $(this).hide()
      })
    },
    complete(){
      $('#spinner').hide()
    }
  })
}
