jQuery(document).ready(function($) {
  var gallery = $('.cd-gallery'),
    foldingPanel = $('.cd-folding-panel'),
    mainContent = $('.cd-main');
  /* open folding content */
  gallery.on('click', 'a', function(event) {
    event.preventDefault();
    openItemInfo($(this).attr('href'));
  });

  /* close folding content */
  foldingPanel.on('click', '.cd-close', function(event) {
    event.preventDefault();
    toggleContent('', false);
  });
  gallery.on('click', function(event) {
    /* detect click on .cd-gallery::before when the .cd-folding-panel is open */
    if ($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0) toggleContent('', false);
  })

  function openItemInfo(url) {
    var mq = viewportSize();
    if (gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
      /* if content is visible above the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top
      }, 100, function() {
        toggleContent(url, true);
      });
    } else if (gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height() && mq != 'mobile') {
      /* if content is visible below the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
      }, 100, function() {
        toggleContent(url, true);
      });
    } else {
      toggleContent(url, true);
    }
  }

  function toggleContent(url, bool) {
    if (bool) {
      /* load and show new content */
      var foldingContent = foldingPanel.find('.cd-fold-content');
      foldingContent.load(url + ' .cd-fold-content > *', function(event) {
        setTimeout(function() {
          $('body').addClass('overflow-hidden');
          foldingPanel.addClass('is-open');
          mainContent.addClass('fold-is-open');
        }, 100);

      });
    } else {
      /* close the folding panel */
      var mq = viewportSize();
      foldingPanel.removeClass('is-open');
      mainContent.removeClass('fold-is-open');

      (mq == 'mobile' || $('.no-csstransitions').length > 0)
      /* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
      ? $('body').removeClass('overflow-hidden')

      : mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        $('body').removeClass('overflow-hidden');
        mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      });
    }

  }

  function viewportSize() {
    /* retrieve the content value of .cd-main::before to check the actua mq */
    return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
  }

  var secondaryNav = $('.cd-secondary-nav'),
    secondaryNavTopPosition = secondaryNav.offset().top,
    taglineOffesetTop = $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
    contentSections = $('.cd-section');

  $(window).on('scroll', function() {
    //on desktop - assign a position fixed to logo and action button and move them outside the viewport
    ($(window).scrollTop() > taglineOffesetTop) ? $('#cd-logo, .cd-btn').addClass('is-hidden'): $('#cd-logo, .cd-btn').removeClass('is-hidden');

    //on desktop - fix secondary navigation on scrolling
    if ($(window).scrollTop() > secondaryNavTopPosition) {
      //fix secondary navigation
      secondaryNav.addClass('is-fixed');
      //push the .cd-main-content giving it a top-margin
      $('.cd-main-content').addClass('has-top-margin');
      //on Firefox CSS transition/animation fails when parent element changes position attribute
      //so we to change secondary navigation childrens attributes after having changed its position value
      setTimeout(function() {
        secondaryNav.addClass('animate-children');
        $('#cd-logo').addClass('slide-in');
        $('.cd-btn').addClass('slide-in');
      }, 50);
    } else {
      secondaryNav.removeClass('is-fixed');
      $('.cd-main-content').removeClass('has-top-margin');
      setTimeout(function() {
        secondaryNav.removeClass('animate-children');
        $('#cd-logo').removeClass('slide-in');
        $('.cd-btn').removeClass('slide-in');
      }, 50);
    }

    //on desktop - update the active link in the secondary fixed navigation
    updateSecondaryNavigation();
  });

  function updateSecondaryNavigation() {
    contentSections.each(function() {
      var actual = $(this),
        actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
        actualAnchor = secondaryNav.find('a[href="#' + actual.attr('id') + '"]');
      if ((actual.offset().top - secondaryNav.height() <= $(window).scrollTop()) && (actual.offset().top + actualHeight - secondaryNav.height() > $(window).scrollTop())) {
        actualAnchor.addClass('active');
      } else {
        actualAnchor.removeClass('active');
      }
    });
  }

  //on mobile - open/close secondary navigation clicking/tapping the .cd-secondary-nav-trigger
  $('.cd-secondary-nav-trigger').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('menu-is-open');
    secondaryNav.find('ul').toggleClass('is-visible');
  });

  //smooth scrolling when clicking on the secondary navigation items
  secondaryNav.find('ul a').on('click', function(event) {
    event.preventDefault();
    var target = $(this.hash);
    $('body,html').animate({
      'scrollTop': target.offset().top - secondaryNav.height() + 1
    }, 400);
    //on mobile - close secondary navigation
    $('.cd-secondary-nav-trigger').removeClass('menu-is-open');
    secondaryNav.find('ul').removeClass('is-visible');
  });

  //on mobile - open/close primary navigation clicking/tapping the menu icon
  $('.cd-primary-nav').on('click', function(event) {
    if ($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
  });
});
