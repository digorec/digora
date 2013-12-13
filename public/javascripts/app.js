(function () {
  function queryParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  // highlight query
  var q = queryParam('q');
  if(q) {
    var $bdy = $('.section, #search-results');
    var words = q.split(/\s+/);
    for(var i = 0; i < words.length; i++) {
      if(words[i] && words[i].length > 2) $bdy.highlight(words[i]);
    }
  }
  
  $(function () {
    // fix for scroll

    function fixScroll() {
      var $a = $('a[name="' + window.location.hash.replace('#', '') + '"]');
      if($a.length) {
        setTimeout(function () {
          $(window).scrollTop($a.eq(0).parent('.section').offset().top - 85);
          
          $a.eq(0).parent('.section').addClass('linked');
        }, 1);
      }
    }
    if(window.location.hash) {
      fixScroll();
    }

    $('a[href]').click(function() {
      var href = $(this).attr('href');

      if (href.indexOf('#') !== -1) {
        setTimeout(function() {
          $('.section.linked').removeClass('linked');
          fixScroll();
        }, 1);
      }
    });

    //prettify
    $('.section pre').addClass('prettyprint');
    prettyPrint();
  });
  
})();

