$(document).ready(function () {
  $("#apply-btn").click(function () {
    $("#application-form").slideToggle();
  });
  $(".apply-btn, .button")
    .on("mouseover", function () {
      $(this).css("background-color", "#2980b9 ");
    })
    .on("mouseout", function () {
      $(this).css("background-color", "#5cb85c");
    });
  $("#jobForm").validate({
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: "Lütfen geçerli bir e-posta adresi girin",
      phone: "Telefon numarası eksik!",
    },
    submitHandler: function (form) {
      $("#popup-message").fadeIn().delay(3000).fadeOut();
      form.reset();
    },
  });
  $("#datepicker").datepicker({
    minDate: 0,
  });
  $("input[name='phone']")
    .mask("(999) 999-9999")
    .on("blur", function () {
      $(this).next(".error").remove();
      if ($(this).val().replace(/\D/g, "").length < 10) {
        $(this).after("<label class='error'>Telefon numarası eksik!</label>");
      }
    });
});
