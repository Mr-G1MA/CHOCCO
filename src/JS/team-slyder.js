(function() {
  
  const open = (item) =>{
    const container = item.closest(".team__item");
    const content = container.find(".team__content");
    const text = content.find(".team__content-block");
    const blockHeight = text.height();
    const arrow = container.find(".arrow");
    
    arrow.css({
      'border-top-color': 'transparent',
      'border-top-width': '0',
      'border-bottom-width': '7px',
      'border-bottom-color': '#365A49'
    });
    container.addClass("active");
    content.height(blockHeight);
  };
  
  const closeElements = (container) => {
    const items = container.find(".team__content");
    const itemContainer = container.find(".team__item");
  
    const arrow = itemContainer.find(".arrow");
    
    arrow.css({
      'border-top-color': '#365A49',
      'border-top-width': '7px',
      'border-bottom-width': '0',
      'border-bottom-color': 'transparent'
    });
  
    itemContainer.removeClass("active");
    items.height(0);
  };
  
  $(".team__title").click(e =>{
    
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elementContainer = $this.closest(".team__item");
  
    if (elementContainer.hasClass("active")){
      closeElements(container);
    }
    else{
      closeElements(container);
      open($this);
    }
  
  });
})()