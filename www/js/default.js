var game ;

function debug(text,title = "ColorDb") {
  console.log(title + ': ' + text);
}

function httpGet(theUrl){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

function FirstLaunchController(){
    //first Launch;
    if(localStorage.firstLaunch == undefined){
      localStorage.firstLaunch = true;
      localStorage.stagenumber = 1;
    }
    localStorage.levelData = httpGet("level.json");
}
document.addEventListener("deviceready", function(){
  FirstLaunchController();
  AndroidFullScreen.immersiveMode();
  AndroidFullScreen.setSystemUiVisibility();
  AndroidFullScreen.showUnderSystemUI();
  //admob.banner.config({id:"ca-app-pub-4324641283707053/5267229541"});
  //admob.banner.prepare()
  GameCreate();
}, false);

document.addEventListener('click', (event) => {
  let css = Array.from(event.target.classList)
  if (event.target.tagName === 'CHIP') {
    game.Play(event.target.className)
  } else if (css.includes('new-game')) {
    GameCreate();
  }
})
