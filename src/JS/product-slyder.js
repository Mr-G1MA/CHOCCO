(function() {
  
  const slyder = $('.product__list').bxSlider({
    pager : false,
    controls : false,
    touchEnabled : $(window).width() < 769
  });
  
  $(".arrow-left").click(e =>{
    e.preventDefault();
  
    slyder.goToPrevSlide();
  
  });
  
  $(".arrow-right").click(e =>{
    e.preventDefault();
    slyder.goToNextSlide();
  });
})()