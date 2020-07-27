/*

FILE: app.main.js
DESCRIPTION: Basic App functions and config
AUTHOR(S): Nick Katarow

DEPENDENCIES:
- jQuery 1.9.1

TO DO:

*/
var UNIFY = window.UNIFY || {};

$(document).ready(function(){
  UNIFY.init();
});

window.UNIFY = {
  init: function () {
    var self = this;
    var ua = window.navigator.userAgent;
    
    self.events.parent = this;
    self.resizeTimer;
    
    // Init Components
    self.detectIE();
    self.nav.init();
    
    if ($('.logo-soup').length) {
      $('.logo-soup').each(function(){
        self.logos.init(this);
      });
    }
    
    // Carousel
    $('.owl-carousel').owlCarousel({
      autoplay: true,
      navText: ["<span class='icon-chevron-left'></span>","<span class='icon-chevron-right'></span>"],
      navElement: 'a',
      stageElement: 'ul',
      itemElement: 'li',
      mouseDrag: false,
      center: true,
      loop: true,
      dots: true,
      nav: false,
      items: 1,
      responsive: {
        800 : {
          nav: true,
        }
      }      
    });

    $('.insights-carousel').owlCarousel({
      autoplay: false,
      navText: ["<span class='icon-chevron-left'></span>","<span class='icon-chevron-right'></span>"],
      navElement: 'a',
      stageElement: 'ul',
      itemElement: 'li',
      mouseDrag: false,
      center: true,
      loop: true,
      dots: true,
      nav: true,
      items: 1
    });

    $('.people-carousel').owlCarousel({
      autoplay: false,
      navText: ["<span class='icon-chevron-left'></span>","<span class='icon-chevron-right'></span>"],
      navElement: 'a',
      stageElement: 'div',
      itemElement: 'a',
      center: false,
      loop: false,
      nav: true,
      responsive: {
        0 : {
          items: 1,
          mouseDrag: true,
          dots: false,
        },
        800 : {
          items: 3,
          mouseDrag: false,
          dots: true,
          margin: 20,
          slideBy: 3
        }
      }
    });
    
		if ($('#instafeed').length) {
			// Instafeed
			var feed = new Instafeed({
	      clientId: '0fd2d8992f5c4574bddc575932cd04a9',
				get: 'user',
				limit: '3',
				userId: '3824866031',
				sortBy: 'most-recent',
				accessToken: '3824866031.0fd2d89.2b0573b9424d41c1840810e6a579578b',
				resolution: 'standard_resolution',
				template: '<div><img src="{{image}}" height="{{height}}" width="{{width}}" /></div>'
	    });
      feed.run();
		}

    $(".fitvid").each(function(){
      $(this).fitVids();
    });

    if ($('.tabbed-content').length){
      self.tabControl.init();
    }

    // EVENT DELEGATION
    $(window).bind('resize', function(event) {
        self.events.windowResize({width: self.getMediaWidth()});
    });

    $(window).triggerHandler('resize');
  },
  events: {
    windowResize: function (event) {
      var self = this.parent,
      i,
      ii;

      clearTimeout(self.resizeTimer);
      
      self.resizeTimer = setTimeout(function() {
        self.tabControl.init();
      }, 250);
      
      // if (event.width >= 800) {
      //   self.nav.mobileOff();
      // } else if (event.width < 800) {
      //   self.nav.mobileOn();
      // }
    }
  },
  getMediaWidth: function () {
    var self = this,
    width;
    
    if (typeof matchMedia !== 'undefined') {
      width = self.bruteForceMediaWidth();
    } else {
      width = window.innerWidth || document.documentElement.clientWidth;
    }
    
    return width;
  },
  bruteForceMediaWidth: function () {
    var i = 0,
    found = false;
    
    while (!found) {
      if (matchMedia('(width: ' + i + 'px)').matches) {
        found = true;
      } else {
        i++;
      }
      
      // Prevent infinite loop if something goes horribly wrong
      if (i === 9999) {
        break;
      }
    }
    
    return i;
  },
  detectIE: function() {
    var ieV,
    ua = window.navigator.userAgent,
    msie = ua.indexOf('MSIE/'),
    trident = ua.indexOf('Trident/'),
    edge = ua.indexOf('Edge/');
    
    if (msie > 0) { ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10); }
    if (edge > 0) { ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10); }
    if (trident > 6) {
      var rv = ua.indexOf('rv:');
      ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    
    
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || ua.match(/Edge/i)) {
      $('body').append('<link rel="stylesheet" href="/wp-content/themes/unify/_ui/ie/ie.css" media="all">');
      $('html').addClass(' ie ie' + ieV);
    }
    
    // other browser
    return false;
  }
};

