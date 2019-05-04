$('#botao-placar').click(mostraPlacar)
$("#botao-sync").click(sincronizaPlacar);

function atualizaPlacar(){
  $.get({
    url: "http://localhost:3000/placar",
    success(data) {
      const tbody = $(".placar").find("tbody");
      data.forEach( ({usuario, pontos}) =>{
        tbody.prepend(novaLinha(usuario, pontos));
      })

      $('.placar').slideDown(600);
      scrollPlacar();
    },
  })
}

function sincronizaPlacar(){
  var placar = []
  var linhas = $("tbody>tr");

  linhas.each( function(){
    placar.push({
      usuario : $(this).find("td:nth-child(1)").text(),
      pontos: $(this).find("td:nth-child(2)").text(),
    });
  });

  const dados = {placar};
  console.log(dados);

  $.post("http://localhost:3000/placar", {placar}, () =>{
    console.log("Placar sincronizado com sucesso");
  })
}

function mostraPlacar() {
  //stop() diz para o jquery parar animação
  //que estiver fazendo para começar uma nova
  //e não criar uma cadeia de animações
  $('.placar').stop().slideToggle(600)
}

function fechaPlacar(){
  $('.placar').stop().slideUp()
}

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Vanessa";
  var numPalavras = $("#contador-palavras").text();

  var linha = novaLinha(usuario, numPalavras);

  corpoTabela.prepend(linha);

  $('.placar').slideDown(600)
  scrollPlacar()
}

function scrollPlacar(){
  var posicaoPlacar = $('.placar').offset().top
  $('body').animate({
    scrollTop: posicaoPlacar+"px"
  }, 1000)
}

function novaLinha(usuario, numPalavras) {
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(numPalavras);
  var colunaRemover = $("<td>");

  var link = $("<a>").addClass("botao-remover").attr("href", "#");
  link.click(removeLinha);

  var icone = $("<i>").addClass("material-icons").text("delete");

  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario, colunaPalavras, colunaRemover);

  return linha;
}

function removeLinha(event) {
  event.preventDefault()
  var linha = $(this).parent().parent()
  //fadeOut só esconde, mas o elemento continua no DOM
  linha.fadeOut(1000, () => {
    //esperar a animação terminar antes de excluir
    linha.remove()
  })
}
