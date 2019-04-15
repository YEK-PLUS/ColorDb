function GameCreate(){

  debug('Oyun Oluşturuluyor');

  game =  new Game();

  BuildGame();
}
function BuildGame(){
  debug('Oyun İnşa Ediliyor');
  return game.build();
}
