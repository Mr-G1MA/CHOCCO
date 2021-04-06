(function() {
  
  const sections = $(".section");
  const display = $(".maincontent");
  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();
  var inScroll = false;
  
  sections.first().addClass("active-section");
  
  
  const scroll = sectionNum =>{
    if (inScroll == false){
      inScroll = true;
      const position = sectionNum * -100;
      const fixedItems = $(".fixed-menu__item");
      
  
    
      display.css({
        'transform': `translateY(${position}%)`
      });
    
      sections.eq(sectionNum).addClass("active-section").siblings().removeClass("active-section");
      fixedItems.eq(sectionNum).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");
  
      setTimeout(() =>{
        inScroll = false;
        const curSection = sections.eq(sectionNum);
        const theme = curSection.attr("data-side-menu-theme");
        const fixedMenu = $(".fixed-menu__list");
  
        if (theme == "black"){
          fixedMenu.addClass("fixed__item-black");
        }
        else{
          fixedMenu.removeClass("fixed__item-black");
        }
      }, 1000);
    }
  };
  
  const scrollPlace = direction =>{
  
    const activeSection = sections.filter(".active-section");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();
  
    if (direction == "next" && nextSection.length){
      scroll(nextSection.index());
    }
  
    if (direction == "prev" && prevSection.length){
      scroll(prevSection.index());
    }
  };
  
  $(window).on("wheel" , e =>{
    const deltaY = e.originalEvent.deltaY;
  
    if (deltaY > 0){
      scrollPlace("next");
    }
    
    if (deltaY < 0){
      scrollPlace("prev");
    }
  });
  
  $(window).on("keydown", e =>{
  
    const input = e.target.tagName.toLowerCase();
  
    if (input !== "input" && input !== "textarea"){
      switch(e.keyCode) {
        case 38:
          scrollPlace("prev");
          break;
    
        case 40:
          scrollPlace("next");
          break;  
      }
    }
  
  });
  
  $("[data-scroll-to]").click(e => {
    e.preventDefault();
  
    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);
  
    scroll(reqSection.index());
  });
  
  $(".wrapper").on("touchmove", e => e.preventDefault());
  
  if (isMobile){
    $("body").swipe( {
      swipe:function(event, direction) {
        let scrollDirection = "";
    
        if (direction == "up") scrollDirection = "next";
        if (direction == "down") scrollDirection = "prev";
    
        scrollPlace(scrollDirection);
      }
    });
  };
})()
