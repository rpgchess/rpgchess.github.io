var navBtnWidth = $('.navbar a').css('width');

$('.navbar a').mouseenter(e => {
  $(e.target).clearQueue();
  $(e.target).animate({
    width: $(e.target).get(0).scrollWidth
  }, 300, () => {
    $(e.target).width('auto');
  });
});

$('.navbar a').mouseout(e => {
  $(e.target).animate({
    width: navBtnWidth
  }, 300);
});

$(document).ready(function(){
  $('.slicker').slick();
});