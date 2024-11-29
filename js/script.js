$(window).on("load", function () {

   // Preload
   $("#preload").fadeOut(500);

});

jQuery(document).ready(function () {

   // Counter
   $('.counter').counterUp({
      delay: 10,
      time: 1100,
   });

   // Product Tabs
   $('.product-list li a').click(function (event) {
      event.preventDefault();
   });

   $('.product-list li').click(function () {
      $('.product-list li').removeClass('active');
      $(this).addClass('active');
   });

   $('.product-list li').each(function (i) {
      $(this).attr('data-tab', 'tab' + i);
   });
   $('.wrapper-product-section > .product-section').each(function (i) {
      $(this).attr('data-tab', 'tab' + i);
   });

   $('.product-list li').on('click', function () {
      var datatab = $(this).data('tab');
      $('.wrapper-product-section > .product-section').hide();
      $('.wrapper-product-section > .product-section[data-tab=' + datatab + ']').show().attr('style', 'display:flex');
   });

   // Accordion Faq
   var titleAccordion = $('.wrapper-accordion h3');
   var contentAccordion = $('.content-accordion');

   titleAccordion.click(function () {
      var content = $(this).next(contentAccordion);
      if (content.is(':visible')) {
         content.slideUp();
         $(this).children('.fa-solid').removeClass('fa-minus').addClass('fa-plus');
      } else {
         contentAccordion.slideUp();
         content.slideDown();
         titleAccordion.children('.fa-solid').removeClass('fa-minus').addClass('fa-plus');
         $(this).children('.fa-solid').removeClass('fa-plus').addClass('fa-minus');
      }

   });

   // Scroll Top Button
   $('#scroll-top').click(function () {
      $('body,html').animate({
         scrollTop: 0
      }, 800);
      return false;
   });

   // Scroll Top
   $('#scroll-top').hide();
   $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
         $('#scroll-top').fadeIn();
      } else {
         $('#scroll-top').fadeOut();
      }
   });

   // Scroll Menu
   $(".menu li").on("click", "a", function (event) {
      event.preventDefault();
      var id = $(this).attr('href'),
         top = $(id).offset().top;
      $('body,html').animate({
         scrollTop: top
      }, 1500);
   });
   $("#logo").on("click", function (event) {
      event.preventDefault();
      var id = $(this).attr('href'),
         top = $(id).offset().top;
      $('body,html').animate({
         scrollTop: top
      }, 1500);
   });

   // scroll fixed menu
   $(window).scroll(function () {
      var headerTop = $('.wrapper-header-top').height();
      if ($(this).scrollTop() >= headerTop) {
         $('.wrapper-header-bottom').addClass('fixedmenu');
      } else {
         $('.wrapper-header-bottom').removeClass('fixedmenu');
      }
   });

   // Mobile Menu
   $('#openmenu').click(function (event) {
      event.preventDefault();
      $('#navigation').animate({
         'left': 0
      }, 800);
   });

   $('#closemenu').click(function (event) {
      event.preventDefault();
      $('#navigation').animate({
         'left': '-320px'
      }, 800);
   });

   $('#navigation a').on("click", function () {
      $("#navigation").animate({
         'left': '-320px'
      }, 800);
   });

   // Contact Form Ajax 
   $('#send').click(function (event) {
      event.preventDefault();

      var name = $('input[name="name"]').val();
      var lastname = $('input[name="lastname"]').val();
      var phone = $('input[name="phone"]').val();
      var email = $('input[name="email"]').val();
      var message = $('textarea[name="message"]').val();

      if (name == '' || lastname == '' || phone == '' || email == '' || message == '') {

         $('.res-send').fadeIn().html('<span class="error">All fields must be filled.</span>');
         $('input, textarea').focus(function () {
            $('.res-send').fadeOut();
         });

      } else {

         $.ajax({
            url: '../contact.php',
            type: 'POST',
            data: {
               name: name,
               lastname: lastname,
               phone: phone,
               email: email,
               message: message
            },
            dataType: 'html',
            success: function (data) {
               if (data == 'Send') {

                  $('.res-send').fadeIn().html('<span class="send">Thanks. We will contact you shortly.</span>');

                  $('input[name="name"]').val('');
                  $('input[name="lastname"]').val('');
                  $('input[name="phone"]').val('');
                  $('input[name="email"]').val('');
                  $('textarea[name="message"]').val('');

                  $('input, textarea').focus(function () {
                     $('.res-send').fadeOut();
                  });

               }
            }
         }); // ajax
      }
   });


}); // ready