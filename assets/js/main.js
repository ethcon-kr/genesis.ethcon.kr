/*
	Hyperbolic by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {
  var $window = $(window),
    $body = $('body'),
    $header = $('#header'),
    $nav = $('#nav'),
    $banner = $('#banner');
  var aaa = 11;

  // Breakpoints.
  breakpoints({
    default: ['1681px', null],
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: ['361px', '480px'],
    xxsmall: [null, '360px']
  });

  // Play initial animations on page load.
  $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-preload');
    }, 100);

    //Get current cookie value
    let languageCookie = Cookies.get('language');
    let languageType = navigator.language || navigator.userLanguage;

    if (languageCookie == undefined) {
      if (languageType == 'ko-KR') {
        setKorean();
      } else {
        setEnglish();
      }
    } else if (languageCookie == 'koreanVersion') {
      setKorean();
    } else if (languageCookie == 'englishVersion') {
      setEnglish();
    }
  });

  // Dropdowns.
  $('#nav > ul').dropotron({
    alignment: 'right',
    hideDelay: 350,
    baseZIndex: 100000
  });

  // Menu.
  $('<a href="#navPanel" class="navPanelToggle">Menu</a>').appendTo($header);

  $(
    '<div id="navPanel">' +
      '<nav>' +
      $nav.navList() +
      '</nav>' +
      '<a href="#navPanel" class="close"></a>' +
      '</div>'
  )
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      target: $body,
      visibleClass: 'is-navPanel-visible',
      side: 'right'
    });

  // Scrolly.
  $('.scrolly').scrolly({
    offset: function() {
      return $header.outerHeight() - 5 - 64;
    }
  });

  // Header.
  if ($banner.length > 0 && $header.hasClass('alt')) {
    $body.addClass('header-alt');

    $window.on('resize', function() {
      $window.trigger('scroll');
    });

    $banner.scrollex({
      bottom: $header.outerHeight() - 64,
      terminate: function() {
        $header.removeClass('alt');
        $body.removeClass('header-alt');
      },
      enter: function() {
        $header.addClass('alt');
        $body.addClass('header-alt');
      },
      leave: function() {
        $header.removeClass('alt');
        $body.removeClass('header-alt');
        $header.addClass('reveal');
      }
    });
  }

  // Banner.

  // Hack: Fix flex min-height on IE.
  if (browser.name == 'ie') {
    $window
      .on('resize.ie-banner-fix', function() {
        var h = $banner.height();

        if (h > $window.height()) $banner.css('height', 'auto');
        else $banner.css('height', h);
      })
      .trigger('resize.ie-banner-fix');
  }
})(jQuery);

//Language change
function setLanguage(selectedLanguage) {
  if (selectedLanguage == 'koreanVersion') {
    setKorean();
  } else if (selectedLanguage == 'englishVersion') {
    setEnglish();
  }
}

function setKorean() {
  Cookies.set('language', 'koreanVersion');
  $('.koreanVersion').css('display', '');
  $('.englishVersion').css('display', 'none');
}

function setEnglish() {
  Cookies.set('language', 'englishVersion');
  $('.koreanVersion').css('display', 'none');
  $('.englishVersion').css('display', '');
}
