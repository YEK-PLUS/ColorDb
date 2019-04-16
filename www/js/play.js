let playing = false;
$("body").click(function(e){
  e.preventDefault();
  if(!playing){
    playing = true;
  setTimeout(function(){
    $(".blur").removeClass("blur");
    $(".pause").fadeOut();
  },250)

  if ( $(".btn").hasClass('play') ) {
    $(".btn").removeClass('play');
    $(".btn").addClass('pause');
  } else {
    $(".btn").removeClass('pause');
    $(".btn").addClass('play');
  }
  }
});
