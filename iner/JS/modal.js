const validate = (form,fieldsArray) =>{
  fieldsArray.forEach((field)=>{
    field.removeClass("error");
    if (field.val().trim() === "") {
      field.addClass("error");
    }
  });

  const errorFields = form.find(".error");

  return errorFields.length === 0;
}

$(".form").submit(e =>{
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");
  const modal = $("#modal");
  const content = modal.find(".modal__content");

  content.removeClass("error-content");

  const isValid = validate(form, [name, phone, comment, to]);

  if (isValid){
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data:{
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      }
    });

    request.done((data)=>{
      content.text(data.message);
    });

    request.fail((data)=>{
      const msg = data.responseJSON.message;
      content.text(msg);
      content.addClass("error-content");
    });

    request.always(() =>{
      $.fancybox.open({
        src: "#modal",
        type : "inline"
      });
      var inputs = document.querySelectorAll('input[type=text]');
      var textarea = document.querySelector('textarea[name = comment]');
      for (var i = 0;  i < inputs.length; i++) {
        inputs[i].value = '';
      };
      textarea.value = '';
    });
  
  }
  

});

$(".js-submit-btn").click(e =>{
  e.preventDefault();

  $.fancybox.close();
})