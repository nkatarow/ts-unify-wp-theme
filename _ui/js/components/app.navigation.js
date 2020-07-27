/*

Navigation Component
VERSION 1.0.0
AUTHORS: Nick Katarow

DEPENDENCIES:
- jQuery 2.2.0
- app.main.js

*/

UNIFY.nav = {
  init: function () {
    // fn init
    var self = this,
    key;
    
    // ELEMENTS
    self.elPrimaryTrigger       = $('#primary-trigger');
    self.elPrimaryMenu          = $('#primary');
    
    // PROPERTIES
    self.isMobile           = false;
    self.visibleMenu        = null;
    self.triggersInserted   = false;
    
    // OBJECTS
    self.menus = {
      primary: {
        $menu: self.elPrimaryMenu,
        $trigger: self.elPrimaryTrigger
      }
    };
    
    // EVENT DELEGATION
    function bindTrigger(trigger, menuName) {
      trigger.click(function (event) {
        event.preventDefault();
        
        if (self.visibleMenu !== menuName) {
          self.showNav(menuName);
        } else {
          self.hideNav(menuName);
        }
      });
    }
    
    for (key in self.menus) {
      bindTrigger(self.menus[key].$trigger, key);
    }
    
    $('#primary a').click(function(){
      if (self.isMobile) {
        self.hideNav('primary');
      }
    });
    
    if (!$('body').hasClass('home')) {
      self.setActiveState();
    }
  },
  hideNav: function (menu) {
    // fn hideNav
    var self = this;

    $('#primary').children('div').css('opacity', '0');
    
    setTimeout(function(){
      self.menus[self.visibleMenu].$menu.removeClass('active');
      self.menus[self.visibleMenu].$trigger.removeClass('is-active');
      self.visibleMenu = null;
      $('.logo').removeClass('active');
      $('html').removeAttr('style');
    }, 250);
  },
  showNav: function (menu) {
    // fn showNav
    var self = this;
    
    if (self.visibleMenu !== null) {
      self.hideNav(self.visibleMenu);
    }
    
    self.menus[menu].$menu.addClass('active');
    self.menus[menu].$trigger.addClass('is-active');
    self.visibleMenu = menu;
    $('.logo').addClass('active');
    $('html').css('overflow', 'hidden');

    setTimeout(function(){
      $('#primary').children('div').css('opacity', '1');
    }, 250);
  },
  setActiveState: function() {
    var self = this,
    newURL = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname,
    pathArray = window.location.pathname.split( '/' ),
    segment_1 = pathArray[1];
    
    $('#menu-global-navigation li.' + segment_1).addClass('current-menu-item');
  }
};
