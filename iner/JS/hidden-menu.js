const hamburger = document.querySelector("#hamburger-link");
const menu = document.querySelector("#menu-overlay");
const computedstyle = getComputedStyle(menu);
const close = document.querySelector("#close");

hamburger.addEventListener('click', function(event){
  event.preventDefault();

  menu.style.right = 0;
})

close.addEventListener('click', function(event){
  event.preventDefault();

  menu.style.right = '-200%' ;
})

menu.addEventListener("click", (e) => {
  if (e.target.classList.contains("hidden-menu__link") || e.target.classList.contains("hidden-menu__item")) {
    
  }
  else {
    close.click();
  }
   
});