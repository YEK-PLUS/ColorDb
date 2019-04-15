$('body').on('click', '.btn', function(e){
  e.preventDefault();

  setTimeout(function(){
    $(".blur").removeClass("blur");
    $(".pause").fadeOut();
  },250)

  if ( $(this).hasClass('play') ) {
    $(this).removeClass('play');
    $(this).addClass('pause');
  } else {
    $(this).removeClass('pause');
    $(this).addClass('play');
  }
});
