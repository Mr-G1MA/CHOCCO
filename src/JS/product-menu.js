(function() {
  
  const mesureWidth = (item) =>{
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    const container = item.closest(".products__menu");
    const titleBlocks = container.find(".products-menu__title");
    const titleWidth = titleBlocks.width() * titleBlocks.length;
  
    const textContainer = item.find(".products-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));
    
    
  
    if (screenWidth > 768){
      reqItemWidth = 520;
    }
    else if(screenWidth > 480){
      reqItemWidth = screenWidth - titleWidth;
    }
    else{
      reqItemWidth = screenWidth - titleBlocks.width();
    }
  
    return{
      container: reqItemWidth,
      textContainer: reqItemWidth - paddingLeft - paddingRight
    }
  };
  
  const closeItems = container =>{
    const items = container.find(".products-menu__item");
    const content = container.find(".products-menu__content");
    const checkWidth = $(window).width();
    
    items.removeClass("opened");
    if (checkWidth > 480){
      content.width(0);
    }
    else{
      items.css({
        'position': `relative`,
        'right': '0',
        'z-index': '0'
      });
      content.width(0);
    } 
  
  }
  
  const openItem = item =>{
    const hidcontent = item.find(".products-menu__content");
    const checkWidth = $(window).width();
    const reqwidth = mesureWidth(item);
    const textBlock = item.find(".products-menu__container");
    item.addClass("opened");
    
    
    if (checkWidth > 480){
      hidcontent.width(reqwidth.container);
      textBlock.width(reqwidth.textContainer);
    }
    else{
      item.css({
        'position': `absolute`,
        'right': '0',
        'z-index': '5',
        'height': '100%'
      });
      hidcontent.width(reqwidth.container);
      textBlock.width(reqwidth.textContainer);
    }
  
  };
  
  $(".products-menu__title").on("click" , e =>{
    e.preventDefault();
  
    const $this = $(e.currentTarget);
    const item = $this.closest(".products-menu__item");
    const list = item.closest(".products__menu");
  
    if (item.hasClass("opened")){
      closeItems(list);
      
    }
    else{
      closeItems(list);
      openItem(item);
    }
  
  
  });
  
  $(".close-element").on("click" , e =>{
    e.preventDefault();
  
    const $this = $(e.currentTarget);
    const item = $this.closest(".products-menu__item");
    const list = item.closest(".products__menu");
    closeItems(list);
  });
})()