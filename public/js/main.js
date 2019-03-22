const tempoInicial = 10;

var campoTamanho = $("#tamanho-frase");
var campoDigitacao = $(".campo-digitacao");
var tempoRestante = $("#tempo-digitacao");
var botaoIniciar = $('#botao-reiniciar');
var contadorPalavras = $("#contador-palavras");
var contadorCaracteres = $("#contador-caracteres");

tempoRestante.text(tempoInicial);

$(()=> {
  autalizaTamanhoFrase();
  inicializaCronometro();
  inicializaContadores();
  inicializaMarcadores();
  botaoIniciar.click(reiniciaJogo);
});

function autalizaTamanhoFrase(){
    var frase = $('.frase').text();
    var numPalavras = frase.split(" ").length;
    campoTamanho.text(numPalavras);
}

function inicializaCronometro() {
  campoDigitacao.one("focus", () => {
    var cronometroID = setInterval(() => {
      var tempo = tempoRestante.text();
      tempo--;
      tempoRestante.text(tempo);
      if( tempo < 1 ){
        campoDigitacao.attr("disabled", true);
        campoDigitacao.toggleClass("campo-bloqueado");
        clearInterval(cronometroID);
      }
    }, 1000);
  });
}

function inicializaContadores(){
  campoDigitacao.on("input", () => {
    var conteudo = campoDigitacao.val();
    var qtdChars = conteudo.length;
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    contadorPalavras.text(qtdPalavras);
    contadorCaracteres.text(qtdChars);
  });
}

function inicializaMarcadores() {
    campoDigitacao.on("input", () => {
        var digitado = campoDigitacao.val();
        var comparavel = $('.frase').text().substr(0, digitado.length);
        campoDigitacao.addClass((digitado == comparavel) ? "campo-correto" : "campo-errado");
        campoDigitacao.removeClass((digitado == comparavel) ? "campo-errado" : "campo-correto");
    });
}

function reiniciaJogo(){
  campoDigitacao.attr("disabled", false);
  campoDigitacao.val("");
  campoDigitacao.toggleClass("campo-bloqueado");
  campoDigitacao.removeClass("campo-correto");
  campoDigitacao.removeClass("campo-errado");
  contadorPalavras.text("0");
  contadorCaracteres.text("0");
  tempoRestante.text(tempoInicial);
  inicializaCronometro();
}
