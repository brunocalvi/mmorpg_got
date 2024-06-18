function acaoAldeao(value) {
  switch(parseInt(value)) {
    case 1: 
      txt_acao = 'aldeão(ões) coletando recursos';
    break;
    case 2: 
      txt_acao = 'enforcamento(s) programado';
    break;
    case 3: 
      txt_acao = 'aldeão(ões) em treinamento de história';
    break;
    case 4: 
      txt_acao = 'aldeão(ões) em treinamento de magia';
    break;
  }

  return txt_acao;
}
